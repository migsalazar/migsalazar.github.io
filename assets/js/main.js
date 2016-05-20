$(function(){
    //just for fun
    var count = 50,
        anim = 'rubberBand';
    $('body').on('mousemove', function(){
        count++;
        if(count > 70) {
          $('h1 i.fa')
          .removeClass('animated ' + anim)
          .addClass('animated ' + anim)
          .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
          function(){
            $(this).removeClass('animated ' + anim);
            count = 0;
          });
        }
    });
});

