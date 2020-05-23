Pace.on('done', function(){$('.wrapper').fadeIn();});
$(function() {
	$('html,body').animate({ scrollTop: 0 }, '1');
	// new Vivus('canvas', {start: 'autostart', type: 'scenario-sync', duration: 25});
	// var container = document.querySelector('#container');
 //    imagesLoaded(container, function () {
 //        var msnry = new Masonry(container, {
 //          itemSelector: '.item-all', //コンテンツのclass名
 //          isFitWidth: true, //コンテナの親要素のサイズに基づいて、コンテンツのカラムを自動調節します。
	//           // columnWidth: 120, //カラムの幅を設定
 //        });
 //    });

    categoryBtn = $('.category-btn').find('a');
	categoryBtn.each(function() {
	    $(this).click(function(e){
	        var selected = $(this).attr('class');
	      	e.preventDefault();
	      	categoryBtn.removeClass('is-current');
	      	$(this).addClass('is-current');
	      	$('span').removeClass(function(index, className) {
	      		return (className.match(/\bcategory-\S+/g) || []).join(' ');
	      	}).addClass('category-' + selected);

	      	$('#container').masonry({
	        	itemSelector: '.article-block',
	        	columnWidth: 300,
	        	isFitWidth: true
	      	});
	    });
    });
    $('#container').masonry({
	    itemSelector: '.article-block',
	    columnWidth: 300,
	    isFitWidth: true
	});
});
