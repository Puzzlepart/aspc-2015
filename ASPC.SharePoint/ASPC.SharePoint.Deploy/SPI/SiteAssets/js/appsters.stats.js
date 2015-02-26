var Appsters = Appsters || {};

Appsters.Stats = Appsters.Stats || {};

Appsters.Stats.InitPage = function () {
	var statisticsAngularApp = angular.module('StatisticsAngularApp', []);

	// Bind angular app controllers
	Appsters.Stats.BindControllers(statisticsAngularApp);
};

Appsters.Stats.BindControllers = function (angularApp) {

    angularApp.controller('keyStatisticsCtrl', function ($scope, $http) {
    	Appsters.Stats.CreateKeyStatisticsController($scope, $http);
    });

};

Appsters.Stats.CreateKeyStatisticsController = function ($scope, $http) {
    $scope.TracerBullet = "Works :D";
};


