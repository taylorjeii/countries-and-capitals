angular.module('app').controller('CountryDetailController', ['$scope','$routeParams', 'capitalPopulation', CountryDetailController]);

function CountryDetailController($scope, $routeParams, capitalPopulation){
  $scope.country = $routeParams.country;
  $scope.countryPopulation = $routeParams.countryPopulation;
  $scope.countryArea = $routeParams.countryArea;
  $scope.capital = $routeParams.capital;
  $scope.capitalPopulation = capitalPopulation;
  console.log( 'country: ' + $scope.country +
               '. capital: ' + $scope.capital +
               '. capital population: ' + $scope.capitalPopulation

    );
}