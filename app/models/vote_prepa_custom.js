'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var vote_prepa_custom_schema = new Schema(
    {
        Matricule: {
            type: Number
        },
        NomCustom: {
            type: String
        }
    },
    {
        collection: 'votes_prepa_custom'
    }
);

mongoose.model('vote_prepa_custom', vote_prepa_custom_schema);
