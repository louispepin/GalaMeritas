'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;

		$scope.votes = 150;
		$scope.but = 1000;

    }
]);

