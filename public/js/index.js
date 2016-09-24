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
        console.log(typeof $scope.ids[1]);
    };

    // $scope.testURLfunc = function() {
    //     for(var i =0; i < ids.length; i++) {
    //         $http({
    //             method: 'GET',
    //             url: '/https://api.twitter.com/1.1/statuses/show.json?id=' + ids[i]
    //         }).then(function success(response) {
    //             var myElement = "<div>"
    //             angular.element(document.body).append(myElement);
    //
    //         }, function error(response) {
    //             console.log(response);
    //         });
    //     }
    // }
});