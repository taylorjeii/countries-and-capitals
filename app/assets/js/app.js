angular.module('app', ['ngRoute', 'uiGmapgoogle-maps'])
  .constant('COUNTRY_DATA_URL', 'http://api.geonames.org/countryInfoJSON')
  .constant('CAPITAL_DATA_URL', 'http://api.geonames.org/searchJSON')
  .constant('NEIGHBORS_DATA_URL', 'http://api.geonames.org/neighboursJSON');

angular.module('app')
  .run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 1000);
    });
});



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
      country: ['$route', 'dataService', function($route, dataService){
        var country = $route.current.params.country;
        return dataService.getCountry(country);
      }],
      countryCapital: ['$route', 'dataService', function($route, dataService){
        var country = $route.current.params.country;
        var capital = $route.current.params.capital;
        return dataService.getCapital(country, capital);
      }],
      countryNeighbors: ['$route', 'dataService', function($route, dataService){
        var country = $route.current.params.country;
        return dataService.getNeighbors(country);
      }]
    }
  })
  .otherwise({
    redirectTo: '/'
  });
}]);










