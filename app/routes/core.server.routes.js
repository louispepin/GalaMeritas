'use strict';
var mongoose = require('mongoose');
var matricules_a2014 = mongoose.model('matricules_a2014');
var matricules_h2015 = mongoose.model('matricules_h2015');
var profs_a2014 = mongoose.model('profs_a2014');
var profs_h2015 = mongoose.model('profs_h2015');

module.exports = function(app) {

	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);

    /**
     GET COURS
     **/
    app.post('/getData2014', function(req, res) {
        var sigles = [];
        matricules_a2014.find({'Matricule': req.body.mat}, function (err, result) {
            for (var i = 0; i < result.length; i++) {
                sigles.push(result[i].Sigle);
            }

            // PROFS
            profs_a2014.find({'Sigle': { $in: sigles } }, function (err, result) {
                var profs = [];
                for (var i = 0; i < result.length; i++) {
                    profs.push(result[i].Nom);
                }

                // CHARGES
                profs_a2014.find({'Sigle': { $in: sigles } }, function (err, result) {
                    var charges = [];
                    for (var i = 0; i < result.length; i++) {
                        charges.push(result[i].Nom);
                    }

                });
            });
        });
    });

    app.post('/getData2015', function(req, res) {
        var response = [];
        matricules_h2015.find({'Matricule': req.body.mat}, function(err, result) {
            for (var i = 0; i < result.length; i++) {
                response.push(result[i].Sigle);
            }

            res.send(response);
        });
    });

    /**
     GET PROFS
     **/
    app.post('/getProfs2014', function(req, res) {
        for (var i = 0; i < req.length; i++) {
            var response = [];
            matricules_h2015.find({'Sigle': req.body[i]}, function(err, result) {
                for (var i = 0; i < result.length; i++) {
                    response.push(result[i].Nom);
                }
            });
            res.send(response);
        }
    });

    app.post('get')
};