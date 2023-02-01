const validate=require('../validator/validate')
const userController=require('../Controller/control')
const {varifyUser}=require('../jwt/createToken')

const express=require('express')
const router=express.Router()

router.post('/createUser',validate,userController.CreateUser)

router.get('/login',userController.LoginUser)

router.post('/createblogPost',varifyUser,userController.CreateBlogPosts)

router.get('/SeeAllPosts',varifyUser,userController.SeeAllPosts)

router.post('/LikeDislike',varifyUser,userController.LikeDisLike)

module.exports = router

