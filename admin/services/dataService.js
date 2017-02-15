angular.module('dataServiceModule', []).factory('dataService', ['$http', 'globalConstants', dataService]);

function dataService($http, globalConstants) {
    var url = globalConstants.apiUrl;

    var service = {
        getMailList: getMailList
    };

    function getMailList() {
        //TODO: correct WebAPI connection should be added.

        var subUrl = 'mail';
        return $http.get(url + subUrl);
    }

    return service;
}