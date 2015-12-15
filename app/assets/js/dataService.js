angular.module('app').factory('dataService', ['$q', '$http', 'COUNTRY_DATA_URL', 'CAPITAL_DATA_URL', 'NEIGHBORS_DATA_URL', dataService]);

 function dataService ($q, $http, COUNTRY_DATA_URL, CAPITAL_DATA_URL, NEIGHBORS_DATA_URL){
    return {
      getAllCountries: getAllCountries,
<<<<<<< HEAD
      getCapitalPopulation: getCapitalPopulation
   
=======
      getCountry: getCountry,
      getCapital: getCapital,
      getNeighbors: getNeighbors
>>>>>>> 5890359a77eac87d5f70284d435f49ee16d508fb
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

    // get individual country
    function getCountry (country){
      var config = {
        cache: true,
        params: {
          username: 'atoburen',
          country: country
        }
      };
      return $http.get(COUNTRY_DATA_URL, config)
              .then(sendCountry)
              .catch(sendErrorMessage);

        function sendCountry (response) {
        return response.data.geonames[0];
      }
    }

<<<<<<< HEAD
    function getCapitalPopulation(country, capital){
=======
    // get the countries capital
    function getCapital(country, capital){
>>>>>>> 5890359a77eac87d5f70284d435f49ee16d508fb
      var config = {
        cache: true,
        params: {
          username: 'atoburen',
          lang: "en",
          maxRows: 1,
          q: capital,
          name_equals: capital,
          country: country,
          isNameRequired: true
        }
      };
      return $http.get(CAPITAL_DATA_URL, config)
              .then(sendCapitalPopulation)
              .catch(sendErrorMessage);

<<<<<<< HEAD
        function sendCapitalPopulation (response) {
        return response.data;
=======
        function sendCapital (response) {
        return response.data.geonames[0];
      }
    }

    // get the neighbors of the country
    function getNeighbors(country){
      var config = {
        cache: true,
        params: {
          username: 'atoburen',
          country: country
        }
      };

      return $http.get(NEIGHBORS_DATA_URL, config)
              .then(sendNeighbors)
              .catch(sendErrorMessage);

      function sendNeighbors(response){
        return response.data.geonames;
>>>>>>> 5890359a77eac87d5f70284d435f49ee16d508fb
      }
    }




    // response if there is an error retrieving the data
    function sendErrorMessage (response) {
      return $q.reject('There was an error getting the data. (HTTP status: ' + response.status + ')' );
    }
 }