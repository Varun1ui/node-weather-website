const request=require('request')


// const url='http://api.weatherstack.com/current?access_key=8d5be1b4542609e659c0451c297d9889&query=26.9124,75.7873&units=f'

// request({url:url, json:true },(error,response)=>{
//     if(error){
//         console.log('Unable to connect to weather service')
//     }
//     else if(response.body.error){
//          console.log('Unable to find location')
//     }else{
//         console.log(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degress f out . It feels like ${response.body.current.feelslike} degress f out`)
//     }
//     //const data=JSON.parse(response.body)
//     //console.log(response.body.current)
     
// })

const forecast =(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=8d5be1b4542609e659c0451c297d9889&query=${latitude},${longitude}&units=f`
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback("Unable to connect to weather service",undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress f out . It feels like ${body.current.feelslike} degress f out`)
        }
    })
}

module.exports=forecast