var height = window.parent.screen.height;

$(function () {
    var w = $(window).width();

    var topBtn = $('#page-top');
    // topBtn.hide();
    // $(window).scroll(function () {
    //     if ($(this).scrollTop() > height - height/20) {
    //         topBtn.fadeIn();
    //     } else {
    //         topBtn.fadeOut();
    //     }
    // });
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
    // var $container = $('#container');　
    // $container.imagesLoaded(function(){
    //   $container.masonry({
    //     itemSelector: '.item',　
    //     isFitWidth: true,　
    //     columnWidth: 180
    //   });
    // });

    // var container = document.querySelector('#container');
    // imagesLoaded(container, function () {
    //     var msnry = new Masonry(container, {
    //       itemSelector: '.item', //コンテンツのclass名
    //       isFitWidth: true, //コンテナの親要素のサイズに基づいて、コンテンツのカラムを自動調節します。
    //       // columnWidth: 120, //カラムの幅を設定
    //     });
    // });

    // $('#container').on('load', function(){
    //     var $container = $('#container');　
    //     $container.imagesLoaded(function(){
    //       $container.masonry({
    //         itemSelector: '.item',　
    //         isFitWidth: true,　
    //         columnWidth: 180
    //       });
    //     });
    // });
});

// $(function() {
//     $('.isotope').isotope({
//     itemSelector: '.item',
//     masonry: {
//         columnWidth: 100
//     }
//     });
// });
// var $container = $('#container');
// $container.isotope({
//   // options
//   itemSelector: '.item',
//   layoutMode: 'fitRows'
// });

// $(function(){
// $('#container').masonry({   //ここには敷き詰めたい要素を囲うidなど指定します。
// itemSelector : '.item'  //ここに敷き詰めたい要素のclassを指定します。
// });
// });