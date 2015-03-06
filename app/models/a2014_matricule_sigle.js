'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var matricules_a2014_schema = new Schema(
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
        collection: 'a2014_matricule_sigle'
    }
);

mongoose.model('matricules_a2014', matricules_a2014_schema);