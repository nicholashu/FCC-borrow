'use strict';

angular.module('tradeAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/record', {
        templateUrl: 'app/record/record.html',
        controller: 'RecordCtrl'})
      .when('/newrecord', {
        templateUrl: 'app/record/newrecord.html',
        controller: 'RecordCtrl'})
      .when('/r/:id', {
        templateUrl: 'app/record/recordpage.html',
        controller: 'RecordCtrl'
      })
      .when('/myrecords', {
        templateUrl: 'app/record/myrecords.html',
        controller: 'RecordCtrl'
      });
  });
