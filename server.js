const router=require('./router/route')
const express=require('express')
const app=express()
const port=3020;


app.use(express.json())

app.use('/',router)

app.listen(port,()=>{
    console.log(`this server is running on this port ${port}`);
})