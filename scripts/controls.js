//----------------------------------------------------------------------
// The Doctor's movement arrows.
// Also larger touch area that extends beyond the arrows themselves
//----------------------------------------------------------------------
Daleks.DoctorControls = (function()
{
  "use strict";
  function DoctorControls( board, onAction ) {

    this.dirs = ["n","ne","e","se","s","sw","w","nw","x"];
    this.arrows = [];
    this.arrowTouchAreas = [];
    for (var i = 0; i < this.dirs.length; i++) {
      var arrow     = new Daleks.Piece("arrow " + this.dirs[i]);
      this.arrows.push( arrow );
      this.add( arrow, arrow, board, this.dirs[i], onAction );

      // add an extra larger touch area than the arrows (except for middle spot)
      if (this.dirs[i] != "x") {
        var arrowTouchArea = new Daleks.Piece("arrowTouch", { offset: 16 });
        this.arrowTouchAreas.push( arrowTouchArea );
        this.add( arrowTouchArea, arrow, board, this.dirs[i], onAction );
      }
    }
  }
  
  DoctorControls.prototype = {

    // place this control in DOM with click handler
    add: function( control, arrow, board, dir, onAction ) {

      control.dir = dir;
      board.place( control );
      control.getEl().on("click", { dir: control.dir }, 
                       function(e) {
                         onAction.fn.call( onAction.scope, e.data.dir );
                         // let click bubble so we know player has begun
                         // return false;  // stop propagation of event
                       });

      // highlight direction you are about to go in
      control.getEl().on("mouseenter mouseleave", { arrow: arrow },
                       function(e) {  
                         e.data.arrow.getEl().toggleClass("highlight");
                         return false; 
                       });

    },

    disable: function() {
      for (var i = 0; i < this.arrows.length; i++) {
        this.arrows[i].getEl().hide();
        if (this.arrowTouchAreas[i]) {
          this.arrowTouchAreas[i].getEl().hide();
        }
      }
    },

    moveDoctor: function( doctor, dir ) {
      this.disable();  // update() will reenable

      // animate
      doctor.slideTo( _getNewPosition( doctor.pos, dir ));

      // don't animate
      // doctor.setPosition( _getNewPosition( doctor.pos, dir ));
    },
    
    // move arrow pieces around the doctor
    // hade arrows that are illegal moves
    update: function( doctor, board, obstacles ) {
      
      for (var i = 0; i < this.arrows.length; i++) {
        var arrow = this.arrows[i];
        var arrowTouchArea = this.arrowTouchAreas[i];

        this.updateControl( arrow, doctor, board, obstacles );

        if (arrowTouchArea) {
          this.updateControl( arrowTouchArea, doctor, board, obstacles, true );
        }
      }
    },

    // place the clickable arrow on the screen relative to the doctor
    updateControl: function( arrow, doctor, board, obstacles, foo ) {
      
      var arrowPos = _getNewPosition( doctor.pos, arrow.dir );
      if (foo) {
        arrowPos = _getNewPosition( arrowPos, arrow.dir );
        arrowPos = _getNewPosition( arrowPos, arrow.dir );
        arrowPos = _getNewPosition( arrowPos, arrow.dir );
      }

      var x = arrowPos.x;
      var y = arrowPos.y;
      
      arrow.setPosition( arrowPos );
      
      var valid = true;        // disable illegal arrows
      // can't move off board
      if ((x >= board.width)  || (x < 0) || 
          (y >= board.height) || (y < 0))
      {
        valid = false;
      } else {
        // can't move into an object
        for (var j in obstacles) {
          if ((x == obstacles[j].pos.x) && (y == obstacles[j].pos.y)) {
            valid = false;
            break;
          }
        }
      }
      if (valid) {
        arrow.draw();
        arrow.show(); 
      } else {
        arrow.hide(); 
      }
    },

    draw: function() {
      for (var i = 0; i < this.arrows.length; i++) {
        this.arrows[i].draw();
        this.arrowTouchAreas[i].draw();
      }
    }

  };

  // @return pos if we moved in direction given (n,s,e,w,ne,nw,se,sw)
  function _getNewPosition( pos, dir ) {
    var newPos = { x: pos.x, y: pos.y };

    if (dir.match("n")) {  newPos.y += 1; }
    if (dir.match("e")) {  newPos.x += 1; }
    if (dir.match("s")) {  newPos.y -= 1; }
    if (dir.match("w")) {  newPos.x -= 1; }
    return newPos;
  };
  
  return DoctorControls;
})();
