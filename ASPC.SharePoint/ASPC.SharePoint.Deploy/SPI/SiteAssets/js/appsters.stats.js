var Appsters = Appsters || {};

Appsters.Stats = Appsters.Stats || {};

SmartPortal.Statistics.InitPage = function () {
   
};

SmartPortal.Statistics.BindControllers = function (angularApp) {

    angularApp.controller('keyStatisticsCtrl', function ($scope, $http) {
        SmartPortal.Statistics.CreateKeyStatisticsController($scope, $http);
    });

};

SmartPortal.Statistics.CreateKeyStatisticsController = function($scope, $http) {
    $scope.TracerBullet = "Works :D";
};
