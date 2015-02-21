'use strict';


angular.module('core').controller('SondageController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        $scope.authentication = Authentication;
        $scope.noAux = $scope.noCharge = $scope.noProf = $scope.submitted = false;

        $scope.matricule = '';

        $scope.vote = {
            prof: '',
            charge: '',
            aux: ''
        };

        $scope.actions = {
            submitId: function () {
                alert(angular.toJson($scope.matricule));
                $scope.submitted = true;
            },
            submitAll: function() {
                alert(angular.toJson($scope.vote));
            }
        }
    }
]);
