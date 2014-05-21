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

            isolate.renderNode = new View({
              size: scope.$eval(attrs.faSize) || [undefined, undefined]
            });

            var svg = element.find('svg');
            console.log('svg', svg)

            element.append('<div class="fad3-container"></div>');
            console.log('elem', element)
          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function(clone) {
              angular.element(element[0].querySelectorAll('div')[0]).append(clone);
            });

            scope.$emit('registerChild', isolate);

          }
        }
      }
    };
  });
