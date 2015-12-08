angular.module('app').controller('CountryDetailController', ['$scope','$routeParams', 'capital', CountryDetailController]);

function CountryDetailController($scope, $routeParams, capital){
  $scope.country = $routeParams.country;
  $scope.capital = capital;
  console.log( 'country: ' + $scope.country + '. capital: ' + $scope.capital);
}