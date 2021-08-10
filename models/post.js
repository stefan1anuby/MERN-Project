const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
     description: { type: String, required: true, minlength: 3 ,maxlength: 10000 },
     username: { type: String, required: true, trim: true, minlength: 5, unique: false },
     userID: { type: Schema.Types.ObjectId, ref: 'User' },
     image: { type: String },
     title: { type: String, required: true , minlength:3},
     tags: [{ type: String }],
     
}, {
     timestamps:true
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post