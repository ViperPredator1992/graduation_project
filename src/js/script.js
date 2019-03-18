$(document).ready(function () {
   
    $('.burger').click(function () {
        if ($(this).next('.header-nav').css('display') == 'none') {
            $(this).next('.header-nav').slideDown();
            $('.burger').addClass('burger-open');
        } 
        else {
            $('.burger').removeClass('burger-open');
            $(this).next('.header-nav').slideUp();
        }
    });

});