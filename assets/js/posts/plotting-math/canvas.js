var migs = (function (){

	//
	//Declare global variables
	var canvas = document.getElementById("canvas"),
		context,

		points = [],
		t,
		f,

		width,
		height,

		xstart,
		ystart,

		_xscale,
		_yscale,

		xreal,
		yreal,

		x0,
		x1,

		y0,
		y1,

		xorigin,

		//factor is just for more speed
		factor = 1;

	var lineSettings = function(){
		context.strokeStyle = '#c63417';
		context.lineWidth = 2;
		context.stroke();

	}

	//
	//Draw points in canvas context
	var draw = function () {

		if (t < points.length - 1) {
			requestAnimationFrame(draw);
		}

		if(points[t*factor] !== undefined) {
			context.beginPath();
			context.moveTo(points[t - 1].x + 0.5, points[t - 1].y + 0.5);
			context.lineTo(points[t].x + 0.5, points[t].y + 0.5);
			lineSettings();

			mirrorShadow();

			t++;
		}
	};

	var mirrorShadow = function() {

		context.beginPath();
		context.moveTo((2*xstart) - points[t - 1].x + 0.5, (2*ystart) -(points[t - 1].y + 0.5));
		context.lineTo((2*xstart) - points[t*factor].x + 0.5, (2*ystart) -(points[t*factor].y + 0.5));
		lineSettings();
	}

	//
	//Evaluate f(x) and set points
	var eval = function () {

		for (var x = xstart; x < width; x++) {
			xreal = (x / (xorigin)) - x0,
			yreal = height - ((f(xreal) - y0) * _yscale);
			ystart = (x === xstart) ? yreal : ystart;
			points.push({ x: x, y: yreal });
		}
	};

	//
	//Set intial/default values
	var set = function(_f, xInterval) {

		//context
		canvas = document.getElementById("canvas");

		if (canvas.getContext) {
			context = canvas.getContext('2d'),

			width = canvas.width,
			height = canvas.height,

			//animation
			t = 1,
			points = [],


			//ystart define vertical start to set mirror view
			//xstart requiere for xorigin
			ystart = 0,
			xstart = width/2,

			//this y's range is only for this example
			y0 = -1,
			y1 = 1,

			x0 = xInterval[0],
			x1 = xInterval[1],

			_xscale = ((width) / (x1 - x0)),
			_yscale = ((height) / (y1 - y0)), //half height

			xorigin = _xscale / 2,

			xreal = 0,
			yreal =0

			f = _f;
		}

	};

	return {
		plot: function(fn, xInterval) {

			set(fn, xInterval);
			eval();
			draw();
		}
	};

}());
