$(function(){

    //just for fun
    var anim = 'rubberBand';

    $('h1 i.fa').removeClass('animated ' + anim)
            .addClass('animated ' + anim)
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
            function(){
              $(this).removeClass('animated ' + anim);
            });
});
