'use strict';
var mongoose = require('mongoose');
var matricules_a2014 = mongoose.model('matricules_a2014');
var matricules_h2015 = mongoose.model('matricules_h2015');
var profs_a2014 = mongoose.model('profs_a2014');
var profs_h2015 = mongoose.model('profs_h2015');
var charges_a2014 = mongoose.model('charges_a2014');
var charges_h2015 = mongoose.model('charges_h2015');
var aux_a2014 = mongoose.model('aux_a2014');
var aux_h2015 = mongoose.model('aux_h2015');
var ssh_a2014 = mongoose.model('ssh_a2014');
var ssh_h2015 = mongoose.model('ssh_h2015');
var mth_a2014 = mongoose.model('mth_a2014');
var mth_h2015 = mongoose.model('mth_h2015');

module.exports = function(app) {

	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);

    /**
     * 2014
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
                    profs.push({'Name': result[i].Nom});
                }

                // CHARGES
                charges_a2014.find({'Sigle': { $in: sigles } }, function (err, result) {
                    var charges = [];
                    for (var i = 0; i < result.length; i++) {
                        charges.push({'Name': result[i].Nom});
                    }

                    // AUX
                    aux_a2014.find({'Sigle': { $in: sigles } }, function (err, result) {
                        var aux = [];
                        for (var i = 0; i < result.length; i++) {
                            aux.push({'Name': result[i].Nom});
                        }

                        // SSH
                        ssh_a2014.find({'Sigle': { $in: sigles } }, function (err, result) {
                            var ssh = [];
                            for (var i = 0; i < result.length; i++) {
                                ssh.push({'Name': result[i].Nom});
                            }

                            // MTH
                            mth_a2014.find({'Sigle': { $in: sigles } }, function (err, result) {
                                var mth = [];
                                for (var i = 0; i < result.length; i++) {
                                    mth.push({'Name': result[i].Nom});
                                }

                                var response = {
                                    profs: profs,
                                    charges: charges,
                                    aux: aux,
                                    ssh: ssh,
                                    mth: mth
                                };

                                res.send(response);
                            });
                        });
                    });
                });
            });
        });
    });

    /**
     * 2015
     **/
    app.post('/getData2015', function(req, res) {
        var sigles = [];
        matricules_h2015.find({'Matricule': req.body.mat}, function (err, result) {
            for (var i = 0; i < result.length; i++) {
                sigles.push(result[i].Sigle);
            }

            // PROFS
            profs_h2015.find({'Sigle': { $in: sigles } }, function (err, result) {
                var profs = [];
                for (var i = 0; i < result.length; i++) {
                    profs.push({'Name': result[i].Nom});
                }

                // CHARGES
                charges_h2015.find({'Sigle': { $in: sigles } }, function (err, result) {
                    var charges = [];
                    for (var i = 0; i < result.length; i++) {
                        charges.push({'Name': result[i].Nom});
                    }

                    // AUX
                    aux_h2015.find({'Sigle': { $in: sigles } }, function (err, result) {
                        var aux = [];
                        for (var i = 0; i < result.length; i++) {
                            aux.push({'Name': result[i].Nom});
                        }

                        // SSH
                        ssh_h2015.find({'Sigle': { $in: sigles } }, function (err, result) {
                            var ssh = [];
                            for (var i = 0; i < result.length; i++) {
                                ssh.push({'Name': result[i].Nom});
                            }

                            // MTH
                            mth_h2015.find({'Sigle': { $in: sigles } }, function (err, result) {
                                var mth = [];
                                for (var i = 0; i < result.length; i++) {
                                    mth.push({'Name': result[i].Nom});
                                }

                                var response = {
                                    profs: profs,
                                    charges: charges,
                                    aux: aux,
                                    ssh: ssh,
                                    mth: mth
                                };

                                res.send(response);
                            });
                        });
                    });
                });
            });
        });
    });

    app.post('get')
};