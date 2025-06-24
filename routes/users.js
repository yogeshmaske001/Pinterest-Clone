// models/User.js
const mongoose = require('mongoose');
const plm= require("passport-local-mongoose");// user login
mongoose.connect("mongodb://127.0.0.1:27017/pinterestDB");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String
   
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" } ],
  dp: {
    type: String, // URL of the profile picture
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  profileImage:{
    type:String
  } 
  
},
  {
  timestamps: true // adds createdAt and updatedAt fields
});

userSchema.plugin(plm);
module.exports  = mongoose.model('User', userSchema);
