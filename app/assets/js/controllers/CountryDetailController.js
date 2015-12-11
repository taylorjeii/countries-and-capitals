angular.module('app').controller('CountryDetailController', ['$scope', 'country', 'countryCapital', 'countryNeighbors', CountryDetailController]);

function CountryDetailController($scope, country, countryCapital, countryNeighbors){
  $scope.country = country;
  $scope.capital = countryCapital;
  $scope.neighbors = countryNeighbors;
  console.log($scope.neighbors);
  // $scope.capital = $routeParams.capital;
  // $scope.capitalPopulation = capitalPopulation;
  // $scope.countryNeighbors = countryNeighbors;

}