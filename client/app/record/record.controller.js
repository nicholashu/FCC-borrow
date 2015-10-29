'use strict';

angular.module('tradeAppApp')
  .controller('RecordCtrl', function ($scope, Auth, $http, socket, $window,$routeParams) {
     $scope.Records = [];
     $scope.currentRecord = [];
     $scope.newRecord = {};
     $scope.myRecords = [];
     $scope.awaitingArray = [];
     $scope.approvedArray = [];
     $scope.tab = 0;
     $scope.getCurrentUser = Auth.getCurrentUser;
     $scope.recordId = $routeParams.id;
     $scope.awaitingApproval = $scope.awaitingArray;
     $scope.onLoan = $scope.approvedArray;



    function getRecords(records){
      var user = $scope.getCurrentUser();
      records.forEach(function(record){
        if (record.owner === user.name){
          $scope.myRecords.push(record);
        }
          $scope.Records.push(record);
      });
     }
      function checkRequests(){
      $scope.myRecords.forEach(function(record){
        if(record.loaner !== ""){
          if(record.approved !== true){
            $scope.awaitingArray.push(record);
          }
          else if(record.approved === true){
            $scope.onLoan.push(record);
          }
        }
      });
    };

    function loadRecords(){
      $http.get('/api/records').success(function(records) {
      getRecords(records);
      checkRequests();
    }); 
      socket.syncUpdates('records', $scope.Records);
    }

    loadRecords();
   

    $scope.setTab = function(tab) {
      $scope.tab = tab;
    };

    $scope.isTab = function(tab) {
      return tab === $scope.tab;
    };
  
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

     $scope.approveRecord = function(id){
      $http.patch('/api/records/' + id,{approved:true}).success(function(record) {
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
       owner: user.name,
       loaner: ""
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
      if(record.loaner !== ""){
        if (record.owner === user.name){
          return false;
        }else{
          return true;
        }
      }
      else{
        return false;
      };
    };

    //show if not owner, has "" or undefined, 
    $scope.isAvailable = function(record) {
      var user = $scope.getCurrentUser();
      if (record.owner == user.name){
        return false;
      }
      if(record.owner !== user.name){
        if (record.loaner !== ""){
          return false;
        }else{
          return true;
        }
      }else if(record.loaner !== ""){
        return true;
      }
      else{
        return false;
      };
    };

    $scope.deleteThing = function(record) {
      $http.delete('/api/records/' + record._id);
    };
    socket.syncUpdates('record', $scope.Records);
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('record');
    });
  });
