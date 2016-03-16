'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var matricules_schema = new Schema(
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
        collection: 'matricule_sigle'
    }
);

mongoose.model('matricules', matricules_schema);