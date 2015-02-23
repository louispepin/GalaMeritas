'use strict';


angular.module('core').controller('SondageController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        $scope.authentication = Authentication;
        $scope.noAux = $scope.noCharge = $scope.noProf = $scope.submitted = false;


        $scope.vote = {
            matricule: '',
            prof: '',
            charge: '',
            aux: ''
        };

        $scope.actions = {
            submitId: function () {
                $scope.submitted = true;
            },
            submitAll: function() {
                alert(angular.toJson($scope.vote));
            }
        };
    }
]);
