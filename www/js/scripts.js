function ListController($scope,countryList){$scope.countries=countryList}function CountryDetailController($scope,$routeParams){$scope.country=$routeParams.country,console.log($scope.country)}function dataService($q,$http,COUNTRY_DATA_URL,CAPITAL_DATA_URL){function getAllCountries(){function sendCountries(response){return response.data.geonames}var config={cache:!0,params:{username:"atoburen"}};return $http.get(COUNTRY_DATA_URL,config).then(sendCountries)["catch"](sendErrorMessage)}function sendErrorMessage(response){return $q.reject("There was an error getting the data. (HTTP status: "+response.status+")")}return{getAllCountries:getAllCountries}}angular.module("app",["ngRoute"]).constant("COUNTRY_DATA_URL","http://api.geonames.org/countryInfoJSON").constant("CAPITAL_DATA_URL","http://api.geonames.org/searchJSON"),angular.module("app").config(["$routeProvider",function($routeProvider){$routeProvider.when("/",{templateUrl:"partials/home.html"}).when("/countries",{templateUrl:"partials/countriesList.html",controller:"ListController",resolve:{countryList:["dataService",function(dataService){return dataService.getAllCountries()}]}}).when("/details/:country",{templateUrl:"partials/country.html",controller:"CountryDetailController",resolve:{}}).otherwise({redirectTo:"/"})}]),angular.module("app").controller("ListController",["$scope","countryList",ListController]),angular.module("app").controller("CountryDetailController",["$scope","$routeParams",CountryDetailController]),angular.module("app").factory("dataService",["$q","$http","COUNTRY_DATA_URL","CAPITAL_DATA_URL",dataService]);
function ListController($scope,countryList){$scope.countries=countryList}function CountryDetailController($scope,$routeParams){$scope.country=$routeParams.country,$scope.capital=$routeParams.capital,console.log("country: "+$scope.country+". capital: "+$scope.capital)}function dataService($q,$http,COUNTRY_DATA_URL,CAPITAL_DATA_URL){function getAllCountries(){function sendCountries(response){return response.data.geonames}var config={cache:!0,params:{username:"atoburen"}};return $http.get(COUNTRY_DATA_URL,config).then(sendCountries)["catch"](sendErrorMessage)}function sendErrorMessage(response){return $q.reject("There was an error getting the data. (HTTP status: "+response.status+")")}return{getAllCountries:getAllCountries}}angular.module("app",["ngRoute"]).constant("COUNTRY_DATA_URL","http://api.geonames.org/countryInfoJSON").constant("CAPITAL_DATA_URL","http://api.geonames.org/searchJSON"),angular.module("app").config(["$routeProvider",function($routeProvider){$routeProvider.when("/",{templateUrl:"partials/home.html"}).when("/countries",{templateUrl:"partials/countriesList.html",controller:"ListController",resolve:{countryList:["dataService",function(dataService){return dataService.getAllCountries()}]}}).when("/details/:country/:capital",{templateUrl:"partials/country.html",controller:"CountryDetailController",resolve:{}}).otherwise({redirectTo:"/"})}]),angular.module("app").controller("ListController",["$scope","countryList",ListController]),angular.module("app").controller("CountryDetailController",["$scope","$routeParams",CountryDetailController]),angular.module("app").factory("dataService",["$q","$http","COUNTRY_DATA_URL","CAPITAL_DATA_URL",dataService]);