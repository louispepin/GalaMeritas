'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var vote_schema = new Schema(
    {
        Matricule: {
            type: Number
        }
    },
    {
        collection: 'votes'
    }
);

mongoose.model('vote', vote_schema);