'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var mth_h2015_schema = new Schema(
    {
        Sigle: {
            type: String
        },
        Nom: {
            type: String
        }
    },
    {
        collection: 'h2015_mth'
    }
);

mongoose.model('mth_h2015', mth_h2015_schema);