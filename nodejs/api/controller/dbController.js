import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config()
const mongoUrl = process.env.MongoUrl
let db;

async function dbConnect(){
    const client = new MongoClient(mongoUrl);
    await client.connect();
    db = client.db('restaurants');
    console.log('DB Connection Successful')
}

async function getData(colName,query){
    let output;
    try{
        output = await db.collection(colName).find(query).toArray()
    }catch(err){
        output={"Error":`Error in condition for getting data from ${colName}`}
    }
    return output
}

async function postData(colName,data){
    let output;
    try{
        output = await db.collection(colName).insertOne(data)
    }catch(err){
        output={"Error":`Error in POST  Request`}
    }
    return output
}

async function updateData(colName,condition,data){
    let output;
    try{
        output = await db.collection(colName).updateOne(condition,data)
    }catch(err){
        output={"Error":`Error in PUT  Request`}
    }
    return output
}

async function deleteData(colName,condition){
    let output;
    try{
        output = await db.collection(colName).deleteOne(condition)
    }catch(err){
        output={"Error":`Error in Delete  Request`}
    }
    return output
}

export {
    dbConnect,
    getData,
    postData,
    updateData,
    deleteData
}