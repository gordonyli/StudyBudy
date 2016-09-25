var myApp = angular.module('myApp', ['angular-simple-sidebar']);

myApp.controller('accountCtrl', function($scope, $http) {
    $scope.state = false;
    $scope.menuTitle = "Profile";
    $scope.settings = {
        close: true,
        closeIcon: "fa fa-times"
    };
    $scope.items = [
        {
            name: "Book a Study Room",
            link: "http://clough.gatech.edu/reserve.html",
            icon: "fa fa-book",
            target: "_blank"
        },
        {
            name: "Request Tutoring",
            link: "http://www.success.gatech.edu/tutoring-0",
            icon: "fa fa-pencil",
            target: "_blank"
        }
    ];
    $scope.theme = 'white';
    $scope.ids = [];

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

    $scope.tweet = function() {
        console.log(typeof $scope.newTweet);
        $http.post('/newTweet', $scope.newTweet).
        success(function(data) {
            console.log(typeof $scope.newTweet);
            console.log("posted successfully");
        }).error(function(data) {
            console.log($scope.newTweet);
            console.error("error in posting");
        });
    }

});