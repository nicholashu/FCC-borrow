'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecordSchema = new Schema({
  album: String,
  artist: String,
  condition: Number,
  description: String,
  owner: String,
  loaner: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Record', RecordSchema);