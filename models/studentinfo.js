var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema

var StudentInfo = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  slack: { type: String, required: true }
});

var StudentModel = mongoose.model('student', StudentInfo);

// Make this available to our other files
module.exports = StudentModel;