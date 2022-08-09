$(function() {
    // ajaxStart监听到Ajax请求被发起了
    $(document).ajaxStart(function() {
        // console.log(123);
        document.documentElement.style.overflow = 'hidden';
        $('.load').css({
            display: 'flex'
        })
        setTimeout(() => {
            $('.load').hide();
            document.documentElement.style.overflow = '';
        }, 700);
    });
    // 获取当前页面的url路径
    // console.log(window.location.href);
    // 分割路径,获取重要参数
    let str = window.location.href;
    let list = str.split('='); //用刚刚传递地址里面的“？”把传过来的东西劈开
    // console.log(list[1]); //获取到等号后的数据
    // console.log(decodeURI(list[1])); //解码成中文
    // 渲染一级分类
    axios({
        type: 'GET',
        port: '/getTypeOne',
    }).then((res) => {
        // console.log(res);
        res.forEach((ele) => {
            let li = $('<li></li>');
            li.html(`
               <p><a href="./sorting.html?type_one=${ele}">${ele}</a></p>
                        `);
            // console.log(li);
            $('.mian_nav ul').append(li);
        });
        // 为分类添加样式
        $('.mian_nav ul li').each(function(index, domEle) {
            // console.log(domEle);
            if ($(domEle).find('a').text() == decodeURI(list[1])) {
                $(domEle).find('p').css({
                    backgroundColor: 'blueviolet',
                    borderRadius: 30,
                    color: 'white',
                }).find('a').css({
                    color: '#fff'
                })
            }
        })
    }).catch((err) => {
        console.log(err);
    })



    // 渲染二级分类
    axios({
        type: 'GET',
        port: '/getTypeTwo',
        data: {
            type_one: decodeURI(list[1])
        },
    }).then((res) => {
        // console.log(res);
        res.forEach((ele) => {
            let li = $('<li></li>');
            li.html(ele);
            // 将二级分裂渲染页面
            $('.sideClassification ul').append(li);
            // 调用获取商品详情的方法
            let h1 = $('<h1></h1>');
            h1.addClass('Classification');
            h1.html(ele);
            // 将h1插入到页面
            // $('.commodityList').append(h1);
            getDetails(ele);
        });
    }).catch((err) => {
        console.log(err);
    })






    // 渲染三级分类
    var setUls = new Set();

    function getDetails(par) {
        axios({
            type: 'GET',
            port: '/getTypeTwoList',
            data: {
                type_two: par,
                type_one: decodeURI(list[1])
            },
        }).then((res) => {
            // console.log(res);
            let ul = $('<ul></ul>')
            ul.addClass('homepageProducts');
            res.forEach((ele) => {
                let li = $('<li></li>');
                li.attr('id', ele.Id);
                li.addClass('Jump');
                li.html(`
                               <div class="commodityMap">
                               <img data-original="${ele.img_list_url}" alt="" src="../assetes/images/loading.f7418998.jpg" style="width: 192px;height: 192px;">
                                    </div>
                                   <p>${ele.title}</p>
                                   <div class="text">
                               <p>价格:${ele.price}￥</p>
                               <p>${ele.mack}</p>
                           </div>
                               `);
                $(ul).append(li);
            })
            let li = $('<li></li>')
            let h1 = $('<h1></h1>');
            h1.addClass('Classification');
            h1.html(par);
            li.addClass('special');
            li.append(h1)
            $(ul).prepend(li);
            $('.commodityList').append(ul);

            $('img').lazyload({
                effect: 'fadeIn',
                placeholder: "../assetes/images/loading.f7418998.jpg", //用图片提前占位
            });
        }).then((res) => {
            $.each($('.commodityList').find('.homepageProducts'), function(index, ele) {
                // console.log($(ele).offset().top);
                setUls.add($(ele).offset().top);
            });
            // console.log(setUls);
            let arr = [];
            for (const ite of setUls) {
                // console.log(ite);
                arr.push(ite);
            }
            // console.log(arr);

            $(window).scroll(function() {
                for (let i = 0; i < arr.length; i++) {
                    if ($(window).scrollTop() > arr[i] - 90) {
                        $('.sideClassification ul').find('li').eq(i).css({
                            color: '#784CFA'
                        }).siblings().css({
                            color: '#323232'
                        })
                    }
                }
            });
            $('.sideClassification ul li').on('click', function() {
                let indexs = $(this).index();
                // 点击返回顶部
                $('body,html').stop().animate({
                    scrollTop: arr[indexs] - 40
                });
            })
        }).catch((err) => {
            console.log(err);
        })
    }


    // 点击返回顶部
    $('.to_top').on('click', function() {
        // $(document).scrollTop(0);
        // $('body,html') 必须是元素,将body和html包装
        $('body,html').stop().animate({
            scrollTop: 10
        })
    });




























})