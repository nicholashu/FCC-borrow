'use strict';

angular.module('tradeAppApp')
  .controller('ProfileCtrl', function ($scope, Auth, $http, socket) {
    $scope.getCurrentUser = Auth.getCurrentUser;

    var getUserRecords = function(){
	    $http.get('/api/records').success(function(records) {
	    	var user = $scope.getCurrentUser().name
	    	var recordArray = [];
	    	records.forEach(function(record){
	    		if (record.owner === user){
	    			recordArray.push(record);
	    		};
	    	});
	    	$scope.Records = recordArray;
	      socket.syncUpdates('record', $scope.Records);
	    }); 
    };

    getUserRecords();
    
  });
