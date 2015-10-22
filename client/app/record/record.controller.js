'use strict';

angular.module('tradeAppApp')
  .controller('RecordCtrl', function ($scope, Auth, $http, socket, $window) {
     $scope.Records = [];
     $scope.newRecord = {};
     $scope.getCurrentUser = Auth.getCurrentUser;

    $http.get('/api/records').success(function(records) {
      $scope.Records = records;
      socket.syncUpdates('record', $scope.Records);
    });

    $scope.addThing = function() {
      var user = $scope.getCurrentUser();

      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/records', {
       artist: $scope.newRecord.artist,
       album: $scope.newRecord.album,
       condition: $scope.newRecord.condition,
       description: $scope.newRecord.description,
       owner: user.name
     });
      $scope.newRecord = {};
      $window.location.href = '/myrecords';
    };

    $scope.isOwner = function(record) {
      var user = $scope.getCurrentUser();
      if(record.owner === user.name){
        return true;
      }else{
        return false;
      };
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/records/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
