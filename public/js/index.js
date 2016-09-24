var myApp = angular.module('myApp', []);

myApp.controller('indexCtrl', function($scope, $http) {
    $scope.test = "hello";
    $scope.ids = [];
    $http({
        method: 'GET',
        url: '/ids'
    }).then(function success(response) {
        $scope.ids = response.data;
    }, function error(response) {
        console.log(response);
    });
    $scope.testfunc = function() {
        console.log($scope.ids);
    }
});