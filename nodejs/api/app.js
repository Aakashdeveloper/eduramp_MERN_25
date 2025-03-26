import express from 'express';
import dotenv from 'dotenv';
import {ObjectId} from 'mongodb';
import cors from 'cors'
const app = express();
dotenv.config()
const port = process.env.PORT || 8900
import {dbConnect,getData,postData,
    updateData,deleteData} from './controller/dbController';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json'

//app.use(bodyParser.urlencoded({extended:true}))
//app.use(bodyPArser.json())
app.use(express.json())
app.use(cors())
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

const VALID_USERNAME = process.env.BASIC_AUTH_USER
const VALID_PASSWORD = process.env.BASIC_AUTH_PASSWORD

const basicAuth = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    //console.log(req)
    if(!authHeader || !authHeader.startsWith("Basic ")){
        return res.status(401).send("Unauthorized")
    }
    //decode base 64 header
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials,'base64').toString("utf-8");
    console.log(credentials)
    const [username,password] = credentials.split(':')

    if(username === VALID_USERNAME && password === VALID_PASSWORD){
        return next()
    }
    res.status(401).send("Unauthorized")
}

app.get('/',(req,res)=>{
    res.status(200).send('Hii From Express')
});

//heart beat
app.get('/health',(req,res) => {
    res.status(200).send('Health Check')
});

//list all the city
app.get('/location',basicAuth,async(req,res)=>{
    let query = {};
    let collection = 'location';
    let output = await getData(collection,query)
    res.status(200).send(output)
})

//get all restaurats
app.get('/restaurants',async(req,res) => {
    let query = {}
    let {stateId} = req.query

    if(stateId){
        query = {
            "state_id":Number(stateId)
        }
    }
    let collection = 'restaurants';
    let output = await getData(collection,query)
    res.status(200).send(output)
})

//list all the meals
app.get('/mealtype',async(req,res)=>{
    let query = {};
    let collection = 'mealType';
    let output = await getData(collection,query)
    res.status(200).send(output)
})

//filters
app.get('/filters/:mealId',async(req,res) => {
    let query = {};
    let collection = 'restaurants';
    let mealId = Number(req.params.mealId)
    let cuisineId = Number(req.query.cuisineId)
    if(mealId && cuisineId){
        query={
            "cuisines.cuisine_id":cuisineId,
            "mealTypes.mealtype_id":mealId
        }
    }else if(mealId){
        query={
            "mealTypes.mealtype_id":mealId
        }
    }
    let output = await getData(collection,query)
    res.status(200).send(output)
})


// details of restaurants
app.get('/details/:id',async(req,res) => {
    let query = {};
    let restId = req.params.id;
    const validObjId = (id) => {
        const idPattern = /^[0-9A-Fa-f]{24}$/
        return idPattern.test(id)
    }
    if(validObjId(restId)){
        query = {
            "_id":new ObjectId(restId)
        }
    }else{
        res.send("Invalid Object Id")
    }
    // query = {
    //     "restaurant_id":Number(restId)
    // }
    let collection = 'restaurants';
    let output = await getData(collection,query)
    res.status(200).send(output)
})

//get Order
app.get('/orders',async(req,res) => {
    let collection = 'orders';
    let output = await getData(collection,{"deleteStatus":0})
    console.log()
    res.status(200).send(output)
})


//placeOrder
app.post('/placeOrder',async(req,res) => {
    let data = req.body;
    console.log(data);
    let collection = 'orders';
    let output = await postData(collection,data)
    res.status(200).send(`Order Place ${output}`)
})

//updateOrder
app.put('/updateOrder',async(req,res) => {
    let collection = "orders";
    let condition = {_id:new ObjectId(req.body._id)};
    let data = {
        $set:{
            "status":req.body.status
        }
    }
    await updateData(collection,condition,data)
    res.status(200).send(`Order Updated `)
})


//deleteOrder
app.put('/deleteOrder',async(req,res) => {
    let collection = "orders";
    let condition = {_id:new ObjectId(req.body._id)};
    let rows = await getData(collection,condition)
    if(rows.length > 0){
        await deleteData(collection,condition)
        res.status(200).send(`Order deleted `)
    }else{
        res.status(200).send(`No Order Found `)
    }
})


//  {"id":[1,2,5]}
app.post('/menuDetails',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {menu_id:{$in:req.body.id}}
        let collection = 'menu';
        let output = await getData(collection,query)
        res.status(200).send(output)
    }else{
        res.send('Please Pass data in format of {"id":[1,2,5]}')
    }

})


app.listen(port,() => {
    dbConnect()
    console.log(`Server is running on port ${port}`)
});