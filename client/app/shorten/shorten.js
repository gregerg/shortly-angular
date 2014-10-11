angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $http, $location, Links) {
  // Your code here
  $scope.link = { url: "" };
  $scope.addLink = function() {
    $http.post('/api/links', $scope.link)
    .success(function() {
      $scope.link.url = "";
    });
  }
});
