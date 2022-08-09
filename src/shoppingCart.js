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
            flag = true;
        }, 600);
    });

    // ajaxStop监听到Ajax请求结束
    $(document).ajaxStop(function() {

        $('.lis_all').prop('checked', false)
        $('.total_Price').text('0');
        $('.lis_all').on('click', function() {
            $('.main_uls').find('.lis').prop('checked', $(this).prop('checked'));
            totalPrice();
        });

        // 每点击一次就要判断是否所有商品被全选
        $('.main_uls').find('.lis').on('click', function() {
            let flag = true;
            $('.main_uls').find('.lis').each(function(index, ele) {
                if (!$(ele).prop('checked')) {
                    flag = false
                }
            });
            $('.lis_all').prop('checked', flag)
            totalPrice();
        });




        // 计算总价
        // 将被选中的商品价格相加


        function totalPrice() {
            let Price = 0;
            $('.main_uls').find('li').each(function(index, ele) {
                if ($(ele).find('.lis').prop('checked')) {
                    Price += Number($(ele).find('.zong_Price').text());
                }
            });
            $('.total_Price').text(Price);
        }


    })



    // 获取token
    let tokens = JSON.parse(localStorage.getItem('user'));
    // console.log(tokens.token);

    // 将渲染页面封装成方法
    getCommodity();

    function getCommodity() {
        axios({
            type: 'GET',
            port: '/shoplist',
            data: {
                token: tokens.token
            },
        }).then((res) => {
            $('.main_uls').html('');
            $.each(res, function(index, ele) {
                let li = $('<li></li>');
                li.attr('id', ele.Id);
                li.html(`
                    <div>
                        <input type="checkbox" name="" class="lis">
                    </div>
                    <div class="details">
                        <img src="${ele.img_list_url}" alt="">
                        <p>${ele.title}</p>
                    </div>
                    <p class="unit_Price">$${ele.price}</p>
                    <div>
                        <button class="butDown">-</button>
                        <span class="quantity">${ele.count}</span>
                        <button class="butUp">+</button>
                    </div>
                    <p class="zong_Price">${ele.price*ele.count}</p>
                    <p class="del">删除</p>`);
                $('.main_uls').append(li);
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    // 点击添加商品
    $('.main_uls').on('click', '.butUp', function() {
        // console.log($(this).parents('li').attr('id'));
        let goodis = $(this).parents('li').attr('id');
        axios({
            type: 'GET',
            port: '/add',
            data: {
                goodId: goodis,
                token: tokens.token
            },
        }).then((res) => {
            if (res.code == 1) {
                // console.log('添加成功');
                Qmsg.success('添加成功~');
                // 重新渲染一次页面
                getCommodity();
            } else {
                // console.log('添加失败');
                Qmsg.error('添加失败!');
            }
        }).catch((err) => {
            console.log(err);
        })
    });

    // 点击减少商品
    $('.main_uls').on('click', '.butDown', function() {
        // console.log($(this).parents('li').attr('id'));
        let goodis = $(this).parents('li').attr('id');
        // console.log($(this).next('.quantity').text());
        if ($(this).next('.quantity').text() <= 1) {
            // console.log($('.butDown').next());
            // console.log('最少为一个');
            Qmsg.error('最少为一个!');
            return;
        } else {
            // console.log('可以减少');
            axios({
                type: 'GET',
                port: '/remove',
                data: {
                    goodId: goodis,
                    token: tokens.token
                },
            }).then((res) => {
                if (res.code == 1) {
                    // console.log('删除成功');
                    // 重新渲染一次页面
                    Qmsg.warning('减少成功');
                    getCommodity();
                } else {
                    // console.log('添加失败');
                    Qmsg.error('添加失败!');
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    });


    // 删除该商品
    $('.main_uls').on('click', '.del', function() {
        // console.log($(this).parents('li').attr('id'));
        let goodis = $(this).parents('li').attr('id');
        axios({
            type: 'GET',
            port: '/del',
            data: {
                goodId: goodis,
                token: tokens.token
            },
        }).then((res) => {
            if (res.code == 1) {
                Qmsg.success('删除成功~');
                // 重新渲染一次页面
                getCommodity();
            } else {
                Qmsg.error('删除失败~');
            }
        }).catch((err) => {
            console.log(err);
        })

    });






































})