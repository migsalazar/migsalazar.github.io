$(function(){
    //just for fun
    $('h1 i.fa').on('mouseenter', function(){
        var anim = 'hinge';
          $(this)
          .removeClass('animated ' + anim)
          .addClass('animated ' + anim)
          .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
          function(){
            $(this).removeClass('fa fa-child animated ' + anim);
          });
    });
});
