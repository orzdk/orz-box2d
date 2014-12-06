var initId = 0;
var world = createWorld();
var ctx;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;

var demos = {};
demos.InitWorlds = [];

demos.top = {};
demos.InitWorlds.push(function(world) {});

var boxObjects = {};

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  
function step(cnt) {
	var stepping = false;
	var timeStep = 1.0/60;
	var iteration = 1;
	world.Step(timeStep, iteration);
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	drawWorld(world, ctx);
	setTimeout('step(' + (cnt || 0) + ')', 10);
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

Event.observe(window, 'load', function() {

	demos.InitWorlds[0](world);
	ctx = $('canvas').getContext('2d');
	var canvasElm = $('canvas');
	
	canvasWidth = parseInt(canvasElm.width);
	canvasHeight = parseInt(canvasElm.height);
	canvasTop = parseInt(canvasElm.style.top);
	canvasLeft = parseInt(canvasElm.style.left);
	
	Event.observe('canvas', 'click', function(e) {
	
		console.log(boxObjects);
		
		if (!(isEmpty(boxObjects))){
			console.log('destroy');
			for (var i=0; i<94; i++){
				world.DestroyBody(boxObjects['q'+i]);
			}
		}
		
		var mousePos = getMousePos(canvas, e);
		boxObjects = drawOrz2(mousePos.x,mousePos.y);	

	});
	
	step();
});
