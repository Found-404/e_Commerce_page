$(function() {

    // 封装的ajax请求方法
    function getCommodity(dat) {
        axios({
            type: 'GET',
            port: '/goodList',
            data: {
                page: dat
            },
        }).then((ele) => {
            // console.log(res);
            ele.forEach(ele => {
                let li = $('<li></li>');
                // 添加属性
                li.attr('id', ele.Id);
                li.addClass('Jump');
                $(li).html(`
                            <div class="commodityMap">
                            <img data-original="${ele.img_list_url}" src="../assetes/images/loading.f7418998.jpg" alt="" class="lazy" style="width: 192px;height: 192px;">
                                 </div>
                                <p>${ele.title}</p>
                                <div class="text">
                            <p>价格:${ele.price}￥</p>
                            <p>${ele.mack}</p>
                        </div>
                               `);
                $('.homepageProducts').append(li);
            });
            $('img').lazyload({
                effect: 'fadeIn',
                placeholder: "../assetes/images/loading.f7418998.jpg", //用图片提前占位
            });
        }).catch((err) => {
            console.log(err);
        })

    };

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

    // ajaxStop监听到AJAX完成的事件
    // $(document).ajaxStop(function() {

    // });

    // 页面加载之初先调用一次请求
    getCommodity(1);

    // 记录加载page
    let loadPage = 1;
    //保存商品数据
    // 页面滚动
    // 开启节流阀
    let flag = true;
    $(window).scroll(function() {
        // 页面被卷去的高度+可视窗口的高度 > 底部加载中到顶部的距离
        // console.log($(window).scrollTop());
        // console.log($(window).height());
        // console.log($('.loading').offset().top);
        // 关闭节流阀
        // flag = false;scrollSearch
        if ($(window).scrollTop() + $(window).height() >= $('.loading').offset().top) {
            if (flag) {
                flag = false;
                loadPage++;
                // console.log(loadPage);
                console.log('加载更多...');
                getCommodity(loadPage);
            }
        }
    });
    // 点击返回顶部
    $('.to_top').on('click', function() {
        // $(document).scrollTop(0);
        // $('body,html') 必须是元素,将body和html包装
        $('body,html').stop().animate({
            scrollTop: 10
        })
    });

    axios({
        type: 'GET',
        port: '/getTypeOne',
    }).then((ele) => {
        // console.log(res);
        ele.forEach((ele) => {
            let li = $('<li></li>')
            li.html(`
            <p><a href="./sorting.html?type_one=${ele}">${ele}</a></p>
                        `)
                // console.log(li);
            $('.mian_nav ul').append(li);
        })
    }).catch((error) => {
        console.log(error);
    })

    // 为分类列表添加点击事件










































})