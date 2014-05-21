'use strict';

angular.module('famousAngularStarter')
  .directive('faSvg', function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      transclude: true,
      scope: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);
            
            var Surface = $famous['famous/core/Surface'];
            var View = $famous['famous/core/View'];
            var Transform = $famous['famous/core/Transform']
            var Transitionable = $famous['famous/transitions/Transitionable']

            
            element.append('<div class="fad3-container"></div>');
          },
          post: function(scope, element, attrs){
            transclude(scope, function(clone) {
              angular.element(element[0].querySelectorAll('div')[0]).append(clone);
            });
          }
        }
      }
    };
  });
