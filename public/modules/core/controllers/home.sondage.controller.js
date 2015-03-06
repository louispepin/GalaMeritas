'use strict';


angular.module('core').controller('SondageController', ['$scope', '$http', 'Authentication',
    function($scope, $http, Authentication) {
        $scope.authentication = Authentication;
        $scope.noAux = $scope.noCharge = $scope.noProf = $scope.noSSH = $scope.noMTH = false;
        $scope.matricule = $scope.type = $scope.typeCheck = '';
        $scope.submitted = false;
        $scope.matriculeValide = true;

        $scope.cours2014 = $scope.cours2015 = [];

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

                // 2014
                $http.post($scope.serverPath + '/getData2014', {mat: $scope.matricule, type: $scope.type})
                    .success(function(data) {
                        alert(data);
                    });

                // 2015
                $http.post($scope.serverPath + '/getData2015', {mat: $scope.matricule, type: $scope.type})
                    .success(function(data) {
                        alert(data);
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
