'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication',
	function($scope, $http, Authentication) {
		$scope.authentication = Authentication;

		$scope.votes = 0;
		$scope.but = 750;

        $scope.serverPath = 'http://localhost:3000';
        $http.post($scope.serverPath + '/getNbVotes', {})
            .success(function (data) {
                $scope.votes = data.votes;
            });

    }
]);

