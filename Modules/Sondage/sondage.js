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

        $scope.indexAut = 5;
        $scope.indexHiv = 5;

        $scope.coursAut = [{id: 0, name: ''}, {id: 1, name: ''}, {id: 2, name: ''}, {id: 3, name: ''}, {id: 4, name: ''}];
        $scope.coursHiv = [{id: 0, name: ''}, {id: 1, name: ''}, {id: 2, name: ''}, {id: 3, name: ''}, {id: 4, name: ''}];

        $scope.actions = {
            addAut: function () {
                $scope.indexAut++;
                $scope.coursAut.push({
                    id: $scope.index,
                    name: ''
                })
            },

            addHiv: function () {
                $scope.indexHiv++;
                $scope.coursHiv.push({
                    id: $scope.index,
                    name: ''
                })
            },

            removeAut: function (c) {
                var index;
                for (var i=0; i<$scope.coursAut.length; i++) {
                    if ($scope.coursAut[i].id == c.id) {
                        index = i;
                    }
                }

                $scope.coursAut.splice(index, 1);
            },

            removeHiv: function (c) {
                var index;
                for (var i=0; i<$scope.coursHiv.length; i++) {
                    if ($scope.coursHiv[i].id == c.id) {
                        index = i;
                    }
                }

                $scope.coursHiv.splice(index, 1);
            },

            submitClasses: function () {
                var cours = [];

                for(var i=0; i<$scope.coursAut.length; i++) {
                    cours.push($scope.coursAut[i].name);
                }

                for(var i=0; i<$scope.coursHiv.length; i++) {
                    cours.push($scope.coursHiv[i].name);
                }

                alert(angular.toJson(cours));
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
