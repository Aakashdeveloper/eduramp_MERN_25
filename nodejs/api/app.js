import express from 'express';
import dotenv from 'dotenv';
import {ObjectId} from 'mongodb';
import cors from 'cors'
const app = express();
dotenv.config()
const port = process.env.PORT || 8900
import {dbConnect,getData} from './controller/dbController';

//app.use(bodyParser.urlencoded({extended:true}))
//app.use(bodyPArser.json())
app.use(express.json())
app.use(cors())

const VALID_USERNAME = process.env.BASIC_AUTH_USER
const VALID_PASSWORD = process.env.BASIC_AUTH_PASSWORD

const basicAuth = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Basic ")){
        return res.status(401).send("Unauthorized")
    }
    //decode base 64 header
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials,'base64').toString("utf-8");
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

//placeOrder
app.post('/placeOrder',async(req,res) => {
    let data = req.body;
    console.log(data)
    res.send('ok')
})


app.listen(port,() => {
    dbConnect()
    console.log(`Server is running on port ${port}`)
});