/**
 * Created by Sunil
 */

var express = require('express');
var cors = require('cors');
var app = express();
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
module.exports = app;