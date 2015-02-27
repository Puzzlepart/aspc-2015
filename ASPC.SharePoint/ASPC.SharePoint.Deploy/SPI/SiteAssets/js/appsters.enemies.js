var Appsters = Appsters || {};

Appsters.Enemies = Appsters.Enemies || {};

Appsters.Enemies.InitPage = function () {
    var statisticsAngularApp = angular.module('StatisticsAngularApp', []);

    jQuery('#next').click(function () {
        Appsters.Enemies.BindEnemiesController(statisticsAngularApp);
    });
    jQuery('#previous').click(function () {
        Appsters.Enemies.BindEnemiesController(statisticsAngularApp);
    });

    Appsters.Enemies.BindEnemiesController(statisticsAngularApp);
};

Appsters.Enemies.BindEnemiesController = function (angularApp) {

    angularApp.controller('enemiesListCtrl', function ($scope, $http) {
        var page = Math.floor((Math.random() * 20) + 1);
        $http({
            method: 'GET',
            url: "https://swapi.co/api/people/" + page,
            headers: { "Accept": "application/json;odata=verbose" }
        }).success(function (data, status, headers, config) {
            $scope.people = data.results;
            Appsters.Enemies.GetImageForCharacters(data.results, $scope, $http);
        }).error(function (data, status, headers, config) {
            HandleError(data, status, headers, config);
        });
    });
};

Appsters.Enemies.GetImageForCharacters = function (characters, $scope, $http) {
    var accountKeyEncoded = "UWxvNXV3RmJ5cXZUTmhrRXRDTmtDNzYyaFBrQlRFVUJJSFdMN25EN01BOD06UWxvNXV3RmJ5cXZUTmhrRXRDTmtDNzYyaFBrQlRFVUJJSFdMN25EN01BOD0=";
    var bingImageEndpoint = "https://api.datamarket.azure.com/Bing/Search/Image?$format=json&Query='";

    angular.forEach(characters, function (character) {
        $http({
            method: 'GET',
            url: bingImageEndpoint + character.name + "'",
            headers: {
                "Accept": "application/json;odata=verbose",
                "Authorization": "Basic " + accountKeyEncoded
            }
        }).success(function (data, status, headers, config) {
            character.imageUrl = data.d.results[0].MediaUrl;
        }).error(function (data, status, headers, config) {
            HandleError(data, status, headers, config);
        });
    });
};