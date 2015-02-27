var Appsters = Appsters || {};

Appsters.Stats = Appsters.Stats || {};

Appsters.Stats.InitPage = function () {
    // Load the Visualization API and the piechart package.
    google.load('visualization', '1.1', { 'packages': ['corechart', 'bar'] });

	var statisticsAngularApp = angular.module('StatisticsAngularApp', []);

	// Bind angular app controllers
	Appsters.Stats.BindControllers(statisticsAngularApp);
};

Appsters.Stats.BindControllers = function (angularApp) {

    angularApp.controller('keyStatisticsCtrl', function ($scope, $http) {
    	Appsters.Stats.CreateKeyStatisticsController($scope, $http);
    });

    angularApp.controller('contentTypesChartCtrl', function ($scope, $http) {
        $http({
            method: 'GET',
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/search/query?querytext=%27ContentTypeId:0x010100A2A873776EA34B66856ECFDA5D1CAD6D*%27&refiners=%27SPContentType%27",
            headers: { "Accept": "application/json;odata=verbose" }
        }).success(function (data, status, headers, config) {
            Appsters.Stats.DrawContentTypeDistributionChart(data);
        }).error(function (data, status, headers, config) {
            HandleError(data, status, headers, config);
        });
    });
};

Appsters.Stats.CreateKeyStatisticsController = function ($scope, $http) {
    $scope.TracerBullet = "Works :D";
};

Appsters.Stats.DrawContentTypeDistributionChart = function (data) {
    if (data.d.query.PrimaryQueryResult != null && data.d.query.PrimaryQueryResult.RefinementResults != null) {
        var contentTypesData = new google.visualization.DataTable();
        contentTypesData.addColumn('string', 'Content Type');
        contentTypesData.addColumn('number', 'Documents');

        var contentTypeRefiner = getValueByProperty(data.d.query.PrimaryQueryResult.RefinementResults.Refiners.results, 'Name', 'SPContentType');

        Appsters.Stats.AddChartRefinementData(contentTypeRefiner, contentTypesData);

        var contentTypesOptions = {
            'width': 390,
            'height': 300,
            'chartArea': { 'width': '100%', 'height': '80%' },
            'colors': ['#003045', '#ff8000', '#88959f', '#5bc6e8', '#dc241e', '#b9c1c6'],
            'is3D': true
        };

        var contentTypesPieChart = new google.visualization.PieChart(document.getElementById('content-type-chart'));
        contentTypesPieChart.draw(contentTypesData, contentTypesOptions);
    }
};

Appsters.Stats.TransformSearchResultToAngularReadableFormat = function (data) {
    var pages = [];
    //We need to transform data from the search results index-array format to property-format
    angular.forEach(data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results, function (result) {
        angular.forEach(result.Cells, function (resultRow) {
            var resultObject = {};
            angular.forEach(resultRow, function (resultData) {
                resultObject[resultData.Key] = resultData.Value;
            });

            pages.push(resultObject);
        });
    });
    return pages;
};

Appsters.Stats.AddChartRefinementData = function (refinerData, chartData) {
    var otherCategory = 0;
    for (var i = 0; i < refinerData.Entries.results.length; i++) {
        var refinerName = Appsters.Stats.GetContentTypeNameFromRenderedValue(refinerData.Entries.results[i].RefinementName);
        var refinerCount = Number(refinerData.Entries.results[i].RefinementCount);
        if (i <= 5) {
            chartData.addRow([refinerName, refinerCount]);
        } else {
            otherCategory = otherCategory + refinerCount;
        }
    }
    if (otherCategory > 0) {
        chartData.addRow(['Other', otherCategory]);
    }
};

Appsters.Stats.GetContentTypeNameFromRenderedValue = function (contentTypeString) {
    var lineByLine = contentTypeString.split(/\n/g);
    if (lineByLine.length <= 1) {
        return contentTypeString;
    }
    else {
        return lineByLine[lineByLine.length - 1];
    }
};
