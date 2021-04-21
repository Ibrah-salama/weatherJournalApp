/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const key = '&appid=8957ffb1663acf6ab0298b3606bb1163&units=imperial';
const generateBtn = document.querySelector('#generate');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '/'+ d.getDate()+'/'+ d.getFullYear();
console.log(newDate);
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
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
        document.querySelector('#date').innerHTML=`Date: ${allData.date}`;
        document.querySelector('#temp').innerHTML=`Temp: ${allData.temp}`;
        document.querySelector('#content').innerHTML=`feel: ${allData.content}`
    }catch(err){
        console.log(err.message)
        document.querySelector('#date').innerHTML=`Unfortunatly Thers Is no data, Please contact the admintsrator`;
    }
}