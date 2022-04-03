const express = require("express");
const https = require("https");
const bodyParser = require('body-parser')
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html")
    
});
app.post("/", function(req, res){
    console.log(req.body.cityName)
    const cityname = req.body.cityName;
    const apikey = "196f3294cb609c1333ba4bba218a65fb";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityname +",india&appid=" + apikey + "&units=metric";
    

    https.get(url, function(response){
        console.log(response);
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const des = weatherData.weather[0].description
            const name = weatherData.name
            const imgsrc = weatherData.weather[0].id
            const imgurl = "https://openweathermap.org/img/wn/" + imgsrc + "@2xpng"
            console.log(weatherData)
            console.log(temp);
            console.log(des);
            
    
            res.send("<h3> The Des is " + des + "</h3>" +  
                "<h1>The temperature in " + name + " is "+ temp + " degree Celsius</h1>")
            
            
        })

    })
})
/*
const url = "https://api.openweathermap.org/data/2.5/weather?q=Chandigarh,india&appid=196f3294cb609c1333ba4bba218a65fb&units=metric";
    

    https.get(url, function(response){
        console.log(response);
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const des = weatherData.weather[0].description
            const name = weatherData.name
            const imgsrc = weatherData.weather[0].id
            const imgurl = "https://openweathermap.org/img/wn/" + imgsrc + "@2xpng"
            console.log(weatherData)
            console.log(temp);
            console.log(des);
            
    
            res.send("<h3> The Des is " + des + "</h3>" +  
                "<h1>The temperature in " + name + " is "+ temp + " degree Celsius</h1>")
            
            
        })

    })
    */
app.listen(port, ()=>{
    console.log('Server is live on Server '+ port);
})