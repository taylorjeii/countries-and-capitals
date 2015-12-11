angular.module('app').controller('CountryDetailController', ['$scope','$routeParams', 'population', CountryDetailController]);

function CountryDetailController($scope, $routeParams, population){
  $scope.country = $routeParams.country;
  $scope.capital = $routeParams.capital;
  $scope.capital_population = population;
  console.log( 'country: ' + $scope.country + '. capital: ' + $scope.capital);
}