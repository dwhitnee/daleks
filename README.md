# Daleks!
Copyright (c) 2013 David Whitney. <a href="http://dwhitnee.s3-website-us-east-1.amazonaws.com/</a>

## Play it!
http://dwhitnee.s3.amazonaws.com/js/daleks/daleks.html

## About
The Daleks video game, written entirely in HTML5 and javascript.

No canvas, just HTML elements and CSS.  Each image is an HTML div with the background-image style set.  The pieces are animated using javascript to update the css position of each div.  Actons are handled by JQuery events bindings to other div elements.

## Run locally
To make this work locally you'll need to edit index.html to point to either a remote copy of jQuery or download jQuery to your build/ directory.
Update build.sh for your location of Closure compiler for the minified version.

## Credits
All code written and directed by David Whitney.

* Images stolen liberally from the web.
* jQuery is used for DOM manipulation and event handling.
* Google Closure Compiler for compilation and compression.
* Gameplay inspired by the 1984 Mac version by Johan Strandberg, but it is much like the other "robots" type games as seen here on Wikipedia
http://en.wikipedia.org/wiki/Daleks_(video_game)


