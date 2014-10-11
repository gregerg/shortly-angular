angular.module('shortly.links', [])

.controller('LinksController', function ($scope, $http, Links) {
  // Your code here
  $scope.data = {};
  $scope.getLinks = function(){
    Links.getLinks()
        .then(function(data) {
          $scope.data.links = data;
        })
        .catch(function(err){
          console.error(err);
        });
  };
  $scope.getLinks();
});
