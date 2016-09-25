var myApp = angular.module('myApp', []);

myApp.controller('accountCtrl', function($scope, $http) {
    $scope.test = function() {
        console.log($scope.id);
    };
    $scope.ids = [];
    $scope.validClass = '';

    $http({
        method: 'GET',
        url: '/ids'
    }).then(function success(response) {
        $scope.ids = response.data;
        console.log("scope id for accCtrl = ");
        console.log($scope.ids);
    }, function error(response) {
        console.log(response);
    });

    $http({
        method: 'GET',
        url: '/validClass'
    }).then(function success(response) {
        $scope.validClass = response.data;
    }, function error(response) {
        console.log("You suck");
    });



});