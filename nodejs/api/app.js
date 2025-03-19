const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config()
const port = process.env.PORT || 8900
let {dbConnect,getData} = require('./controller/dbController')

app.get('/',(req,res)=>{
    res.status(200).send('Hii From Express')
});

//heart beat
app.get('/health',(req,res) => {
    res.status(200).send('Health Check')
});

//list all the city
app.get('/location',async(req,res)=>{
    let query = {};
    let collection = 'location';
    let output = await getData(collection,query)
    res.status(200).send(output)
})


app.listen(port,() => {
    dbConnect()
    console.log(`Server is running on port ${port}`)
});