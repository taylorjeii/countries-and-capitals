angular.module('app').controller('ListController', ['$scope','countryList', ListController]);

function ListController ($scope, countryList){
    $scope.countries = countryList;
 }