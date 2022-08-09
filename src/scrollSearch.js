$(function() {

    $(window).scroll(function() {
        // 显示头部贴合
        // 当页面被卷去的部分>头部高度时 显示头部贴合
        if ($(window).scrollTop() > $('.head').height()) {
            $('.header').css({
                top: 0,
            });
            $('.to_top').show();
        } else {
            $('.header').css({
                top: -100,
            });
            $('.to_top').hide();
        }
    });










})