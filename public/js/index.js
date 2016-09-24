var myApp = angular.module('myApp', []);

myApp.controller('indexCtrl', '$http', function indexCtrl($scope, $http) {
    $scope.test = "hello";

});