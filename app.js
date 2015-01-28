angular.module('app', [
    'ngRoute',
    'sondage'
])
.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/sondage', {
            templateUrl: 'Modules/Sondage/sondage.html',
            controller: 'sondageCtrl'
        })
        .otherwise({
            redirectTo: '/sondage'
        });
    }]);