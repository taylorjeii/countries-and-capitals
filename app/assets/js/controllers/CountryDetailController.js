angular.module('app').controller('CountryDetailController', ['$scope','$routeParams', CountryDetailController]);

function CountryDetailController($scope, $routeParams){
  $scope.country = $routeParams.country;
  $scope.capital = $routeParams.capital;
  console.log( 'country: ' + $scope.country + '. capital: ' + $scope.capital);
}