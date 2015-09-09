'use strict';


angular.module('core').controller('SondageController', ['$scope', '$http',
    function($scope, $http) {

        $scope.matricule = '';
        $scope.type = '';
        $scope.typeCheck = '';

        $scope.submitted = false;
        $scope.matriculeValide = true;
        $scope.finished2014 = false;
        $scope.finished2015 = false;
        $scope.invalid2014 = false;
        $scope.invalid2015 = false;

        $scope.data2014 = [];
        $scope.data2015 = [];

        $scope.votePrepa = {
            nom: '',
            nomCustom: ''
        };

        $scope.voteAecsp = {
            nom: '',
            nomCustom: ''
        };

        $scope.voteAep = {
            prof: '',
            charge: '',
            aux: '',
            mth: '',
            ssh: '',
            profCustom: '',
            chargeCustom: '',
            auxCustom: '',
            mthCustom: '',
            sshCustom: ''
        };

        $scope.serverPath = 'http://localhost:3000';

        $scope.actions = {
            submitId: function () {
                $scope.submitted = false;
                $scope.invalid2014 = false;
                $scope.invalid2015 = false;

                $scope.matriculeValide = !isNaN($scope.matricule);
                if (!$scope.matriculeValide)
                    return;

                $scope.type = document.getElementById('type').value;


                $scope.dataAep = {
                    profs: [],
                    charges: [],
                    aux: [],
                    ssh: [],
                    mth: []
                };

                $scope.dataPrepa = [];
                $scope.dataAecsp = [];

                $http.post($scope.serverPath + '/checkId', {mat: $scope.matricule})
                    .success(function(data) {
                        if (data === 'Found') {
                            //$scope.matriculeValide = false;
                        }
                    });

                // 2014
                $http.post($scope.serverPath + '/getData2014', {mat: $scope.matricule})
                    .success(function (data) {
                        if (data === 'Invalid') {
                            $scope.invalid2014 = true;
                        }

                        $scope.data2014 = data;

                        $scope.dataAep.profs = $scope.dataAep.profs.concat($scope.data2014.profs);
                        $scope.dataAep.charges = $scope.dataAep.charges.concat($scope.data2014.charges);
                        $scope.dataAep.aux = $scope.dataAep.aux.concat($scope.data2014.aux);
                        $scope.dataAep.ssh = $scope.dataAep.ssh.concat($scope.data2014.ssh);
                        $scope.dataAep.mth = $scope.dataAep.mth.concat($scope.data2014.mth);

                        $scope.dataPrepa = $scope.dataPrepa.concat($scope.data2014.profs, $scope.data2014.charges, $scope.data2014.aux, $scope.data2014.ssh, $scope.data2014.mth);
                        $scope.dataAecsp = $scope.dataAecsp.concat($scope.data2014.profs, $scope.data2014.charges, $scope.data2014.aux, $scope.data2014.ssh, $scope.data2014.mth);

                        $scope.finished2014 = true;
                        if ($scope.finished2015) {
                            $scope.submitted = true;
                        }

                        if ($scope.invalid2014 && $scope.invalid2015) {
                            $scope.matriculeValide = false;
                            $scope.submitted = false;
                        }
                    });

                // 2015
                $http.post($scope.serverPath + '/getData2015', {mat: $scope.matricule})
                    .success(function (data) {
                        if (data === 'Invalid') {
                            $scope.invalid2015 = true;
                        }

                        $scope.data2015 = data;

                        $scope.dataAep.profs = $scope.dataAep.profs.concat($scope.data2015.profs);
                        $scope.dataAep.charges = $scope.dataAep.charges.concat($scope.data2015.charges);
                        $scope.dataAep.aux = $scope.dataAep.aux.concat($scope.data2015.aux);
                        $scope.dataAep.ssh = $scope.dataAep.ssh.concat($scope.data2015.ssh);
                        $scope.dataAep.mth = $scope.dataAep.mth.concat($scope.data2015.mth);

                        $scope.dataPrepa = $scope.dataPrepa.concat($scope.data2015.profs, $scope.data2015.charges, $scope.data2015.aux, $scope.data2015.ssh, $scope.data2015.mth);
                        $scope.dataAecsp = $scope.dataAecsp.concat($scope.data2015.profs, $scope.data2015.charges, $scope.data2015.aux, $scope.data2015.ssh, $scope.data2015.mth);

                        $scope.finished2015 = true;
                        if ($scope.finished2014) {
                            $scope.submitted = true;
                        }

                        if ($scope.invalid2014 && $scope.invalid2015) {
                            $scope.matriculeValide = false;
                            $scope.submitted = false;
                        }
                    });
            },

            submitVote: function () {

                var vote = null;

                if ($scope.type === 'prepa') {

                    vote = {
                        matricule: $scope.matricule,
                        nom: $scope.votePrepa.nom.Name,
                        sigle: $scope.votePrepa.nom.Sigle,
                        nomCustom: $scope.votePrepa.nomCustom
                    };

                    $http.post($scope.serverPath + '/votePrepa', angular.toJson(vote))
                        .success(function() {
                            vote = null;
                        });
                }
                else if ($scope.type === 'aep') {

                    vote = {
                        matricule: $scope.matricule,
                        prof: $scope.voteAep.prof.Name,
                        profSigle: $scope.voteAep.prof.Sigle,
                        profCustom: $scope.voteAep.profCustom,
                        charge: $scope.voteAep.charge.Name,
                        chargeSigle: $scope.voteAep.charge.Sigle,
                        chargeCustom: $scope.voteAep.chargeCustom,
                        aux: $scope.voteAep.aux.Name,
                        auxSigle: $scope.voteAep.aux.Sigle,
                        auxCustom: $scope.voteAep.auxCustom,
                        ssh: $scope.voteAep.ssh.Name,
                        sshSigle: $scope.voteAep.ssh.Sigle,
                        sshCustom: $scope.voteAep.sshCustom,
                        mth: $scope.voteAep.mth.Name,
                        mthSigle: $scope.voteAep.mth.Sigle,
                        mthCustom: $scope.voteAep.mthCustom
                    };

                    $http.post($scope.serverPath + '/voteAep', angular.toJson(vote))
                        .success(function() {
                            vote = null;
                        });
                }
                else if ($scope.type === 'aecsp') {

                    vote = {
                        matricule: $scope.matricule,
                        nom: $scope.voteAecsp.nom.Name,
                        sigle: $scope.voteAecsp.nom.Sigle,
                        nomCustom: $scope.voteAecsp.nomCustom
                    };

                    $http.post($scope.serverPath + '/voteAecsp', angular.toJson(vote))
                        .success(function() {
                            vote = null;
                        });
                }
            }
        };
    }]);
