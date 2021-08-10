const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
     email: {type:String , required: true ,unique:true, trim:true ,minlength: 9 , maxlength: 40},
     username: { type: String, required: true, unique: true, trim: true, minlength: 3 , maxlength:40},
     password: { type: String, required: true, trim: true, minlength: 5 ,maxlength:40},
     about: { type: String, required: true, minlength: 5 ,maxlength:200},
     gender: { type: String, required: true, enum: ["male", "female"] },
     admin: { type: Boolean, required: true },
     image: { type: String }
}, {
     timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User