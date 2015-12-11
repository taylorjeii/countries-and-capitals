angular.module('app', ['ngRoute'])
  .constant('COUNTRY_DATA_URL', 'http://api.geonames.org/countryInfoJSON')
  .constant('CAPITAL_DATA_URL', 'http://api.geonames.org/searchJSON');



 // Route configurations
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
  .when('/details/:country/:capital', {
    templateUrl: 'partials/country.html',
    controller: 'CountryDetailController',
    resolve: {
      capital: ['$route', 'dataService', function($route, dataService){
        var country = $route.current.params.country;
        var capital = $route.current.params.capital;
        console.log(capital);
        return dataService.getCapital(country, capital);
      }]
    }
  })
  .otherwise({
    redirectTo: '/'
  });
}]);










