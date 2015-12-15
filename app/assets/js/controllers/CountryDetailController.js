angular.module('app').controller('CountryDetailController', ['$scope', 'country', 'countryCapital', 'countryNeighbors', CountryDetailController]);

function CountryDetailController($scope, country, countryCapital, countryNeighbors){
  $scope.country = country;
  $scope.capital = countryCapital;
  $scope.neighbors = countryNeighbors;

  var longitude = $scope.capital.lng;
  var latitude = $scope.capital.lat;
  $scope.map = { center: { latitude: latitude, longitude: longitude }, zoom: 5 };
}