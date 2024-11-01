const mongoose = require('mongoose')

// schema design
const userSchema = new mongoose.Schema({
name:{
    type:String,
    required: [true, 'name is required'],
},
email:{
    type:String,
    required: [true, 'email is required and should be unique'],
},
password:{
    type:String,
    required: [true, 'password is required'],
},

},{timestamps: true})
// export
//userSchema is passed as the second argument, meaning this model will follow the defined schema.
//The model acts as the interface to interact with the MongoDB collection (performing operations such as create, read, update, and delete).
//The schema is converted into a userModel, which is then exported for use in other parts of the application.
const userModel = mongoose.model('users', userSchema)
module.exports= userModel