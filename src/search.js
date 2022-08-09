$(function() {

    // ajaxStart监听到Ajax请求被发起了
    $(document).ajaxStart(function() {
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
    var str = window.location.href;
    let list = str.split('='); //用刚刚传递地址里面的“？”把传过来的东西劈开
    axios({
        type: 'GET',
        port: '/search',
        data: {
            word: decodeURI(list[1])
        },
    }).then((res) => {
        res.forEach(ele => {
            let li = $('<li></li>');
            li.attr('id', ele.Id);
            li.addClass('Jump');
            $(li).html(`
        <div class="commodityMap">
        <img data-original="${ele.img_list_url}" alt="" src="../assetes/images/loading.f7418998.jpg" style="width: 192px;height: 192px;">
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




    // 点击返回顶部
    $('.to_top').on('click', function() {
        // $(document).scrollTop(0);
        // $('body,html') 必须是元素,将body和html包装
        $('body,html').stop().animate({
            scrollTop: 10
        })
    });
















})