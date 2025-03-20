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

export {
    dbConnect,
    getData
}