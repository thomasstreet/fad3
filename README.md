fad3 ("Fade")
======================

Famo.us/Angular + d3

Proof of concept:  Break an arbitrary SVG element out into separate Famo.us Surfaces and then reconstruct their original positions.  Once the individual pieces are in their own Famo.us surfaces, they become animatable using Famo.us's Matrix3D-powered engine. 

This was created at the Famo.us Hackathon at the HTML5 Developers' Conference in May 2014.  This code is hackathon-quality and not intended for any production purposes, though it does demonstrate some exciting possibilities for Famo.us + vector graphics.

Applications:  integrate with SVG-based tools like d3, or work as the basis of a WYSIWYG vector graphics + Famo.us animations system (like the visual authoring style of Flash)

### To run:

`npm install`

`bower install`

`gulp watch`
