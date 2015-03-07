'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var vote_aecsp_custom_schema = new Schema(
    {
        Matricule: {
            type: Number
        },
        NomCustom: {
            type: String
        }
    },
    {
        collection: 'votes_aecsp_custom'
    }
);

mongoose.model('vote_aecsp_custom', vote_aecsp_custom_schema);
