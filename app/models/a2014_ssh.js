'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ssh_a2014_schema = new Schema(
    {
        Sigle: {
            type: String
        },
        Nom: {
            type: String
        }
    },
    {
        collection: 'a2014_ssh'
    }
);

mongoose.model('ssh_a2014', ssh_a2014_schema);