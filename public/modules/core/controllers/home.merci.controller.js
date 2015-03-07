'use strict';


angular.module('core').controller('MerciController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
    }
]);
