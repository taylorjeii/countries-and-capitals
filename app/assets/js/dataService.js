angular.module('app').factory('dataService', ['$q', '$http', 'COUNTRY_DATA_URL', 'CAPITAL_DATA_URL', dataService]);

 function dataService ($q, $http, COUNTRY_DATA_URL, CAPITAL_DATA_URL){
    return {
      getAllCountries: getAllCountries,
      getCapitalPopulation: getCapitalPopulation
    };

    // get all countries
    function getAllCountries (){
      var config = {
        cache: true,
        params: {
          username: 'atoburen'
        }
      };
      return $http.get(COUNTRY_DATA_URL, config)
              .then(sendCountries)
              .catch(sendErrorMessage);

        function sendCountries (response) {
        return response.data.geonames;
      }
    }

    // get the population of the countres capital
    function getCapitalPopulation(countryCode, capital){
      var config = {
        cache: true,
        params: {
          username: 'atoburen',
          lang: "en",
          maxRows: 1,
          q: capital,
          name_equals: capital,
          countryCode: countryCode,
          isNameRequired: true
        }
      };
      return $http.get(CAPITAL_DATA_URL, config)
              .then(sendCapitalPopulation)
              .catch(sendErrorMessage);

        function sendCapitalPopulation (response) {
        return response.data.geonames[0].population;

      }
    }


    // response if there is an error retrieving the data
    function sendErrorMessage (response) {
      return $q.reject('There was an error getting the data. (HTTP status: ' + response.status + ')' );
    }
 }