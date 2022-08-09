$(function() {
    // console.log('###', $('.homepageProducts'));
    $('.homepageProducts').on('click', '.Jump', function(e) {
        // $(this).prop();
        // console.log($(this).attr('id'));
        window.location = '../views/detail.html?goodId=' + $(this).attr('id');
    });


    // 对于分类列表二点特殊处理

    $('.commodityList').on('click', '.Jump', function(e) {
        // $(this).prop();
        // console.log($(this).attr('id'));
        window.location = '../views/detail.html?goodId=' + $(this).attr('id');
    })






























})