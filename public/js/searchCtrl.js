var myApp = angular.module('searchApp', []);

myApp.controller('searchCtrl', function($scope, $http) {
    $http({
        method: 'GET',
        url: '/ids'
    }).then(function success(response) {
        $scope.ids = response.data;
    }, function error(response) {
        console.log(response);
    });
    $scope.testfunc = function() {
        console.log("hello");
    };

    $scope.searchClass = function() {
        console.log('in searchclass');
        $http.get('/className', $scope.className).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        });
        console.log("Ids1: " + $scope.ids);
        console.log("Ids2: " + $scope.ids);
        console.log("Loaded");
    }

});