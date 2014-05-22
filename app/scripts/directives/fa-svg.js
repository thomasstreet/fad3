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
        var PhysicsEngine = $famous['famous/physics/PhysicsEngine'];
        var Particle = $famous['famous/physics/bodies/Particle'];
        var Circle = $famous['famous/physics/bodies/Circle'];
        var Repulsion = $famous['famous/physics/forces/Repulsion'];
        var Rope = $famous['famous/physics/constraints/Distance'];
        var Walls = $famous['famous/physics/constraints/Walls'];
        var Collisions = $famous['famous/physics/constraints/Collision'];


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

            var engine = new PhysicsEngine();

            var invisibleCenterParticle = engine.addBody(
              new Circle({
                radius : 100,
                position : [window.innerWidth / 2.0,window.innerHeight / 2.0,0]
              })
            );

            transclude(scope, function(clone) {
              var svg = clone;
              window.clone = clone;
              svg.attr('opacity', 0)
              angular.element('body').append(clone);



              window.svg = svg;
              window.elem = element;

              // var viewBox = svg[0].attributes['viewBox'].value.split(' ');
              // var _width = viewBox[2];
              // var _height = viewBox[3];

              var children = svg.children();
              console.log('children', children)

              var particles = _.map(children, function(child){
                var bbox = child.getBBox();
                console.log('bbox', bbox)

                var radius = Math.max(bbox.width, bbox.height);

                var particle = engine.addBody(
                  new Circle({
                    radius : radius,
                    position : [bbox.x,bbox.y,0]
                  })
                );

                var repulsion = new Repulsion({
                  strength        : .1,
                  anchor          : undefined,
                  radii           : { min : 0, max : radius },
                  cutoff          : 0,
                  cap             : Infinity,
                  decayFunction   : Repulsion.DECAY_FUNCTIONS.GRAVITY
                });

                
                var surf = new Surface({size: [bbox.width, bbox.height]});
                var content = "<svg style='width: 100%; height: 100%;' viewBox='"+bbox.x + " " + bbox.y + " " + (bbox.width) + " " + (bbox.height) +"'>" + child.outerHTML + '</svg>'
                console.log('content', content)
                surf.setContent(content);

                return {particle: particle, surf: surf};
              })

              var attraction = new Repulsion({
                strength        : -1,
                anchor          : undefined,
                range           : [100, 100000],
                cutoff          : 0,
                cap             : Infinity,
                decayFunction   : Repulsion.DECAY_FUNCTIONS.GRAVITY
              });

              var repulsion = new Repulsion({
                strength        : .1,
                anchor          : undefined,
                radii           : { min : 0, max : 100 },
                cutoff          : 0,
                cap             : Infinity,
                decayFunction   : Repulsion.DECAY_FUNCTIONS.GRAVITY
              });

              var strongAttraction = new Repulsion({
                strength        : -2,
                anchor          : undefined,
                range           : [100, 100000],
                cutoff          : 0,
                cap             : Infinity,
                decayFunction   : Repulsion.DECAY_FUNCTIONS.INVERSE
              });

              var collision = new Collisions({
                restitution : .3,
                drift: .1
              });

              for(var i = 0; i < particles.length; i++){
                //add O(n) components
                // this.engine.attach(
                //   collision,
                //   _.map(this.particles, function(p){return p.particle}),
                //   this.particles[i].particle
                // );

                engine.attach(
                  collision,
                  _.map(particles, function(p){return p.particle}),
                  particles[i].particle
                );

                engine.attach(
                  strongAttraction,
                  particles[i].particle,
                  invisibleCenterParticle
                );

                for(var j = 0; j < particles.length; j++){
                  //add O(n^2) components
                  if(i != j){
                    // var attractId = engine.attach(
                    //   repulsion,
                    //   particles[i].particle,
                    //   particles[j].particle
                    // );
                    // var attractId = engine.attach(
                    //   attraction,
                    //   particles[i].particle,
                    //   particles[j].particle
                    // );

                    // this.engine.attach(
                    //   rope,
                    //   this.particles[i].particle,
                    //   this.particles[j].particle
                    // );
                  }
                }
              }





              isolate.renderNode.add(engine);
              
              _.each(particles, function(part){
                isolate.renderNode.add(part.particle).add(part.surf);
              });   






            });



                     


            scope.$emit('registerChild', isolate);


          }
        }
      }
    };
  });
