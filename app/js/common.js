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
});