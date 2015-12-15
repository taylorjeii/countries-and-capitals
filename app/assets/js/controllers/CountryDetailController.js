<<<<<<< HEAD
angular.module('app').controller('CountryDetailController', ['$scope','$routeParams', 'population', CountryDetailController]);

function CountryDetailController($scope, $routeParams, population){
  $scope.country = $routeParams.country;
  $scope.capital = $routeParams.capital;
  $scope.capital_population = population;
  console.log( 'country: ' + $scope.country + '. capital: ' + $scope.capital);
=======
angular.module('app').controller('CountryDetailController', ['$scope', 'country', 'countryCapital', 'countryNeighbors', CountryDetailController]);

function CountryDetailController($scope, country, countryCapital, countryNeighbors){
  $scope.country = country;
  $scope.capital = countryCapital;
  $scope.neighbors = countryNeighbors;

  var longitude = $scope.capital.lng;
  var latitude = $scope.capital.lat;
  $scope.map = { center: { latitude: latitude, longitude: longitude }, zoom: 8 };



  console.log( 'longitude: ' + longitude + ' latitude: ' + latitude);
>>>>>>> 5890359a77eac87d5f70284d435f49ee16d508fb
}