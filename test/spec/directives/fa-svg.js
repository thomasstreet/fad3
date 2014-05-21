'use strict';

describe('Directive: faSvg', function () {

  // load the directive's module
  beforeEach(module('famousAngularStarterApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fa-svg></fa-svg>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the faSvg directive');
  }));
});
