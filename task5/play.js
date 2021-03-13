const mongoose = require('moongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/session7',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true

})
const Doctor = mongoose.model('Doctor',{
name:{
    type: String,
    trim:true,
    required:true,
    unique:true,
    lowcase:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error('invalid email')
        }
    }
},
specialize:{
    type:String, 
    required:true
}
})

const doctorData = new Doctor({name:"alaa",specialize:'doctor'})
doctorData.save()
.then(()=>console.log('inserted'))
.catch(err=>console.log(err))


