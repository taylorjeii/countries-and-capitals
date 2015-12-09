var app =  angular.module('app', [
  'ngRoute'
]);



 // Route configurations
app.config(['$routeProvider', function ($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'partials/home.html'
    })
  .when('/countries', {
    templateUrl: 'partials/countriesList.html',
    controller: 'ListController',
    resolve: {
      countryList: ['dataService', function(dataService) {
        return dataService.getAllCountries();
      }]
    }
  })
  // .when('/details/:country', {
  //   templateUrl: 'partials/country.html',
  //   controller: 'MainController'
  // })
  .otherwise({
    redirectTo: '/'
  });
}]);


 // Main Controller Setup
app.controller('ListController', ['$scope','countryList', ListController]);

function ListController ($scope, countryList){
  
    $scope.countries = countryList;
    console.log($scope.country);
    // dataService.getAllCountries()
    //   .then(function(result){
    //     $scope.countries = result.geonames;
    //     console.log($scope.countries);
    //   });
 }

 // service configurations
 app.factory('dataService', ['$q', '$http', dataService]);

 function dataService ($q, $http){
    return {
      getAllCountries: getAllCountries
    };

    function getAllCountries (){
      return $http({
        method: 'GET',
        url: 'http://api.geonames.org/countryInfoJSON?username=atoburen'
      })
      .then(sendCountries)
      .catch(sendErrorMessage);
    }

    function sendCountries (response) {
      return response.data.geonames;
    }

    function sendErrorMessage (response) {
      return $q.reject('There was an error getting the data. (HTTP status: ' + response.status + ')' );
    }
 }