function MainController($scope,dataService){$scope.countries=dataService.getAllCountries(),$Sscope.hello="hello",console.log($scope.countries)}function dataService($q,$http){function getAllCountries(){return $http({method:"GET",url:"http://api.geonames.org/countryInfoJSON?username=jet1991"}).then(sendCountries)["catch"](sendErrorMessage)}function sendCountries(response){return response.data}function sendErrorMessage(response){return $q.reject("There was an error getting the data. (HTTP status: "+response.status+")")}return{getAllCountries:getAllCountries}}var app=angular.module("app",["ngRoute"]);angular.module("app").config(["$routeProvider",function($routeProvider){$routeProvider.when("/",{templateUrl:"partials/home.html",controller:"MainController"}).when("/countries",{templateUrl:"partials/countriesList.html",controller:"MainController"}).when("/details",{templateUrl:"partials/countryDetails.html",controller:"MainController"}).otherwise({redirectTo:"/"})}]),app.controller("MainController",["$scope","dataService",MainController]),app.factory("dataService",["$q","$http",dataService]);