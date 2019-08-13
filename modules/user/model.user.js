'use strict';

const Mongoose = require('mongoose');
const debug = require('debug')('me.boaviagem.api:model.user.js');

var schemaApp = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  description: String,
  kind: {
    type: String,
    enum: [
      'native', // We don't know the origin of requests (ex: mobile apps). Allow all origins and require a clientId/clientSecret
      'web' // We know the origin of requests. Don't require a clientId/clientSecret
    ]
  },
  AllowedOrigin: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  clientSecret: {
    type: String, // 'web' kind applications don't need a client secret, but 'native' ones need.
  }
});
schemaApp.index({ clientId: 1 });

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
  username: {
    type: String
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
      'admin', // admin only your blogs and apps, including users and content
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
  }],
  apps: [ schemaApp ]
});

schema.pre('save', function(next){
  this.modifiedAt = Date.now();
  return next();
});

schema.method.addClient = async function(name, kind, allowedOrigin){

  /*
   * var schemaApp = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  description: String,
  kind: {
    type: String,
    enum: [
      'native', // We don't know the origin of requests (ex: mobile apps). Allow all origins and require a clientId/clientSecret
      'web' // We know the origin of requests. Don't require a clientId/clientSecret
    ]
  },
  AllowedOrigin: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  clientSecret: {
    type: String, // 'web' kind applications don't need a client secret, but 'native' ones need.
  }
});

   * */
};

var User = Mongoose.model('user', schema);
module.exports = User;
