var Appsters = Appsters || {};

Appsters.Enemies = Appsters.Enemies || {};

Appsters.Enemies.InitPage = function () {
    var statisticsAngularApp = angular.module('StatisticsAngularApp', []);

    jQuery('body').delegate('#next', 'click', function () {
        Appsters.Enemies.BindEnemiesController(statisticsAngularApp);
    });
    jQuery('body').delegate('#previous', 'click', function () {
        Appsters.Enemies.BindEnemiesController(statisticsAngularApp);
    });
    jQuery('body').delegate('#AddWanted', 'click', function () {
        Appsters.Enemies.AddWantedItem(event);
    });

    Appsters.Enemies.BindEnemiesController(statisticsAngularApp);
};

Appsters.Enemies.BindEnemiesController = function (angularApp) {
    angularApp.controller('enemiesListCtrl', function ($scope, $http) {
        var page = Math.floor((Math.random() * 8) + 1);
        $http({
            method: 'GET',
            url: "https://swapi.co/api/people/?page=" + page,
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
            if (data.d.results != undefined && data.d.results[0] != undefined) {
                character.imageUrl = data.d.results[0].MediaUrl;
            }
        }).error(function (data, status, headers, config) {
            HandleError(data, status, headers, config);
        });
    });
};

Appsters.Enemies.AddWantedItem = function (event) {
    var deferred = jQuery.Deferred();

    var characterObject = jQuery(event.target).parents('.character');

    var clientContext = SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Wanted");
    var itemCreateInfo = new SP.ListItemCreationInformation();
    var listItem = oList.addItem(itemCreateInfo);
    listItem.set_item("Title", characterObject.find('.name').text());
    listItem.update();
    clientContext.load(listItem);

    clientContext.executeQueryAsync(function (sender, args) {
        deferred.resolve();
    }, function (sender, args) {
        console.error('Request failed. ' + args.get_message());
        deferred.reject();
    });

    return deferred.promise();
};