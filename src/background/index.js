export function init() {
    var Canvas = document.getElementById("canvas"); //retrieves canvas element from dom with id "canvas"
    var ctx = Canvas.getContext("2d"); //retrives the 2D redering context of the canvas
  
    //resizes the canvase based on the screen viewport
    var resize = function () {
      Canvas.width = Canvas.clientWidth;
      Canvas.height = Canvas.clientHeight;
    };
    //add an event listener to the resize event to listen for window resize
    window.addEventListener("resize", resize);

    //call resize once to initialize canvas properly
    resize();
  
    var elements = []; //initialise elements array which will later on take elements "x" and "o" from preset constructors
    var presets = {};
  
    //preset constructor for drawing circles 
    presets.o = function (x, y, s, dx, dy) {
      return { //The function returns an object containing properties and methods for drawing a circular shape

        //These properties represent the coordinates of the center of the circle.
        x: x, 
        y: y,

        //These properties represent the radius and line width of the circle, respectively. They are calculated based on the s parameter, which represents a scale.
        r: 12 * s,
        w: 5 * s,

        //These properties represent the velocity components in the x and y directions, respectively
        dx: dx,
        dy: dy,


        draw: function (ctx, t) {
          this.x += this.dx;
          this.y += this.dy;
  
          ctx.beginPath(); //This begins a new path for drawing
          ctx.arc(
            this.x + +Math.sin((50 + x + t / 10) / 100) * 3,
            this.y + +Math.sin((45 + x + t / 10) / 100) * 4,
            this.r,
            0,
            2 * Math.PI,
            false
          );
          //These lines set the line width and stroke style for the circle's outline and then stroke the path, rendering the circle on the canvas
          ctx.lineWidth = this.w;
          ctx.strokeStyle = "#fff";
          ctx.stroke();
        }
      };
    };
  
     //preset constructor for drawing crosses 
    presets.x = function (x, y, s, dx, dy, dr, r) {
      r = r || 0;
      return {
        x: x,
        y: y,
        s: 20 * s,
        w: 5 * s,
        r: r,
        dx: dx,
        dy: dy,
        dr: dr,
        draw: function (ctx, t) {
          this.x += this.dx;
          this.y += this.dy;
          this.r += this.dr;
  
          var _this = this;
          var line = function (x, y, tx, ty, c, o) {
            o = o || 0;
            ctx.beginPath();
            ctx.moveTo(-o + (_this.s / 2) * x, o + (_this.s / 2) * y);
            ctx.lineTo(-o + (_this.s / 2) * tx, o + (_this.s / 2) * ty);
            ctx.lineWidth = _this.w;
            ctx.strokeStyle = c;
            ctx.stroke();
          };
  
          ctx.save();
  
          ctx.translate(
            this.x + Math.sin((x + t / 10) / 100) * 5,
            this.y + Math.sin((10 + x + t / 10) / 100) * 2
          );
          ctx.rotate((this.r * Math.PI) / 180);
  
          line(-1, -1, 1, 1, "#fff");
          line(1, -1, -1, 1, "#fff");
  
          ctx.restore();
        }
      };
    };

    //loop iterates over the x-coordinates (x) from 0 to the width of the canvas
    for (var x = 0; x < Canvas.width; x++) {
      //inner loop iterates over the y-coordinates (y) from 0 to the height of the canvas
      for (var y = 0; y < Canvas.height; y++) {
        //checking if a randomly generated number (using Math.random()) rounded to the nearest integer (using Math.round) is equal to 1 in 15000
        if (Math.round(Math.random() * 60000) == 1) {
          var s = (Math.random() * 5 + 1) / 10;
          //If this random number rounded to the nearest integer is 1, a circular element (presets.o) is created
          if (Math.round(Math.random()) == 1)
            elements.push(presets.o(x, y, s, 0, 0));
          //else (presets.x) is created
          else
            elements.push(
              presets.x(
                x,
                y,
                s,
                0,
                0,
                (Math.random() * 3 - 1) / 10,
                Math.random() * 360
              )
            );
        }
      }

      //function is used to repeatedly execute a specified function (clearCanvasAndDraw) at specified time intervals (in milliseconds).
      // In this case, it's set to run every 10 milliseconds
  
      setInterval(function () {
        ctx.clearRect(0, 0, Canvas.width, Canvas.height);
  
        var time = new Date().getTime();
        for (var e in elements) elements[e].draw(ctx, time);
      }, 10);
    }
  }