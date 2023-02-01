const jwt=require('jsonwebtoken')
const knex = require('../dbconnection/connection')

const CreateToken=((id)=>{
    const Token=jwt.sign(id,'aniketkumartiwarifromnavgurukul')
    return Token;
})
const varifyUser = async(req,res,next)=>{
    try {
        if(req.headers.cookie){
            let token=req.headers.cookie.split('=')[1]
            const id=jwt.verify(token,'aniketkumartiwarifromnavgurukul')
            const Userinfo=await knex('users').where({id:id})
            // console.log('==============',Userinfo);
            req.UserData=Userinfo
            next()
        }else{
            res.send({message:"First login"})
            console.log('please login first................');
        }
    } catch (error) {
        if(error.code=='ERR_HTTP_HEADERS_SENT'){
            res.json({"m":Userinfo})
            next()
        }
    }
}
module.exports={CreateToken,varifyUser}