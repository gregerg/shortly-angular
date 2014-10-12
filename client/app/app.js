angular.module('shortly', [
  'shortly.services',
  'shortly.links',
  'shortly.shorten',
  'shortly.auth',
  'shortly.nav',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider
     .otherwise('/');

  $stateProvider
      .state('root', {
        url: '/',
        authenticate: true,
        isRoot: true,
        views: {
          'nav': {
            templateUrl: '/app/nav/nav.html',
            controller: 'NavController'
          }
        }
      })
      .state('root.signup', {
        url: 'signup',
        views: {
          'main@':{
            templateUrl: '/app/auth/signup.html',
            controller: 'AuthController'
          }
        }
      })
      .state('root.signin', {
        url: 'signin',
        views: {
          'main@':{
            controller: 'AuthController',
            templateUrl: '/app/auth/signin.html'
          }
        }
      })
      .state('root.links', {
        url: 'links',
        authenticate: true,
        views: {
          'main@':{
            controller: 'LinksController',
            templateUrl: '/app/links/links.html'
          }
        },
        resolve : {
          linkdata: function(Links){
            return Links.getLinks();
          }
        }
      })
      .state('root.shorten', {
        url: 'shorten',
        authenticate: true,
        views: {
          'main@':{
            controller: 'ShortenController',
            templateUrl: '/app/shorten/shorten.html'
          }
        }
      });
    //.when('/signin', {
    //  templateUrl: 'app/auth/signin.html',
    //  controller: 'AuthController'
    //})
    //.when('/signup', {
    //  templateUrl: 'app/auth/signup.html',
    //  controller: 'AuthController'
    //})
    //.when('/links', {
    //  templateUrl: 'app/links/links.html',
    //  controller: 'LinksController',
    //  authenticate: true
    //})
    //.when('/shorten', {
    //  templateUrl: 'app/shorten/shorten.html',
    //  controller: 'ShortenController',
    //  authenticate: true
    //})
    //.otherwise({
    //  redirectTo: '/links'
    //})
    // Your code here

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, $state, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$stateChangeStart', function (evt, to, toParams, from, fromParams) {
    console.log('stateChangeStart fired!');
    if (to && to.authenticate) {
      if (!Auth.isAuth()) {
        evt.preventDefault();
        $state.go('root.signin');
      } else if(to.isRoot === true){
        //$state.go('root.links')
        $location.path('/links');
      }
    }
  });
});
