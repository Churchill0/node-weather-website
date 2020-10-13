const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../src/templates/views')
const partialsPath =  path.join(__dirname,'../src/templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
  res.render('index',{
      title: 'Weather App',
      name: 'Churchill Odhiambo'
  })  
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Okwonkwo'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        helpfulText: 'This is some helpful text',
        title:'Help',
        name: 'Tyler Perry'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"No address field provided"
        })
    }
   
    geocode(req.query.address, (error, {latitude,longitude,location}= {}) => {
        if (error){
            return res.send({error})
        }
    
    forecast(latitude, longitude, (error, forecastData) =>{
        if (error){
            return res.send({error})
        }
    })
   })   
     
    res.send({
       forecast: forecastData,
       location,
        address: req.query.address
    })
})

app.get('/products',(req,res)=>{
    if (!req.query.search) {
     return res.send({
          error: 'You must provide a search term'
      })  
    }
  console.log(req.query.search)
    res.send({
       products:[]
   })
})

app.get('/help/*',(req,res)=>{
    res.render('err404',
    {errorMessage:'Help article not found',
    title:'Error 404',
    name: 'Bazu'})
})

app.get('*',(req,res) =>{
    res.render('err404',
    {errorMessage:'Page not found ',
    title:'Error 404',
    name: 'Bazu'})
})

app.listen(3000, () =>{
    console.log('server is up on port 3000!')
})
