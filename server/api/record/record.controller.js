'use strict';

var _ = require('lodash');
var Record = require('./record.model');

// Get list of records
exports.index = function(req, res) {
  Record.find(function (err, records) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(records);
  });
};

// Get a single record
exports.show = function(req, res) {
  Record.findById(req.params.id, function (err, record) {
    if(err) { return handleError(res, err); }
    if(!record) { return res.status(404).send('Not Found'); }
    return res.json(record);
  });
};

// Creates a new record in the DB.
exports.create = function(req, res) {
  Record.create(req.body, function(err, record) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(record);
  });
};

// Updates an existing record in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Record.findById(req.params.id, function (err, record) {
    if (err) { return handleError(res, err); }
    if(!record) { return res.status(404).send('Not Found'); }
    var updated = _.merge(record, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(record);
    });
  });
};

// Deletes a record from the DB.
exports.destroy = function(req, res) {
  Record.findById(req.params.id, function (err, record) {
    if(err) { return handleError(res, err); }
    if(!record) { return res.status(404).send('Not Found'); }
    record.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}