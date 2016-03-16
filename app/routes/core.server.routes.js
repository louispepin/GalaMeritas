'use strict';
var mongoose = require('mongoose');
var matricules = mongoose.model('matricules');
var profs = mongoose.model('profs');
var charges = mongoose.model('charges');
var aux = mongoose.model('aux');
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
    app.post('/getData', function(req, res) {
        var sigles = [];
        matricules.find({'Matricule': req.body.mat}, function (err, result) {
            for (var i = 0; i < result.length; i++) {
                sigles.push(result[i].Sigle);
            }

            if (sigles.length === 0) {
                res.send('Invalid');
                return;
            }

            // PROFS
            profs.find({'Sigle': { $in: sigles } }, function (err, result) {
                var profs = [];
                for (var i = 0; i < result.length; i++) {
                    profs.push({'Name': result[i].Nom, 'Sigle': result[i].Sigle});
                }

                // CHARGES
                charges.find({'Sigle': { $in: sigles } }, function (err, result) {
                    var charges = [];
                    for (var i = 0; i < result.length; i++) {
                        charges.push({'Name': result[i].Nom, 'Sigle': result[i].Sigle});
                    }

                    // AUX
                    aux.find({'Sigle': { $in: sigles } }, function (err, result) {
                        var aux = [];
                        for (var i = 0; i < result.length; i++) {
                            aux.push({'Name': result[i].Nom, 'Sigle': result[i].Sigle});
                        }

                        var response = {
                            profs: profs,
                            charges: charges,
                            aux: aux
                        };

                        res.send(response);
                    });
                });
            });
        });
    });

    /**
     * VOTE PREPA
     */
    app.post('/votePrepa', function(req, res) {

        vote.findOne({'Matricule': req.body.matricule}, function(err, obj) {
            if (obj) {
                res.send("duplicate");
                res.end();
            }
            else {
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
            }
        });
    });


    /**
     * VOTE AEP
     */
    app.post('/voteAep', function(req, res) {

        vote.findOne({'Matricule': req.body.matricule}, function(err, obj) {
            if (obj) {
                res.send("duplicate");
                res.end();
            }
            else {
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
            }
        });
    });


    /**
     * VOTE AECSP
     */
    app.post('/voteAecsp', function(req, res) {

        vote.findOne({'Matricule': req.body.matricule}, function(err, obj){
            if (obj) {
                res.send("duplicate");
                res.end();
            }
            else {

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
            }
        });
    });


    /**
     * GET NB VOTES
     */
    app.post('/getNbVotes', function(req, res) {
        vote.find(null, function(err, found) {

            var unique = [];
            for (var i=0; i<found.length; i++) {
                var duplicate = false;

                for (var j=0; j<unique.length; j++) {
                    if (found[i].Matricule === unique[j].Matricule)
                        duplicate = true;
                }

                if (!duplicate)
                    unique.push(found[i]);
            }

           res.send({"votes": unique.length});
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
            else {
                res.send('Ok');
            }
        });
    });
};
