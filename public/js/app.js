const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location=search.value
    //console.log(location)
    messageTwo.textContent=""
    messageOne.textContent="loading..." 
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            return //console.log(data.error)         
        }  
        messageTwo.textContent=data.forecastData
        messageOne.textContent=data.location
        // console.log(data.forecastData)
        // console.log(data.location);

    })
})
})
