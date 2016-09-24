var myApp = angular.module('myApp', []);

myApp.controller('indexCtrl', function($scope, $http) {
    $scope.test = "hello";
    $scope.ids = [];
    $scope.urlids=[];
    $http({
        method: 'GET',
        url: '/ids'
    }).then(function success(response) {
        $scope.ids = response.data;
        for(var i = 0; i < $scope.ids.length; i++) {
            $scope.ids[i] = $scope.ids[i];
        }
    }, function error(response) {
        console.log(response);
    });
    $scope.testfunc = function() {
        console.log($scope.ids);
    };
});