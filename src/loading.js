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
            // alert('账号不符合4-6位数字字母下划线');
            Qmsg.error('账号不符合4-6位数字字母下划线')
        } else if (!pwds.test(pwd)) {
            // alert('密码不符合6-16位数字字母下划线');
            Qmsg.error('密码不符合6-16位数字字母下划线')
        } else {
            axios({
                type: 'GET',
                port: '/login',
                data: {
                    username: user,
                    password: pwd
                },
            }).then((res) => {
                if (res.code == 0) {
                    // alert('用户名或密码错误');
                    Qmsg.error('用户名或密码错误')
                } else {
                    // alert('登陆成功');
                    // 将返回的token保存在本地储存
                    let token = res.token;
                    let username = res.username;
                    let val = {
                        token,
                        username
                    };
                    localStorage.setItem('user', JSON.stringify(val))
                    Qmsg.success('登录成功~');
                    setTimeout(() => {
                        // 登陆成功挑战页面到首页
                        location.href = './index.html'
                    }, 600);
                }
            }).catch((error) => {
                console.log(err);
            })
        }
    })













































})