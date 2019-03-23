'use strict';

var Mongoose = require('mongoose');

var schema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  scope:{
    type: String,
    enum: [ 
      'root', // rule all blogs
      'admin', // admin only your blogs
      'postmaster', // manage posts
      'critic', // can comment posts, and it's all
    ],
    default: 'admin'
  },
  auth:[{
    provider: { type: String, required: true },
    id: String,
    raw: {
      type: Mongoose.Schema.Types.Mixed,
      required: true
    }
  }]
});

var User = Mongoose.model('user', schema);
module.exports = User;
