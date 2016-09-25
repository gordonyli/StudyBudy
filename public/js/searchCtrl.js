var myApp = angular.module('searchApp', ['angular-simple-sidebar']);

myApp.controller('searchCtrl', function($scope, $http) {
    $scope.ids = [];
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

    $http({
        method: 'GET',
        url: '/ids'
    }).then(function success(response) {
        $scope.ids = response.data;
    }, function error(response) {
        console.log(response);
    });

    $scope.searchClass = function() {
        console.log('in searchclass');
        $http.post('/className', $scope.className).
        success(function(data) {
            console.log($scope.className);
            console.log("posted successfully");
        }).error(function(data) {
            console.log($scope.className);

            console.error("error in posting");
        });
        window.location = "/account";
    }

});