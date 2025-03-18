const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config()
const port = process.env.PORT || 8900

app.get('/',(req,res)=>{
    res.status(200).send('Hii From Express')
});

app.get('/health',(req,res) => {
    res.status(200).send('Health Check')
})


app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
});