const request=require('request')

const geocode=(address,callback)=>{

    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmFydW5rdW1hcnNoYXJtYTA0OSIsImEiOiJja3lzdDZoYWkxNzQ3MnZvM3Jub2F6bWsxIn0.cpgc-AcwS2p4cZFglYCJ8g&limit=1&fuzzyMatch=false`
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('unable to connect to location service',undefined)
        }
        else if(body.features.length===0)
        {
            callback('unable to find location .Try another search',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
       
    })
}

module.exports=geocode



// const geoCodeUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidmFydW5rdW1hcnNoYXJtYTA0OSIsImEiOiJja3lzdDZoYWkxNzQ3MnZvM3Jub2F6bWsxIn0.cpgc-AcwS2p4cZFglYCJ8g&limit=1'


// request({url:geoCodeUrl,json:true},(error,response)=>{
// if(error){
//     console.log('unable to connect Geo Location service')
// }
// else if(response.body.features.length===0)
// {
//     console.log('unable to find location try again with different search term')
// }
// else{
//     console.log(response.body.features[0].center[1])
//     console.log(response.body.features[0].center[0])
// }
// })


