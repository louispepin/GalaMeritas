'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var vote_aep_schema = new Schema(
    {
        Matricule: {
            type: Number
        },
        Prof: {
            type: String
        },
        ProfSigle: {
            type: String
        },
        ProfCustom: {
            type: String
        },
        Charge: {
            type: String
        },
        ChargeSigle: {
            type: String
        },
        ChargeCustom: {
            type: String
        },
        Aux: {
            type: String
        },
        AuxSigle: {
            type: String
        },
        AuxCustom: {
            type: String
        },
        Ssh: {
            type: String
        },
        SshSigle: {
            type: String
        },
        SshCustom: {
            type: String
        },
        Mth: {
            type: String
        },
        MthSigle: {
            type: String
        },
        MthCustom: {
            type: String
        }
    },
    {
        collection: 'votes_aep'
    }
);

mongoose.model('vote_aep', vote_aep_schema);
