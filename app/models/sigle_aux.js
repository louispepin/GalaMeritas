'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var aux_schema = new Schema(
    {
        Sigle: {
            type: String
        },
        Nom: {
            type: String
        }
    },
    {
        collection: 'sigle_aux'
    }
);

mongoose.model('aux', aux_schema);