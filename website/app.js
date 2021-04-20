/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const key = '&appid=8957ffb1663acf6ab0298b3606bb1163';
const generateBtn = document.querySelector('#generate');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// add event listener on the generator button 
generateBtn.addEventListener('click',()=>{
    const newZipCode = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;
    getWeather(baseURL,newZipCode,key)
    .then((data)=>{
        postData('/add',{date:newDate,temp:data.list[0].main.temp,content:feelings})
        updateUi();
    })
})

const getWeather= async(baseURL,zip,key)=>{
    const res = await fetch(baseURL+zip+key)
    try{
        const data = await res.json();
        return data;
    }catch(err){
        console.log(err.message);
    }
}
const postData =async( url='',data={})=>{
    const response = await fetch(url,{ method:'POST',credentials:'same-origin', headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    try{
        const newData = await response.json();
    }catch(err){
        console.log(err.message)
    }
}
const updateUi= async()=>{
    const request = await fetch('/all');
    try{
        const allData = await request.json()
        document.querySelector('#date').innerHTML=`Date: ${allData[0].date}`;
        document.querySelector('#temp').innerHTML=`Temp: ${allData[0].temp}`;
        document.querySelector('#content').innerHTML=`feel: ${allData[0].content}`
    }catch(err){
        console.log(err.message)
    }
}