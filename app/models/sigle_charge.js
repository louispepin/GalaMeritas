'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var charges_schema = new Schema(
    {
        Sigle: {
            type: String
        },
        Nom: {
            type: String
        }
    },
    {
        collection: 'sigle_charge'
    }
);

mongoose.model('charges', charges_schema);