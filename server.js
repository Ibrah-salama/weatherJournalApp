//add port and host as const vars 
const host = '127.0.0.1';
const port = 8000;
// Setup empty JS object to act as endpoint for all routes
projectData = {};
const bodyParser = require('body-parser')
// Require Express to run server and routes
const express = require('express');
//Require cors 
const cors =require('cors');
// Start up an instance of app
const app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
/* Middleware*/
/**send all data from client side  */
app.get('/all',(req,res)=>{
    res.send(projectData);
})
/** client send data to the server */
app.post('/add',(req,res)=>{
    clientData={
        date:req.body.date,
        temp:req.body.temp,
        content:req.body.content
    }
    projectData=clientData
    console.log(projectData)
})
// Setup Server
app.listen(port,host,()=>{
    console.log(`Successfuly connected to Host : ${host} and Port : ${port}`)
})