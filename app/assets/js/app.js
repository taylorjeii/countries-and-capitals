var app =  angular.module('app', ['ngRoute'])
  .constant('COUNTRY_DATA_URL', 'http://api.geonames.org/countryInfoJSON')
  .constant('CAPITAL_DATA_URL', 'http://api.geonames.org/searchJSON');



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
  .when('/details/:country', {
    templateUrl: 'partials/country.html',
    controller: 'CountryDetailController',
    resolve: {
      country: ['$route', 'dataService', function($route, dataService){
        var country = $route.current.params.country;
        return dataService.getCountry(country);
      }]
    }
  })
  .otherwise({
    redirectTo: '/'
  });
}]);


 // Main Controller Setup
app.controller('ListController', ['$scope','countryList', ListController]);

function ListController ($scope, countryList){
    $scope.countries = countryList;

    console.log('im doing what you want');
    // dataService.getAllCountries()
    //   .then(function(result){
    //     $scope.countries = result.geonames;
    //     console.log($scope.countries);
    //   });
 }

app.controller('CountryDetailController', ['$scope','country', CountryDetailController]);

function CountryDetailController($scope, country){
  $scope.country = country;
}




 // service configurations
 app.factory('dataService', ['$q', '$http', 'COUNTRY_DATA_URL', 'CAPITAL_DATA_URL', dataService]);

 function dataService ($q, $http, COUNTRY_DATA_URL, CAPITAL_DATA_URL){
    return {
      getAllCountries: getAllCountries
    };

    // get all countries
    function getAllCountries (){
      var config = {
        cache: true,
        params: {
          username: 'atoburen'
        }
      };
      return $http.get(COUNTRY_DATA_URL, config)
              .then(sendCountries)
              .catch(sendErrorMessage);

      // return $http({
      //   method: 'GET',
      //   url: 'http://api.geonames.org/countryInfoJSON?username=atoburen'
      // })
      // .then(sendCountries)
      // .catch(sendErrorMessage);

        // send country data
        function sendCountries (response) {
        return response.data.geonames;
      }
    }

    // get capital for given country
     function getCountry (country){
      var config = {
        cache: true,
        params: {
          lang: 'en',
          username: 'atoburen',
          country: country
        }
      };
      return $http.get(COUNTRY_DATA_URL, config)
              .then(sendCountry)
              .catch(sendErrorMessage);

        function sendCountry (response) {
        return response.data;
      }
    }

    // response if there is an error retrieving the data
    function sendErrorMessage (response) {
      return $q.reject('There was an error getting the data. (HTTP status: ' + response.status + ')' );
    }
 }