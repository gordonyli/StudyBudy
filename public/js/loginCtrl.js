var myApp = angular.module('loginApp', []);

myApp.controller('loginCtrl', function($scope, $http) {
    $scope.searchClass = function() {
        console.log('in searchclass');
        $http.post('/className',$scope.className).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        })
    }
});