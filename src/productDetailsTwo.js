$(function() {
    // 获取当前页面的url路径
    // console.log(window.location.href);
    // 分割路径,获取重要参数
    let str = window.location.href;
    let list = str.split('='); //用刚刚传递地址里面的“？”把传过来的东西劈开
    // console.log(list[1]); //获取到等号后的数据
    // console.log(decodeURI(list[1])); //解码成中文
    // console.log(decodeURI('%E5%92%96%E5%95%A1')); //解码成中文

    // http://localhost:9527/api/goodList?type_one=

    // ajaxStart监听到Ajax请求被发起了
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


    let productData = null;
    axios({
        type: 'GET',
        port: '/detail',
        data: {
            goodId: list[1]
        },
    }).then((res) => {
        // console.log(res[0]);
        productData = res[0].type_one;
        let img = $('<img></img>');
        img[0].src = res[0].img_list_url;
        $(img).css({
            width: '100%'
        });
        // 渲染大图片
        let img2 = $('<img></img>');
        img2[0].src = res[0].img_list_url;
        $(img2).css({
            width: '200%',
            position: 'absolute',
        });
        $('.big').append(img2);
        $('.top_img').append(img);
        // 商品信息和商品价格
        $('.productInformation p').eq(0).text(res[0].title);
        $('.productInformation p').eq(1).text('价格:' + res[0].price + '￥');
        return axios({
            type: 'GET',
            port: '/goodList',
            data: {
                type_one: productData,
            },
        })
    }).then((res) => {
        // console.log(res);
        $.each(res, function(index, ele) {
            let li = $('<li></li>');
            li.attr('id', ele.Id);
            li.addClass('Jump');
            li.html(`
                      <div class="commodityMap">
                                <img data-original="${ele.img_list_url}" src="../assetes/images/loading.f7418998.jpg" alt="">
                      </div>
                            <p>${ele.title}</p>
                            <div class="text">
                                <p>价格:${ele.price}￥</p>
                                <p>${ele.mack}</p>
                            </div>`);
            $('.homepageProducts').append(li);
        })
        $('img').lazyload({
            effect: 'fadeIn',
            placeholder: "../assetes/images/loading.f7418998.jpg", //用图片提前占位
        });
    }).catch((err) => {
        console.log(err);
    })



    $('.back').on('click', function() {
        history.go(-1);
    });


    // 获取本地储存中的user数据,发起登录请求判断是否登录
    let user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);
    // 加入购物车功能
    $('.details_main').find('button').on('click', function() {
        axios({
            type: 'GET',
            port: '/add',
            data: {
                goodId: list[1],
                token: user.token
            },
        }).then((res) => {
            if (res.code == 1) {
                console.log('添加成功');
                Qmsg.success('添加成功~');
            } else {
                console.log('添加失败');
                Qmsg.error('添加失败！');
            }
        }).catch((err) => {
            console.log(err);
        })

    });


    // 详情页放大镜

    $('.top_img').on({
        mouseenter: function() {
            $('.yellow').show();
            $('.big').show();
        },
        mousemove: function(e) {
            var x = e.pageX - $('.top_img').offset().left;
            var y = e.pageY - $('.top_img').offset().top;
            // console.log(x, y);
            // console.log(biLi);
            $('.yellow').css({
                top: y - $('.yellow').width() / 2,
                left: x - $('.yellow').height() / 2
            });

            // 大图片的移动距离=遮挡层移动距离*大图片最大移动距离/遮挡层的最大移动距离

            // 大图片最大移动距离/遮挡层的最大移动距离 获取到剩余移动距离的比例
            // 1.大图片最大移动距离
            var bigMax = $('.big img').width() - $('.big').width();
            // 2.遮罩层最大移动距离
            var maskMax = $('.top_img').width() - $('.yellow').width();
            // 3.大图片距离赋值  要用负值
            $('.big img').css({
                left: -(x - $('.yellow').width() / 2) * (bigMax / maskMax),
                top: -(y - $('.yellow').height() / 2) * (bigMax / maskMax),
            });
            if (x <= ($('.top_img').width() - $('.yellow').width()) / 2) {
                $('.yellow').css({
                    left: 0
                });
                $('.big img').css({
                    left: 0
                })
            } else if (x >= $('.top_img').width() - ($('.yellow').width() / 2)) {
                $('.yellow').css({
                    left: $('.top_img').width() - $('.yellow').width()
                });
                $('.big img').css({
                    left: -bigMax
                })
            }
            if (y <= ($('.top_img').width() - $('.yellow').width()) / 2) {
                $('.yellow').css({
                    top: 0
                });
                $('.big img').css({
                    top: 0
                })
            } else if (y >= $('.top_img').height() - ($('.yellow').height() / 2)) {
                $('.yellow').css({
                    top: $('.top_img').height() - $('.yellow').height()
                });
                $('.big img').css({
                    top: -bigMax
                })
            }


        },
        mouseleave: function() {
            $('.yellow').hide();
            $('.big').hide();
        }



    })


    // 点击返回顶部
    $('.to_top').on('click', function() {
        // $(document).scrollTop(0);
        // $('body,html') 必须是元素,将body和html包装
        $('body,html').stop().animate({
            scrollTop: 10
        })
    });

























})