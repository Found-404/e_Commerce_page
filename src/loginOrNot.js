$(function() {
    // 获取本地储存中的user数据,发起登录请求判断是否登录
    let user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);
    if (user.token) {
        // 你应经登陆成功了！
        // console.log($('.head nav ul li').eq(1));
        $('.head nav ul li').eq(1).find('a').text('购物车').prop('href', 'shopcar.html');
        $('.head nav ul li').eq(2).find('a').text('退出登录').prop('href', 'javascript:;').css({
            color: '#551A8E'
        });

        // 改变贴合头部 的三个跳转
        $('.head_mian').find('li').eq(1).find('a').text('购物车').prop('href', 'shopcar.html');
        $('.head_mian').find('li').eq(2).find('a').text('退出登录').prop('href', 'javascript:;').css({
            color: '#551A8E'
        });

        // Qmsg.success('登录成功~');
    }
    // 退出登录要清除你本地储存中的数据并刷新
    $('.head nav ul li').eq(2).find('a').on('click', function() {
        $('.signOut').css({
            display: 'flex'
        });
        document.documentElement.style.overflow = 'hidden';
        $('.load').show();
    });

    $('.header').find('li').eq(2).on('click', function() {
        $('.signOut').css({
            display: 'flex'
        });
        document.documentElement.style.overflow = 'hidden';
        $('.load').show();
    })


    $('.close').on('click', function() {
        $('.signOut').hide();
        $('.load').hide();
        Qmsg.info('取消退出');
        document.documentElement.style.overflow = '';
    });
    $('.sec_bottom li').eq(0).on('click', function() {
        $('.signOut').hide();
        $('.load').hide();
        Qmsg.info('取消退出');
        document.documentElement.style.overflow = '';
    });
    $('.sec_bottom li').eq(1).on('click', function() {
        Qmsg.info('退出成功');
        localStorage.removeItem('user');
        setTimeout(() => {
            // 跳转首页
            location.href = './index.html';
        }, 500);
    })


































})