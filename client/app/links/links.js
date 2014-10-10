angular.module('shortly.links', [])

.controller('LinksController', function ($scope, $http, Links) {
  // Your code here
  $scope.data = {};
  $scope.getLinks = function(){
    $http.get('/api/links')
    .then(function(res) {
      $scope.data.links = res.data;
    })
  };
  $scope.getLinks();
});
