$(function(){

	$('#wrapper-portfolio-elem').mixItUp();

	$("a[href*='#']").mPageScroll2id({
		scrollEasing: "easeInOutQuart",
		scrollSpeed: 900
	});

	$('.testimonials-slider').slick({
  	 dots: true,
  	 arrows: false,
  	 infinite: true
	});

	$('.fixed-panel__toggle-menu').click(function() {
		$('.burger').toggleClass('active');
		$('.fixed-panel__menu').slideToggle(400);
	});

});