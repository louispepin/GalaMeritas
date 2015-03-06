'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var matricules_h2015_schema = new Schema(
    {
        Matricule: {
            type: Number
        },
        Sigle: {
            type: String
        },
        Intitulé: {
            type: String
        }
    },
    {
        collection: 'h2015_matricule_sigle'
    }
);

mongoose.model('matricules_h2015', matricules_h2015_schema);