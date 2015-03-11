'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
            state('home', {
                url: '/',
                templateUrl: 'modules/core/views/home.client.view.html',
                controller: 'HomeController'
            });

		$stateProvider.
            state('sondage', {
                url: '/sondage/',
                templateUrl: 'modules/core/views/home.sondage.view.html',
                controller: 'SondageController'
            });

		$stateProvider.
            state('merci', {
                url: '/merci/',
                templateUrl: 'modules/core/views/home.merci.view.html',
                controller: 'MerciController'
            });
	}
]);
