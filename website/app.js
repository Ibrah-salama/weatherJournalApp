/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const key = '&appid=8957ffb1663acf6ab0298b3606bb1163';
const generateBtn = document.querySelector('#generate');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate)
// add event listener on the generator button 
generateBtn.addEventListener('click',()=>{
    const newZipCode = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;
    getWeather(baseURL,newZipCode,key)
    .then((data)=>{
        console.log(data);
        console.log("the data is up to me ");
        postData('/add',{date:newDate,temp:data.list[0].main.temp,content:feelings})
        updateUi();
    })
})

const getWeather= async(baseURL,zip,key)=>{
    const res = await fetch(baseURL+zip+key)
    try{
        const data = await res.json();
        console.log(data);
        console.log("the getWeather() data is up to me")
        return data;
    }catch(err){
        console.log(err.message);
    }
}

const postData =async( url='',data={})=>{
    console.log(data);
    const response = await fetch(url,{ method:'POST',credentials:'same-origin', headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    try{
        const newData = await response.json();
        console.log(newData);
        console.log('this is new data')
    }catch(err){
        console.log(err.message)
    }
}
const updateUi= async()=>{
    console.log('before')
    const request = await fetch('/all');
    console.log('after')
    try{
        const allData = await request.json()
        console.log(allData)   
        console.log('all data is up to me');
        document.querySelector('#date').innerHTML=`Date: ${allData[0].date}`;
        document.querySelector('#temp').innerHTML=`Temp: ${allData[0].temp}`;
        document.querySelector('#content').innerHTML=`feel: ${allData[0].content}`
        console.log("FINAL DATA ----> ")
    }catch(err){
        console.log(err.message)
    }
}