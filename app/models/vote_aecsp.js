'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var vote_aecsp_schema = new Schema(
    {
        Matricule: {
            type: Number
        },
        Nom: {
            type: String
        },
        Sigle: {
            type: String
        }
    },
    {
        collection: 'votes_aecsp'
    }
);

mongoose.model('vote_aecsp', vote_aecsp_schema);
