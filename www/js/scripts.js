function ListController($scope,countryList){$scope.countries=countryList}function CountryDetailController($scope,$routeParams){$scope.country=$routeParams.country,console.log($scope.country)}function dataService($q,$http,COUNTRY_DATA_URL,CAPITAL_DATA_URL){function getAllCountries(){function sendCountries(response){return response.data.geonames}var config={cache:!0,params:{username:"atoburen"}};return $http.get(COUNTRY_DATA_URL,config).then(sendCountries)["catch"](sendErrorMessage)}function sendErrorMessage(response){return $q.reject("There was an error getting the data. (HTTP status: "+response.status+")")}return{getAllCountries:getAllCountries}}angular.module("app",["ngRoute"]).constant("COUNTRY_DATA_URL","http://api.geonames.org/countryInfoJSON").constant("CAPITAL_DATA_URL","http://api.geonames.org/searchJSON"),angular.module("app").config(["$routeProvider",function($routeProvider){$routeProvider.when("/",{templateUrl:"partials/home.html"}).when("/countries",{templateUrl:"partials/countriesList.html",controller:"ListController",resolve:{countryList:["dataService",function(dataService){return dataService.getAllCountries()}]}}).when("/details/:country",{templateUrl:"partials/country.html",controller:"CountryDetailController",resolve:{}}).otherwise({redirectTo:"/"})}]),angular.module("app").controller("ListController",["$scope","countryList",ListController]),angular.module("app").controller("CountryDetailController",["$scope","$routeParams",CountryDetailController]),angular.module("app").factory("dataService",["$q","$http","COUNTRY_DATA_URL","CAPITAL_DATA_URL",dataService]);
function ListController($scope,countryList){$scope.countries=countryList}function CountryDetailController($scope,country,countryCapital,countryNeighbors){$scope.country=country,$scope.capital=countryCapital,$scope.neighbors=countryNeighbors;var longitude=$scope.capital.lng,latitude=$scope.capital.lat;$scope.map={center:{latitude:latitude,longitude:longitude},zoom:8},console.log("longitude: "+longitude+" latitude: "+latitude)}function dataService($q,$http,COUNTRY_DATA_URL,CAPITAL_DATA_URL,NEIGHBORS_DATA_URL){function getAllCountries(){function sendCountries(response){return response.data.geonames}var config={cache:!0,params:{username:"atoburen"}};return $http.get(COUNTRY_DATA_URL,config).then(sendCountries)["catch"](sendErrorMessage)}function getCountry(country){function sendCountry(response){return response.data.geonames[0]}var config={cache:!0,params:{username:"atoburen",country:country}};return $http.get(COUNTRY_DATA_URL,config).then(sendCountry)["catch"](sendErrorMessage)}function getCapital(country,capital){function sendCapital(response){return response.data.geonames[0]}var config={cache:!0,params:{username:"atoburen",lang:"en",maxRows:1,q:capital,name_equals:capital,country:country,isNameRequired:!0}};return $http.get(CAPITAL_DATA_URL,config).then(sendCapital)["catch"](sendErrorMessage)}function getNeighbors(country){function sendNeighbors(response){return response.data.geonames}var config={cache:!0,params:{username:"atoburen",country:country}};return $http.get(NEIGHBORS_DATA_URL,config).then(sendNeighbors)["catch"](sendErrorMessage)}function sendErrorMessage(response){return $q.reject("There was an error getting the data. (HTTP status: "+response.status+")")}return{getAllCountries:getAllCountries,getCountry:getCountry,getCapital:getCapital,getNeighbors:getNeighbors}}angular.module("app",["ngRoute","uiGmapgoogle-maps"]).constant("COUNTRY_DATA_URL","http://api.geonames.org/countryInfoJSON").constant("CAPITAL_DATA_URL","http://api.geonames.org/searchJSON").constant("NEIGHBORS_DATA_URL","http://api.geonames.org/neighboursJSON"),angular.module("app").config(["$routeProvider",function($routeProvider){$routeProvider.when("/",{templateUrl:"partials/home.html"}).when("/countries",{templateUrl:"partials/countriesList.html",controller:"ListController",resolve:{countryList:["dataService",function(dataService){return dataService.getAllCountries()}]}}).when("/details/:country/:capital",{templateUrl:"partials/country.html",controller:"CountryDetailController",resolve:{country:["$route","dataService",function($route,dataService){var country=$route.current.params.country;return dataService.getCountry(country)}],countryCapital:["$route","dataService",function($route,dataService){var country=$route.current.params.country,capital=$route.current.params.capital;return dataService.getCapital(country,capital)}],countryNeighbors:["$route","dataService",function($route,dataService){var country=$route.current.params.country;return dataService.getNeighbors(country)}]}}).otherwise({redirectTo:"/"})}]),angular.module("app").controller("ListController",["$scope","countryList",ListController]),angular.module("app").controller("CountryDetailController",["$scope","country","countryCapital","countryNeighbors",CountryDetailController]),angular.module("app").factory("dataService",["$q","$http","COUNTRY_DATA_URL","CAPITAL_DATA_URL","NEIGHBORS_DATA_URL",dataService]);