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
    $scope.testfunc = function() {
        console.log("hello");
    };

    $scope.searchClass = function() {
        console.log('in searchclass');
        $http.post('/className',$scope.className).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        });
        console.log("Ids1: " + $scope.ids);
        location.reload();
        console.log("Ids2: " + $scope.ids);
        console.log("Loaded");
c    }

});