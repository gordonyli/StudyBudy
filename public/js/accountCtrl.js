var myApp = angular.module('myApp', []);

myApp.controller('accountCtrl', function($scope, $http) {
    $scope.test = "hello";
    $scope.ids = [];
    $scope.urlids=[];

    $http({
        method: 'GET',
        url: '/ids'
    }).then(function success(response) {
        $scope.ids = response.data;
    }, function error(response) {
        console.log(response);
    });

    $http({
        method: 'GET',
        url: '/ids'
    }).then(function success(response) {
        $scope.ids = response.data;
    }, function error(response) {
        console.log(response);
    });

});