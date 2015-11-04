var app =  angular.module('app', [
  'ngRoute'
]);



 // Route configurations
angular.module('app').config(['$routeProvider', function ($routeProvider){
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
app.controller('MainController', ['$scope', 'dataService', MainController]);

function MainController ($scope, dataService){
    $scope.countries = dataService.getAllCountries();
    $Sscope.hello = 'hello';
    console.log($scope.countries);
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
        url: 'http://api.geonames.org/countryInfoJSON?username=jet1991'
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