// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:{
   type:String
  },
  image:{
   type:String
  },
  
  date: {
    type: String,
    default: () => new Date().toLocaleDateString('en-GB') // e.g. "12/06/2025"
  },
  time: {
    type: String,
    default: () => new Date().toLocaleTimeString('en-GB') // e.g. "12:32:45"
  },
  likes: {
    type: Array,
    default: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
 