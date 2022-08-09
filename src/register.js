$(function() {

    $(document).ajaxStart(function() {
        document.documentElement.style.overflow = 'hidden';
        $('.load').css({
            display: 'flex'
        })
        setTimeout(() => {
            $('.load').hide();
            document.documentElement.style.overflow = '';
            flag = true;
        }, 700);
    });

    $('#loadForm').on('submit', function(ev) {
        ev.preventDefault();
        let user = null;
        let pwd = null;
        let shujv = $(this).serialize();
        $.each(shujv.split('&'), function(indx, ele) {
            if (indx == 0) {
                user = ele.substr(9)
            } else {
                pwd = ele.substr(9)
            }
        });
        // console.log(user);
        // console.log(pwd);
        let users = /^[a-zA-Z0-9_]{4,6}$/;
        let pwds = /^[a-zA-Z0-9_]{6,16}$/;
        if (!users.test(user)) {
            // alert('你的用户名不符合4-6位数字字母下划线');
            Qmsg.error('你的用户名不符合4-6位数字字母下划线')
        } else if (!pwds.test(pwd)) {
            // alert('密码不符合6-16位数字字母下划线');
            Qmsg.error('密码不符合6-16位数字字母下划线')
        } else {
            // 全部符合正则触发请求
            axios({
                type: 'GET',
                port: '/register',
                data: {
                    username: user,
                    password: pwd
                },
            }).then((res) => {
                if (res.code == 0) {
                    // alert('用户名被占用');
                    Qmsg.error('用户名被占用')
                } else {
                    Qmsg.success('注册成功~');
                    setTimeout(() => {
                        location.href = './signIn.html'
                    }, 800);
                }
            }).catch((err) => {
                console.log(err);
            })
        }

    })






































})