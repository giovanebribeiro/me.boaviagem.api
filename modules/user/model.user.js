'use strict';

const Mongoose = require('mongoose');
const debug = require('debug')('me.boaviagem.api:model.user.js');

var schema = new Mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  modifiedAt: {
    type: Date
  },
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    index: true
  },
  scope:{
    type: String,
    enum: [ 
      'root', // manage all blogs and users, but not content
      'admin', // admin only your blogs, including users and content
      'postmaster', // manage posts only
    ],
    default: 'admin'
  },
  auth:[{
    provider: { type: String, required: true },
    id: String,
    email: String,
    raw: {
      type: Mongoose.Schema.Types.Mixed,
      required: true
    }
  }]
});

schema.pre('save', function(next){
  this.modifiedAt = Date.now();
  return next();
});

var User = Mongoose.model('user', schema);
module.exports = User;
