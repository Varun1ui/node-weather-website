const path = require('path')
const express=require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const hbs=require('hbs')

const app=express()

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)  //to configure partials


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Varun'

    })
})

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Varun',
//         age:24
//     },{
//         name:'Poonam',
//         age:30
//     }])
// })
app.get('/help',(req,res)=>{
    res.render('help',{title:'Help',
    name:'Varun'})
})
app.get('/about',(req,res)=>{
    res.render('about',{title:'About App',
    name:'Varun'})
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'you must provide address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
         forecast(latitude,longitude, (error, forecastData) => {
             if(error)
             {
                 return res.send({error})
             }
             
             res.send({
                forecastData,location,address:req.query.address
            })
           })
     })
    
    // res.send({
    //     forecast :'It is 50 degree',
    //     location :"Jaipur",
    //     address:req.query.address
    // })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
          error:'you must provide a search term'
        })
    }  //we can use return or else
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{title:'404',errorMessage:'Help article not found',
    name:'Varun'})
})

app.get('*',(req,res)=>{
    res.render('error',{title:'404',errorMessage:'Page not found',
    name:'Varun'})
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000');
})