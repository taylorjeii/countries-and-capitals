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
 app.controller('MainController', ['$scope','dataService', MainController]);
 function MainController ($scope, dataService){
  $scope.countryData = dataService.getAllCountries();
  $scope.hello = 'hello';
  console.log('blah');
 }


// Service to retrieve country data
app.factory('dataService',['$http', '$q', dataService]);

function dataService ($http, $q){
  return {
    getAllCountries: getAllCountries
  };


  function getAllCountries(){
     return $http({
      method: 'GET',
      url: 'api.geonames.org/countryInfo?username=demo'
     })
     .then(sendCountryData)
     .catch(sendErrorMessage);
  }

  function sendCountryData (response){
    return response.data;
   }

   function sendErrorMessage (response){
    return $q.reject('Error retrieving countries data. (HTTP status: ' + response.status + ')');
   }

}


