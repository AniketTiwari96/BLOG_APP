const validator=require('validator')

const validate=(req,res,next)=>{
    const {name,gmail,password,mobile_number}=req.body
    if(!( name && gmail && password && mobile_number)){
        return res.send('please send full information............')
    }
    if(!(validator.isEmail(gmail))){
        return res.send('please enter valid gmaid id...........')
    }
    if(!validator.isStrongPassword(password,{minlength:8,minLowercase:1,minUppercase:1,minNumber:1,minSymbols:1})){
        return res.send('your password is not strong\nPlease enter your strong password..............')
    }
    if(!((mobile_number.length==10)&&validator.isMobilePhone(mobile_number))){
        return res.send('your length is not right\nPlease enter your right mobile number............')
    }
    next()
    
    
}
module.exports=validate