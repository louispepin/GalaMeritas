'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http',
	function($scope, $http) {
		$scope.votes = 0;
		$scope.but = 750;

        $scope.serverPath = 'http://localhost:3000';
        //$scope.serverPath = 'https://meritas.aep.polymtl.ca';

        $http.post($scope.serverPath + '/getNbVotes', {})
            .success(function (data) {
                $scope.votes = data.votes;
            });

    }
]);

