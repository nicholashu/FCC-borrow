'use strict';

describe('Controller: RecordCtrl', function () {

  // load the controller's module
  beforeEach(module('tradeAppApp'));

  var RecordCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecordCtrl = $controller('RecordCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
