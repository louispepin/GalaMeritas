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
var vote_prepa = mongoose.model('vote_prepa');
var vote_prepa_custom = mongoose.model('vote_prepa_custom');
var vote_aep = mongoose.model('vote_aep');
var vote_aecsp = mongoose.model('vote_aecsp');
var vote_aecsp_custom = mongoose.model('vote_aecsp_custom');
var vote = mongoose.model('vote');

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

            if (sigles.length === 0) {
                res.send('Invalid');
                return;
            }

            // PROFS
            profs_a2014.find({'Sigle': { $in: sigles } }, function (err, result) {
                var profs = [];
                for (var i = 0; i < result.length; i++) {
                    profs.push({'Name': result[i].Nom, 'Sigle': result[i].Sigle});
                }

                // CHARGES
                charges_a2014.find({'Sigle': { $in: sigles } }, function (err, result) {
                    var charges = [];
                    for (var i = 0; i < result.length; i++) {
                        charges.push({'Name': result[i].Nom, 'Sigle': result[i].Sigle});
                    }

                    // AUX
                    aux_a2014.find({'Sigle': { $in: sigles } }, function (err, result) {
                        var aux = [];
                        for (var i = 0; i < result.length; i++) {
                            aux.push({'Name': result[i].Nom, 'Sigle': result[i].Sigle});
                        }

                        // SSH
                        ssh_a2014.find({'Sigle': { $in: sigles } }, function (err, result) {
                            var ssh = [];
                            for (var i = 0; i < result.length; i++) {
                                ssh.push({'Name': result[i].Nom, 'Sigle': result[i].Sigle});
                            }

                            // MTH
                            mth_a2014.find({'Sigle': { $in: sigles } }, function (err, result) {
                                var mth = [];
                                for (var i = 0; i < result.length; i++) {
                                    mth.push({'Name': result[i].Nom, 'Sigle': result[i].Sigle});
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

            if (sigles.length === 0) {
                res.send('Invalid');
                return;
            }

            // PROFS
            profs_h2015.find({'Sigle': { $in: sigles } }, function (err, result) {
                var profs = [];
                for (var i = 0; i < result.length; i++) {
                    profs.push({'Name': result[i].Nom, 'Sigle': result[i].Sigle});
                }

                // CHARGES
                charges_h2015.find({'Sigle': { $in: sigles } }, function (err, result) {
                    var charges = [];
                    for (var i = 0; i < result.length; i++) {
                        charges.push({'Name': result[i].Nom, 'Sigle': result[i].Sigle});
                    }

                    // AUX
                    aux_h2015.find({'Sigle': { $in: sigles } }, function (err, result) {
                        var aux = [];
                        for (var i = 0; i < result.length; i++) {
                            aux.push({'Name': result[i].Nom, 'Sigle': result[i].Sigle});
                        }

                        // SSH
                        ssh_h2015.find({'Sigle': { $in: sigles } }, function (err, result) {
                            var ssh = [];
                            for (var i = 0; i < result.length; i++) {
                                ssh.push({'Name': result[i].Nom, 'Sigle': result[i].Sigle});
                            }

                            // MTH
                            mth_h2015.find({'Sigle': { $in: sigles } }, function (err, result) {
                                var mth = [];
                                for (var i = 0; i < result.length; i++) {
                                    mth.push({'Name': result[i].Nom, 'Sigle': result[i].Sigle});
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
     * VOTE PREPA
     */
    app.post('/votePrepa', function(req, res) {

        var model;
        if (req.body.nomCustom) {
            model = new vote_prepa_custom({
                Matricule: req.body.matricule,
                NomCustom: req.body.nomCustom
            });

            model.save();
        }
        else {
            model = new vote_prepa({
                Matricule: req.body.matricule,
                Nom: req.body.nom,
                Sigle: req.body.sigle
            });

            model.save();
        }

        var matricule = new vote({
            Matricule: req.body.matricule
        });

        matricule.save();
    });


    /**
     * VOTE AEP
     */
    app.post('/voteAep', function(req, res) {

        var model;
        model = vote_aep({
            Matricule: req.body.matricule,
            Prof: req.body.prof,
            ProfSigle: req.body.profSigle,
            ProfCustom: req.body.profCustom,
            Charge: req.body.charge,
            ChargeSigle: req.body.chargeSigle,
            ChargeCustom: req.body.chargeCustom,
            Aux: req.body.aux,
            AuxSigle: req.body.auxSigle,
            AuxCustom: req.body.auxCustom,
            Ssh: req.body.ssh,
            SshSigle: req.body.sshSigle,
            SshCustom: req.body.sshCustom,
            Mth: req.body.mth,
            MthSigle: req.body.mthSigle,
            MthCustom: req.body.mthCustom
        });

        model.save();

        var matricule = new vote({
            Matricule: req.body.matricule
        });

        matricule.save();
    });


    /**
     * VOTE AECSP
     */
    app.post('/voteAecsp', function(req, res) {

        var model;
        if (req.body.nomCustom) {
            model = new vote_aecsp_custom({
                Matricule: req.body.matricule,
                NomCustom: req.body.nomCustom
            });

            model.save();
        }
        else {
            model = new vote_aecsp({
                Matricule: req.body.matricule,
                Nom: req.body.nom,
                Sigle: req.body.sigle
            });

            model.save();
        }

        var matricule = new vote({
            Matricule: req.body.matricule
        });

        matricule.save();
    });


    /**
     * GET NB VOTES
     */
    app.post('/getNbVotes', function(req, res) {
        var nb = 0;

        vote_prepa.count(null, function(err, count) {
            nb += count;

            vote_prepa_custom.count(null, function(err, count) {
                nb += count;

                vote_aep.count(null, function(err, count) {
                    nb += count;

                    vote_aecsp.count(null, function(err, count) {
                        nb += count;

                        vote_aecsp_custom.count(null, function(err, count) {
                            nb += count;

                            res.send({'votes': nb});
                        });
                    });
                });
            });
        });
    });


    /**
     * CHECK ID
     */
    app.post('/checkId', function(req, res) {
        var matricule = req.body.mat;

        vote.findOne({'Matricule': matricule}, function(err, obj){
            if (obj) {
                res.send('Found');
            }
        });
    });
};
