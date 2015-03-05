'use strict';


angular.module('core').controller('SondageController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        $scope.authentication = Authentication;
        $scope.noAux = $scope.noCharge = $scope.noProf = $scope.noSSH = $scope.noMTH = false;
        $scope.matricule = $scope.type = $scope.typeCheck = '';
        $scope.submitted = false;
        $scope.matriculeValide = true;

        $scope.votePrepa = '';
        $scope.voteAecsp = '';
        $scope.voteAep = {
            prof: '',
            charge: '',
            aux: '',
            mth: '',
            ssh: ''
        };

        $scope.actions = {
            submitId: function () {
                $scope.submitted = true;
                $scope.matriculeValide = !$scope.matriculeValide;
                $scope.type = document.getElementById('type').value;
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
