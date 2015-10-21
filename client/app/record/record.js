'use strict';

angular.module('tradeAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/record', {
        templateUrl: 'app/record/record.html',
        controller: 'RecordCtrl'
      });
  });
