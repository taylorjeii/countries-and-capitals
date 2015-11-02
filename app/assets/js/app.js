 var app = angular.module('app', [
  'ngRoute'
]);


 // Route configurations
app.config(['$routeProvider', function ($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'partials/home.html',
    controller: 'MainController'
  })
  .when('/countries', {
    templateUrl: 'partials/countriesList.html',
    controller: 'MainController'
  })
  .when('/details', {
    templateUrl: 'partials/countryDetails.html',
    controller: 'MainController'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);

 // Main Controller Setup

 app.controller('MainController', ['$scope', MainController]);
 function MainController ($scope){
  $scope.write = 'hello world';
 }
