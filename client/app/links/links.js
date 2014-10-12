angular.module('shortly.links', [])

.controller('LinksController', function ($scope, $location, Auth, linkdata ) {
  // Your code here
  $scope.data = {
    links: linkdata,
    location: $location.path(),
    signout: Auth.signout
  };
  //$scope.getLinks = function(){
  //  Links.getLinks()
  //      .then(function(data) {
  //        $scope.data.links = data;
  //      })
  //      .catch(function(err){
  //        console.error(err);
  //      });
  //};
  //$scope.getLinks();
});
