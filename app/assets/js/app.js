angular.module('app', ['ngRoute'])
  .constant('COUNTRY_DATA_URL', 'http://api.geonames.org/countryInfoJSON')
  .constant('CAPITAL_DATA_URL', 'http://api.geonames.org/searchJSON');


angular.module('app').config(['$routeProvider', function ($routeProvider){
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
  .when('/details/:country/:countryCode/:countryPopulation/:capital/:countryArea', {
    templateUrl: 'partials/country.html',
    controller: 'CountryDetailController',
    resolve: {
      capitalPopulation: ['$route', 'dataService', function($route, dataService){
        var countryCode = $route.current.params.countryCode;
        var capital = $route.current.params.capital;
        return dataService.getCapitalPopulation(countryCode, capital);
      }]
    }
  })
  .otherwise({
    redirectTo: '/'
  });
}]);










