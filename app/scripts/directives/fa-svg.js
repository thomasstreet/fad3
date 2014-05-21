'use strict';

angular.module('famousAngularStarter')
  .directive('faSvg', function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      transclude: true,
      scope: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        var Surface = $famous['famous/core/Surface'];
        var Modifier = $famous['famous/core/Modifier'];
        var RenderNode = $famous['famous/core/RenderNode'];
        var View = $famous['famous/core/View'];
        var Transform = $famous['famous/core/Transform']
        var Transitionable = $famous['famous/transitions/Transitionable']

        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);
            
            
            isolate.renderNode = new View({
              size: scope.$eval(attrs.faSize) || [undefined, undefined]
            });


            element.append('<div class="fad3-container"></div>');
            

          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);
            var svg;
            transclude(scope, function(clone) {
              var svg = clone;
              svg.attr('opacity', 0)
              angular.element('body').append(clone);



              window.svg = svg;
              window.elem = element;

              // var viewBox = svg[0].attributes['viewBox'].value.split(' ');
              // var _width = viewBox[2];
              // var _height = viewBox[3];

              var children = svg.children();
              console.log('children', children)

              var surfaces = _.map(children, function(child){
                var bbox = child.getBBox();
                console.log('bbox', bbox)

                // var bound = child.getBBox();
                // console.log('bound', child)
                // var origPoints = child.attributes['points'].value.split(' ');
                // var newPoints = _.map(origPoints, function(ordPair){
                //   var nums = ordPair.split(',');
                //   var newNums = [_width - nums[0], _height - nums[1]];
                //   return newNums;
                // });
                // var newPointsStrings = _.map(newPoints, function(pt){
                //   return pt[0] + ',' + pt[1];
                // });
                // var finalString = newPointsStrings.join(' ');
                // console.log('origString', origPoints);
                // console.log('finalString', finalString);

                var t = new Transitionable(0);
                var reset = function(){
                  t.set(0)
                  setTimeout(function(){
                    t.set(6.28, reset);
                  }, 0);
                }
                var transition = {
                  duration: 2000,
                  curve: 'linear'
                }
                t.set(6.28,  reset);
                var mod = new Modifier();
                mod.transformFrom(function(){return Transform.translate(bbox.x, bbox.y)})
                var surf = new Surface({size: [bbox.width, bbox.height]});
                var content = "<svg style='width: 100%; height: 100%;' viewBox='"+bbox.x + " " + bbox.y + " " + (bbox.width) + " " + (bbox.height) +"'>" + child.outerHTML + '</svg>'
                console.log('content', content)
                surf.setContent(content);
                var rn = new RenderNode;
                rn.add(mod).add(surf);


                return rn;
              })

              _.each(surfaces, function(surf){
                isolate.renderNode.add(surf);
              });   






            });



                     


            scope.$emit('registerChild', isolate);


          }
        }
      }
    };
  });
