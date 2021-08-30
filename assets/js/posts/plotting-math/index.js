$(function(){

document.getElementById("canvas").width = $('#div-canvas').width();
document.getElementById("canvas").height = $('#div-canvas').height();

$('#div-canvas').appear();
var t = true;
$(document).on('appear', '#div-canvas', function(){
  if(t) {
    var
      xExists = [0, 3*Math.PI],
       fn= function(x) {
         return Math.sin(x) * Math.cos(2*x) / 2;
       };

      migs.plot(fn, xExists);migs.plot(fn, xExists);
      t = false;
  }

  });
});
