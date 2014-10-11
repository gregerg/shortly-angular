angular.module('shortly.nav', [])

.controller('NavController', function ($scope, $location, Auth) {
  $scope.isAuthed = Auth.isAuth;
  $scope.isSelected = function(path){
    return ($location.path() === path);
  }
});
