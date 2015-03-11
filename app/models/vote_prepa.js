'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var vote_prepa_schema = new Schema(
    {
        Matricule: {
            type: Number,
            unique: true,
            index: true
        },
        Nom: {
            type: String
        },
        Sigle: {
            type: String
        }
    },
    {
        collection: 'votes_prepa'
    }
);

mongoose.model('vote_prepa', vote_prepa_schema);
