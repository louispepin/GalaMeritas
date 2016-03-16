'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var profs_schema = new Schema(
    {
        Sigle: {
            type: String
        },
        Nom: {
            type: String
        }
    },
    {
        collection: 'sigle_prof'
    }
);

mongoose.model('profs', profs_schema);