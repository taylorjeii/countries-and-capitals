var app =  angular.module('app', [
  'ngRoute',
  'angularUtils.directives.dirPagination'
]);



 // Route configurations
app.config(['$routeProvider', function ($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'partials/home.html',
    controller: 'MainController'
  })
  .when('/countries', {
    templateUrl: 'partials/countriesList.html',
    controller: 'MainController',
    resolve: {
      countriesData: ['dataService', function(dataService){
        return  dataService.getAllCountries();
      }]
    }
  })
  .when('/details/:country', {
    templateUrl: 'partials/country.html',
    controller: 'MainController'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);


 // Main Controller Setup
app.controller('MainController', ['$scope', '$routeParams' , 'countriesData', MainController]);

function MainController ($scope, $routeParams, countriesData){
    $scope.countries = countriesData;
    $scope.country = $routeParams.country;
    $scope.area = '';
    $scope.capital = '';
    $scope.capitalPop = '';
    $scope.neighbors = '';

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
      getAllCountries: getAllCountries,
      getNeighbors: getNeighbors
    };


    function getAllCountries (){
      return $http({
        method: 'GET',
        url: 'http://api.geonames.org/countryInfoJSON?username=demo'
      })
      .then(sendCountries)
      .catch(sendErrorMessage);
    }

    function sendCountries (response) {
      return response.data;
    }

    function sendErrorMessage (response) {
      return $q.reject('There was an error getting the data. (HTTP status: ' + response.status + ')' );
    }
 }