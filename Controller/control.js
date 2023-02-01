const knex=require('../dbconnection/connection');
const { CreateToken } = require('../jwt/createToken');

const CreateUser= async (req,res)=>{
    try {
        const data = await knex('users').insert(req.body);
        res.send({me:"account created successfully...........",stauts:data})
        console.log(data);
        
    } catch (error) {
        if(error.code=='ER_DUP_ENTRY'){
            console.log('this account allreadt exist...............');
            res.send('this account allready exist..................')
        }else{
            console.log(error);
            res.send(error)
        }
        
    }
}
const LoginUser = async (req,res)=>{
    try {
        const {gmail,password}=req.body
        const data=await knex('users').where({gmail:gmail,password:password})
        const token=await CreateToken(data[0]['id'])
        res.cookie('cookie',token);
        res.send({m:'login successfuly....',status:data});
        console.log('this is token',token);
    } catch (error) {
        console.log('Sorry your Gmail and Password not exist.............');
        res.send('Sorry your Gmail and Password not exist.............');
    }

}
const CreateBlogPosts = async(req,res)=>{
    try {
        const data=await knex('BlogPosts').insert({Tital:req.body['Tital'],
                                                    Discription:req.body['Discription'],
                                                    UserId:req.UserData[0]['id']
                                                })
        res.json({message:'BlogPost created successuly........',status:data})
    } catch (error) {
        console.log(error);
        res.send({message:error.message})
    }
}
const SeeAllPosts = async (req,res)=>{
    try {
        const AllBlogPost = await knex('BlogPosts')
        const AllCreateData=await knex('users')

        let result=[]

        for(let Blogdata of AllBlogPost){
            for(let createdata of AllCreateData){

                if(Blogdata['UserId']==createdata['id']){

                    let Bdataobj={
                        "postId":Blogdata['id'],
                        "Tital":Blogdata['Tital'],
                        "Discription":Blogdata['Discription'],
                        "UserName":createdata['name']
                    }
                    result.push(Bdataobj)
                }
            }
        }
        res.send(result)
        console.log(result);

    } catch (error) {
        console.log(error);
        res.send('no data found.............')
    }
}
const LikeDisLike=async(req,res)=>{
    try {
        let likeData = await knex('LikeDisLike').where({ UserId:req.UserData[0]['id'],Post_Id:req.body['Post_Id']})
        if(likeData !=0){
            console.log('there is all data');
        }else{
            console.log('sorry there is no data ');
            console.log('+++++++++++++++++++++++',userData);

        }

    } catch (error) {
        res.send('this is not working............')
    }
}
module.exports={CreateUser,LoginUser,CreateBlogPosts,SeeAllPosts,LikeDisLike}