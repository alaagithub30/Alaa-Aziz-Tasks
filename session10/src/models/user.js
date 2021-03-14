const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    userId:{type:Number},
    fname:{type:String, required:true, trim:true},
    lname:{type:String, required:true, trim:true},
    phone:{
        type:String,
        trim:true,
        //match:/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
    },
    country:{
        type:String,
        required:true,
        trim:true,
        enum:['egypt', 'palstine', 'canda', 'iraq']
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    birthdate:{
        type:Date
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('invalid email')
        }
    },
    username:{
        type:String,
        unique:true
    },
    addresses:[{
        address: {
            addrType:{type:String}, 
            addrDetails:{type:String}
        }
    }],
    friends:[{
        type:mongoose.Schema.Types.ObjectId
    }],
    tokens:[
        {token:{type:String, required:true}}
    ],
    userProfile:{
        type:String
    }
},{
    timestamps:true
}
)
userSchema.pre('save', async function(next){
    lastUser = await User.findOne({}).sort({_id:-1})
    user = this
    if(!user.username)  user.username =user._id
    
    //check on update
    if(!lastUser) user.userId=1
    else user.userId = lastUser.userId+1    
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 12)
    }
    next()
})
const User = mongoose.model('User',userSchema)
module.exports=User