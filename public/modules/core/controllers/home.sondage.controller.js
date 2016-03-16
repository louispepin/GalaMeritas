'use strict';


angular.module('core').controller('SondageController', ['$scope', '$http', '$filter', 
    function($scope, $http, $filter) {

        $scope.user = {};
        $scope.user.matricule = '';
        $scope.user.type = '';

        $scope.submitted = false;
        $scope.matriculeValide = true;

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

        $scope.$watch('user.matricule', function() {
            $scope.matriculeValide = !isNaN($scope.user.matricule);
        })

        //$scope.serverPath = 'http://localhost:3000';
        $scope.serverPath = 'https://meritas.aep.polymtl.ca';


        $scope.actions = {
            submitId: function () {
                $scope.submitted = false;
                if (!$scope.matriculeValide)
                    return;

                $scope.dataAep = {
                    profs: [],
                    charges: [],
                    aux: []
                };

                $scope.dataPrepa = [];
                $scope.dataAecsp = [];

                $http.post($scope.serverPath + '/checkId', {mat: $scope.user.matricule})
                    .success(function(data) {
                        if (data === 'Found') {
                            alert("Merci de ne voter qu'une seule fois!");
                            $scope.matriculeValide = false;
                            return;
                        }
                    });

                $http.post($scope.serverPath + '/getData', {mat: $scope.user.matricule})
                    .success(function (data) {
                        if (data === 'Invalid') {
                            $scope.invalid = true;
                            return;
                        }

                        $scope.dataAep.profs = data.profs;
                        $scope.dataAep.charges = data.charges;
                        $scope.dataAep.aux = data.aux;

                        $scope.dataPrepa = $scope.dataPrepa.concat($scope.dataAep.profs, $scope.dataAep.charges, $scope.dataAep.aux);
                        $scope.dataAecsp = $scope.dataAecsp.concat($scope.dataAep.profs, $scope.dataAep.charges, $scope.dataAep.aux);

                        $scope.submitted = true;
                    });
            },

            submitVote: function () {
                var vote = null;

                if ($scope.user.type === 'prepa') {

                    vote = {
                        matricule: $scope.user.matricule,
                        nom: $scope.votePrepa.nom.Name,
                        sigle: $scope.votePrepa.nom.Sigle,
                        nomCustom: $scope.votePrepa.nomCustom
                    };

                    $http.post($scope.serverPath + '/votePrepa', angular.toJson(vote))
                        .success(function() {
                            vote = null;
                        });
                }
                else if ($scope.user.type === 'aep') {

                    vote = {
                        matricule: $scope.user.matricule,
                        prof: $scope.voteAep.prof.Name,
                        profSigle: $scope.voteAep.prof.Sigle,
                        profCustom: $scope.voteAep.profCustom,
                        charge: $scope.voteAep.charge.Name,
                        chargeSigle: $scope.voteAep.charge.Sigle,
                        chargeCustom: $scope.voteAep.chargeCustom,
                        aux: $scope.voteAep.aux.Name,
                        auxSigle: $scope.voteAep.aux.Sigle,
                        auxCustom: $scope.voteAep.auxCustom
                    };

                    $http.post($scope.serverPath + '/voteAep', angular.toJson(vote))
                        .success(function() {
                            vote = null;
                        });
                }
                else if ($scope.user.type === 'aecsp') {

                    vote = {
                        matricule: $scope.user.matricule,
                        nom: $scope.voteAecsp.nom.Name,
                        sigle: $scope.voteAecsp.nom.Sigle,
                        nomCustom: $scope.voteAecsp.nomCustom
                    };

                    $http.post($scope.serverPath + '/voteAecsp', angular.toJson(vote))
                        .success(function() {
                            vote = null;
                        });
                }
            },

            selectPrepa: function (p) {
                if (p.Selected) {
                    p.Selected = false;
                    $scope.votePrepa = {};
                    return;
                }

                angular.forEach($scope.dataPrepa, function(value, key) {
                    value.Selected = false;
                });

                p.Selected = true;
                $scope.votePrepa.nom = p;
            }
        };
    }]);
