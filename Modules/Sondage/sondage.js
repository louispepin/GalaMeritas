angular.module('sondage', [])
    .controller('sondageCtrl', ['$scope', '$filter', function($scope, $filter) {
        document.title="Sondage";

        $scope.noProf = false;
        $scope.noCharge = false;
        $scope.noAux = false;

        $scope.allProfs = [];
        $scope.allCharges = [];
        $scope.allAux = [];

        $scope.vote = {
            prof: '',
            charge: '',
            aux: ''
        };

        $scope.cours = [
            {
                id: 0,
                name: ''
            },
            {
                id: 1,
                name: ''
            },
            {
                id: 2,
                name: ''
            }
        ];

        $scope.index = 0;

        $scope.actions = {
            add: function () {
                $scope.index++;
                $scope.cours.push({
                    id: $scope.index,
                    name: ''
                })
            },

            remove: function (c) {
                var index;
                for (var i=0; i<$scope.cours.length; i++) {
                    if ($scope.cours[i].id == c.id) {
                        index = i;
                    }
                }

                $scope.cours.splice(index, 1);
            },

            submitClasses: function () {
                alert(angular.toJson($scope.cours));
            },

            submitAll: function () {
                if ($scope.noProf)
                    $scope.vote.prof = null;

                if ($scope.noCharge)
                    $scope.vote.charge = null;

                if ($scope.noAux)
                    $scope.vote.aux = null;

                alert(angular.toJson($scope.vote));
            }
        };
    }]);
