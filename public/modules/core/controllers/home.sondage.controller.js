'use strict';


angular.module('core').controller('SondageController', ['$scope', '$http', 'Authentication',
    function($scope, $http, Authentication) {
        $scope.authentication = Authentication;

        $scope.noAux = false;
        $scope.noCharge = false;
        $scope.noProf = false;
        $scope.noSSH = false;
        $scope.noMTH = false;

        $scope.matricule = '';
        $scope.type = '';
        $scope.typeCheck = '';

        $scope.submitted = false;
        $scope.matriculeValide = true;

        $scope.data2014 = [];
        $scope.data2015 = [];

        $scope.votePrepa = '';
        $scope.voteAecsp = '';
        $scope.voteAep = {
            prof: '',
            charge: '',
            aux: '',
            mth: '',
            ssh: ''
        };

        $scope.serverPath = 'http://localhost:3000';

        $scope.actions = {
            submitId: function () {
                $scope.type = document.getElementById('type').value;

                $scope.data = {
                    profs: [],
                    charges: [],
                    aux: [],
                    ssh: [],
                    mth: []
                };

                // 2014
                $http.post($scope.serverPath + '/getData2014', {mat: $scope.matricule, type: $scope.type})
                    .success(function(data) {
                        $scope.data2014 = data;

                        $scope.data.profs = $scope.data.profs.concat($scope.data2014.profs);
                        $scope.data.charges = $scope.data.charges.concat($scope.data2014.charges);
                        $scope.data.aux = $scope.data.aux.concat($scope.data2014.aux);
                        $scope.data.ssh = $scope.data.ssh.concat($scope.data2014.ssh);
                        $scope.data.mth = $scope.data.mth.concat($scope.data2014.mth);
                    });

                // 2015
                $http.post($scope.serverPath + '/getData2015', {mat: $scope.matricule, type: $scope.type})
                    .success(function(data) {
                        $scope.data2015 = data;

                        $scope.data.profs = $scope.data.profs.concat($scope.data2015.profs);
                        $scope.data.charges = $scope.data.charges.concat($scope.data2015.charges);
                        $scope.data.aux = $scope.data.aux.concat($scope.data2015.aux);
                        $scope.data.ssh = $scope.data.ssh.concat($scope.data2015.ssh);
                        $scope.data.mth = $scope.data.mth.concat($scope.data2015.mth);
                    });

                $scope.submitted = true;
            },

            submitAll: function() {
                if($scope.type == 'prepa') {
                    $scope.data = {
                        matricule: $scope.matricule,
                        type: 'prepa',
                        vote: $scope.votePrepa
                    };

                    alert(angular.toJson($scope.data));
                }
                else if($scope.type == 'aecsp') {
                    $scope.data = {
                        matricule: $scope.matricule,
                        type: 'aecsp',
                        vote: $scope.voteAecsp
                    };

                    alert(angular.toJson($scope.data));
                }
                else if($scope.type == 'aep') {
                    $scope.data = {
                        matricule: $scope.matricule,
                        type: 'aep',
                        vote: $scope.voteAep
                    };

                    alert(angular.toJson($scope.data));
                }
            }
        };
    }
]);
