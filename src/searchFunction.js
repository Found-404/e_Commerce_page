$(function() {
    // 点击搜索将input的value参数传递给search页面，并发起请求
    $('.search').on('click', function() {
        // 跳转页面
        console.log($('.saerchIpt').val());
        if ($('.saerchIpt').val()) {
            location.href = '../views/search.html?word=' + $('.saerchIpt').val();
        }
    })
    $('.search2').on('click', function() {
        // 跳转页面
        console.log($('.saerchIpt2').val());
        if ($('.saerchIpt2').val()) {
            location.href = '../views/search.html?word=' + $('.saerchIpt2').val();
        }
    })

})