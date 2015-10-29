'use strict';

angular.module('tradeAppApp')
  .controller('RecordCtrl', function ($scope, Auth, $http, socket, $window,$routeParams) {
     $scope.Records = [];
     $scope.currentRecord = [];
     $scope.newRecord = {};
     $scope.getCurrentUser = Auth.getCurrentUser;
     $scope.recordId = $routeParams.id;

    



    function getRecords(records){
      records.forEach(function(record){
             $scope.Records.push(record);
      });
     }

    function loadRecords(){
      $http.get('/api/records').success(function(records) {
      getRecords(records);
    }); 
      socket.syncUpdates('records', $scope.Records);
    }


    
    loadRecords();


    //Get individual record (SINGLE RECORD PAGE)
    $scope.getRecord = function(id){
      $http.get('/api/records/' + id).success(function(record) {
      $scope.currentRecord = record;
      socket.syncUpdates('record', $scope.currentRecord);
      }); 
    };

    //function to set loaner of record
    $scope.borrowRecord = function(id){
      var taker = $scope.getCurrentUser().name;
      $http.patch('/api/records/' + id,{loaner:taker}).success(function(records) {
      $scope.currentRecord = records;
      }); 
      socket.syncUpdates('record', $scope.Records);
    };

     //function to cancel loaner of record
    $scope.cancelBorrow = function(id){
      var taker = "";
      $http.patch('/api/records/' + id,{loaner:taker}).success(function(record) {
      $scope.currentRecord = record;
      });
      socket.syncUpdates('record', $scope.Records); 
    };

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

    $scope.cantBorrow = function(record) {
      var user = $scope.getCurrentUser();
      if(record.owner == user.name || record.loaner !== undefined || record.loaner !== ""){
        return true;
      }else{
        return false;
      };
    };

    var x = 0;
    $scope.isAvailable = function(record) {
      x++
      console.log(x)
      if(record.loaner === ""){
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
