angular.module('gridInput', ['templates-dist', 'ngMaterial']);/**
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
                values: '=?'
            },
            controller: ['$scope', function ($scope) {

                $scope.addNewChip = function () {
                    var newChip = {};

                    for (var i = 0; i < $scope.fields.length; i++) {
                        newChip[$scope.fields[i]] = $scope.newChip[$scope.fields[i]];
                    }

                    $scope.values.push(newChip);

                    for (i = 0; i < $scope.fields.length; i++) {
                        $scope.newChip[$scope.fields[i]] = '';
                    }
                };

                function init() {

                    $scope.newChip = {};

                    for (var i = 0; i < $scope.fields.length; i++) {
                        $scope.newChip[$scope.fields[i]] = '';
                    }
                    
                    if (!$scope.values || $scope.values.length === 0) {
                        $scope.values = [];

                        var newChipCopy = {};

                        for (i = 0; i < $scope.fields.length; i++) {
                            newChipCopy[$scope.fields[i]] = $scope.newChip[$scope.fields[i]];
                        }

                        $scope.values.push(newChipCopy);
                    }
                }
                
                init();
            }]
        };
    }])
    .filter('capitalize', function () {
        return function (input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        };
    });
;
angular.module('templates-dist', ['gridInput.html']);

angular.module("gridInput.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gridInput.html",
    "<div>\n" +
    "    <form class=\"gi-form\" name=\"userForm\">\n" +
    "        <div>\n" +
    "            <md-input-container class=\"md-block\" ng-repeat=\"field in fields\">\n" +
    "                <label>{{field | capitalize}}</label>\n" +
    "                <input ng-model=\"newChip[field]\" ng-keyup=\"$last && $event.keyCode == 13 && addNewChip()\">\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "    <md-chips class=\"gi-chips\" ng-model=\"values\">\n" +
    "        <input disabled/>\n" +
    "        <md-chip-template>\n" +
    "            <div class=\"chip-val\" ng-repeat=\"(key, value) in $chip\">{{value}}</div>\n" +
    "        </md-chip-template>\n" +
    "    </md-chips>\n" +
    "</div>\n" +
    "");
}]);
