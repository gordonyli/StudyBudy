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
        for(var i = 0; i < $scope.ids.length; i++) {
            $scope.ids[i] = $scope.ids[i];
        }
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
        })
    }

});