const host = '127.0.0.1';
const port = 8000;

projectData = [];
const bodyParser = require('body-parser')

const express = require('express');

const cors =require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('website'));

app.get('/all',(req,res)=>{
    res.send(projectData);
    // empty data
    projectData=[]
})
app.post('/add',(req,res)=>{
    clientData={
        date:req.body.date,
        temp:req.body.temp,
        content:req.body.content
    }
    projectData.push(clientData);
    console.log(projectData)
    // res.sendStatus(200).end();
})

app.listen(port,host,()=>{
    console.log(`Successfuly connected to Host : ${host} and Port : ${port}`)
})