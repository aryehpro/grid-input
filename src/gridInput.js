/**
 * Created by Aryeh on 14/06/2016.
 */

angular.module('gridInput')
    .directive('gridInput', [function () {
        return {
            templateUrl: 'gridInput.html',
            restrict: 'E',
            replace: true,
            scope: {
                fields: '=',
                values: '=?',
                capitalization: '@'
            },
            controller: ['$scope', function ($scope) {

                $scope.addNewChip = function () {
                    var newChip = {};

                    for (var i = 0; i < $scope.fields.length; i++) {
                        newChip[$scope.fields[i].name] = $scope.newChip[$scope.fields[i].name];
                    }

                    $scope.values.push(newChip);

                    for (i = 0; i < $scope.fields.length; i++) {
                        $scope.newChip[$scope.fields[i].name] = '';
                    }
                };

                function init() {

                    $scope.capitalization = angular.isDefined($scope.capitalization) ? $scope.capitalization : 'none';

                    $scope.newChip = {};

                    for (var i = 0; i < $scope.fields.length; i++) {
                        $scope.newChip[$scope.fields[i].name] = '';
                    }

                    if (!$scope.values || $scope.values.length === 0) {
                        $scope.values = [];

                        var newChipCopy = {};

                        for (i = 0; i < $scope.fields.length; i++) {
                            newChipCopy[$scope.fields[i].name] = $scope.newChip[$scope.fields[i].name];
                        }

                        $scope.values.push(newChipCopy);
                    }
                }

                init();
            }]
        };
    }])
    .filter('capitalize', function () {
        return function (input, capitalization) {

            switch (capitalization) {
                case 'sentence':
                    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';

                case 'everyWord':
                    if (!input) {
                        return '';
                    }

                    var words = input.split(' ');

                    for (var i = 0; i < words.length; i++) {
                        words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1).toLowerCase();
                    }

                    return words.join(' ');
                
                case 'none':
                    return input;
            }
        };
    });
