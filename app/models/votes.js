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
            type: Number,
            unique: true,
            index: true
        }
    },
    {
        collection: 'votes'
    }
);

mongoose.model('vote', vote_schema);