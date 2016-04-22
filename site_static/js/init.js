jQuery(document).ready(function($){
	
/*-------------------------------------------------------------------------

	1.	Plugin Init
	2.	Header Init
	3.	Helper Functions
	4.	Shortcodes Functions
	5.	Page Specific
	6.  Footer Init
	7.	Cross Browser Fixes
	8.  Mobile Navigation


-------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------
	1.	Plugin Init
    
-------------------------------------------------------------------------*/

/***************** Pretty Photo ******************/

	function prettyPhotoInit(){
		
		$("a.pp").prettyPhoto({
			theme: 'default',
			allow_resize: true,
			default_width: 690,
			default_height: 388,
			social_tools: '',
			markup: '<div class="pp_pic_holder"> \
						   <div class="ppt">&nbsp;</div> \
							<div class="pp_details"> \
								<div class="pp_nav"> \
									<a href="#" class="pp_arrow_previous">Previous</a> \
									<p class="currentTextHolder">0/0</p> \
									<a href="#" class="pp_arrow_next">Next</a> \
								</div> \
								<a class="pp_close" href="#">Close</a> \
							</div> \
							<div class="pp_content_container"> \
								<div class="pp_left"> \
								<div class="pp_right"> \
									<div class="pp_content"> \
										<div class="pp_fade"> \
											<div class="pp_hoverContainer"> \
												<a class="pp_next" href="#">next</a> \
												<a class="pp_previous" href="#">previous</a> \
											</div> \
											<div id="pp_full_res"></div> \
										</div> \
									</div> \
								</div> \
								</div> \
							</div> \
						</div> \
						<div class="pp_overlay"></div>'
		});
		
	}
	
	prettyPhotoInit();
	

	



/***************** Sliders ******************/

	var sliderAdvanceSpeed = parseInt($('#featured').attr('data-advance-speed'));
	var sliderAnimationSpeed = parseInt($('#featured').attr('data-animation-speed'));
	var sliderAutoplay = parseInt($('#featured').attr('data-autoplay'));
	
	if( isNaN(sliderAdvanceSpeed) ) { sliderAdvanceSpeed = 5500;}
	if( isNaN(sliderAnimationSpeed) ) { sliderAnimationSpeed = 800;}
	
	var $yPos;
	

	

	$(window).load(function(){
		
		
		
    	//gallery
    	 $('.flex-gallery').flexslider({
	        animation: 'fade',
	        controlsContainer: '.flexslider',
	        smoothHeight: true, 
	        touch: true
	    });
    	
    	////gallery slider span add
		$('.flex-gallery .flex-direction-nav .flex-prev').html('<i class="icon-angle-left"></i>');
		$('.flex-gallery .flex-direction-nav .flex-next').html('<i class="icon-angle-right"></i>');

	});
	


/***************** Superfish ******************/

	
	jQuery(".sf-menu li ul").each(function(){var e=jQuery(this).parent("li").width();e=(e-180)/2;jQuery(this).css("margin-left",e)});
    
    $(function(){
 var url = window.location.pathname;  
    var activePage = url.substring(url.lastIndexOf('/')+1);
 $('.sf-menu li a').each(function(){  
    var currentPage = this.href.substring(this.href.lastIndexOf('/')+1);

    if (activePage == currentPage) {
    $(this).parent().addClass('current-menu-item current_page_item'); 
 } 
});
})


/*-------------------------------------------------------------------------*/
/*	2.	Header Init
/*-------------------------------------------------------------------------*/	

/***************** Header ******************/

	$('#v-header-outer').waypoint('sticky');


/***************** Top Area ******************/

	var topHeight = $(window).height();
	var topContentHeight = $('.v-header-top-content').height();
	var topContentPosition = ( topHeight - topContentHeight ) / 2;
	

	$('.v-header-top').css({
		'height' : topHeight,
	});
	$('.v-header-top-content').css({
		'padding-top' : topContentPosition,
	});


	$('.v-top-moving .v-move-down').click(function(event) {
	    var target = $(this).data('to'),
	      target_offset = $('.' + target).offset().top;

	    event.preventDefault();
	    window.location.hash = target;

	    if (window.Zepto) {
	      window.scrollTo(0, target_offset);
	    } else {
	      $('html, body').stop().animate({scrollTop: '.v-header-top'}, 0);
	      $('html, body').stop().animate({scrollTop: target_offset}, 600);
	    };
	  });


/***************** Search ******************/
	
	
	//mobile search
	$('#mobile-menu #mobile-search .container a#show-search').click(function(){
		$('#mobile-menu .container > ul').slideUp(500);
		return false;
	});
	
/***************** Nav ******************/
	
	var logoHeight = parseInt($('#v-header-outer').attr('data-logo-height'));
	var headerPadding = parseInt($('#v-header-outer').attr('data-padding'));
	var usingLogoImage = $('#v-header-outer').attr('data-using-logo');
	
	if( isNaN(headerPadding) || headerPadding.length == 0 ) { headerPadding = 28; }
	if( isNaN(logoHeight) || usingLogoImage.length == 0 ) { usingLogoImage = false; logoHeight = 30;}
	
	//inital calculations
	function headerInit() {
			
		$('#v-header-outer #logo img').css({
			'height' : logoHeight,				
		});	
		
		$('#v-header-outer').css({
			'padding-top' : headerPadding
		});	
		
		$('header#top nav > ul > li > a').css({
			'padding-bottom' : ((logoHeight/2) - ($('header#top nav > ul > li > a').height()/2)) + headerPadding,
			'padding-top' : (logoHeight/2) - ($('header#top nav > ul > li > a').height()/2)
		});			
		
		$('header#top .sf-menu > li > ul, header#top .sf-menu > li.sfHover > ul').css({
			'top' : $('header#top nav > ul > li > a').outerHeight()
		});	
		
		$('#header-space').css('height', $('#v-header-outer').outerHeight() + 33 );
		
		$('#v-header-outer .container').css('visibility','visible');
		
		
		//if no image is being used
		if(usingLogoImage == false) $('header#top #logo').css('margin-top','4px');

	}

	headerInit();
	

	
/*-------------------------------------------------------------------------*/
/*	3.	Helper Functions
/*-------------------------------------------------------------------------*/

	jQuery.fn.setCursorPosition = function(position){
	    if(this.lengh == 0) return this;
	    return $(this).setSelection(position, position);
	}
	
	jQuery.fn.setSelection = function(selectionStart, selectionEnd) {
	    if(this.lengh == 0) return this;
	    input = this[0];
	
	    if (input.createTextRange) {
	        var range = input.createTextRange();
	        range.collapse(true);
	        range.moveEnd('character', selectionEnd);
	        range.moveStart('character', selectionStart);
	        range.select();
	    } else if (input.setSelectionRange) {
	        input.focus();
	        input.setSelectionRange(selectionStart, selectionEnd);
	    }
	
	    return this;
	}
	
	
	$.belowthefold = function(element, settings) {
        var fold = $(window).height() + $(window).scrollTop();
        return fold <= $(element).offset().top - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var top = $(window).scrollTop();
        return top >= $(element).offset().top + $(element).height() - settings.threshold;
    };
    
    $.rightofscreen = function(element, settings) {
        var fold = $(window).width() + $(window).scrollLeft();
        return fold <= $(element).offset().left - settings.threshold;
    };
    
    $.leftofscreen = function(element, settings) {
        var left = $(window).scrollLeft();
        return left >= $(element).offset().left + $(element).width() - settings.threshold;
    };
    
    $.inviewport = function(element, settings) {
        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };
    
    $.extend($.expr[':'], {
        "below-the-fold": function(a, i, m) {
            return $.belowthefold(a, {threshold : 0});
        },
        "above-the-top": function(a, i, m) {
            return $.abovethetop(a, {threshold : 0});
        },
        "left-of-screen": function(a, i, m) {
            return $.leftofscreen(a, {threshold : 0});
        },
        "right-of-screen": function(a, i, m) {
            return $.rightofscreen(a, {threshold : 0});
        },
        "in-viewport": function(a, i, m) {
            return $.inviewport(a, {threshold : 0});
        }
    });
	
		
/*-------------------------------------------------------------------------*/
/*	4.	Shortcodes Functions
/*-------------------------------------------------------------------------*/


/***************** Custom Submenu ******************/

	$('.v_submenu .v_submenu_item, .v-scroll-down .v-arrow-down').click(function(event) {
	    var target = $(this).data('to'),
	      target_offset = $('.' + target).offset().top;

	    event.preventDefault();
	    window.location.hash = target;

	    if (window.Zepto) {
	      window.scrollTo(0, target_offset - 86);
	    } else {
	      $('html, body').stop().animate({scrollTop: target_offset - 86}, 600);
	    };
	  });

	$('.v-custom-submenu').waypoint('sticky');


	
/***************** Tabbed ******************/

	$('.tabbed ul li a').click(function(){
		var $id = $(this).attr('href');
		
		if(!$(this).hasClass('active-tab')){
			$('.tabbed ul li a').removeClass('active-tab');
			$(this).addClass('active-tab');
			
			$('.tabbed > div').hide();
			$('.tabbed > div'+$id).fadeIn(400);	
		}
		return false;
	});
	
	$('.tabbed ul li:first-child a').click();
	
	
/***************** Toggle ******************/

	$('.toggle h3 a').click(function(){
		$(this).parents('.toggle').find('> div').slideToggle(300);
		$(this).parents('.toggle').toggleClass('open');
		return false;
	});
	
	
/***************** Checkmarks ******************/

	$('ul.checks li').prepend('<span></span>');
	
	
	
/***************** 4 Col Grid in iPad ******************/

	$('.col.span_3').each(function(){
		var $currentDiv = $(this);
		var $nextDiv = $(this).next('div');
		if( $nextDiv.hasClass('span_3') && !$currentDiv.hasClass('one-fourths')) {
			$currentDiv.addClass('one-fourths clear-both');
			$nextDiv.addClass('one-fourths right-edge');
		}
	});
	
	
/***************** Bar Graph ******************/
	var animatedCount = 0;
	var barCount = 0;
	
	function animateBar(){

		$('.bar_graph li:in-viewport:not(".animated")').each(function(i){
			var percent = $(this).find('span').attr('data-width');

			$(this).addClass('animated');
			
			$(this).find('span').animate({
				'width' : percent + '%'
			},1700, 'easeOutCirc',function(){
			});
			
			$(this).find('span strong').animate({
				'opacity' : 1
			},1400);	
			
			////100% progress bar 
			if(percent == '100'){
				$(this).find('span strong').addClass('full');
			}
			
			animatedCount++;
			
			if(animatedCount == barCount){
				clearInterval(barAnimation);
			}
			
		});
	
	}
	
	
	
	if( $('.bar_graph').length > 0 ){
		//store the total number of bars that need animating
		$('.bar_graph').each(function(){
			barCount += $(this).find('li').length;
		});
		
		var barAnimation = setInterval(animateBar, 150);
		animateBar();
		
	}	
	


/***************** Timeline ******************/


	if ($(".time_line")[0]){
		var $thisdiv = $('.time_line li');
		$thisdiv.css('opacity', '0');
		var thisdiv_top = $thisdiv.offset().top - 500;
		var thisdiv_flag = false;
		$(window).scroll(function (event) {
			if(thisdiv_flag) return;
			var y = $(window).scrollTop();

			if (y >= thisdiv_top) {
				var delay = 250;
				$thisdiv.each(function() {
					var $i = $(this);
					setTimeout(function() {
						$i.addClass('timeline_pop_up').css('opacity', '1');
					}, delay+=450);
				});
				thisdiv_flag = true;
			}
		});
	}


/* ---------------------------------------------------------------------- */
/*	Contact Form
/* ---------------------------------------------------------------------- */
	$('#submit').on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact').serialize(),
			success: function(data) {
				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					$('#msg').hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					$('#msg').hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});


	
/*-------------------------------------------------------------------------*/
/*	5.	Page Specific
/*-------------------------------------------------------------------------*/	

	//Home page top area
	$( '.v-header-top-content, .v-sc-blog-recent, .v-sc-des-img, .section-title' ).waypoint( {
			offset: '67%',
			handler: function() {
			$(this).addClass( 'v-animated' );
		}
	} );

	$( '.v-sc-blog-recent' ).each( function() {
				var $this = $(this),
					delay = 0;

				// Animates gallery images one at a time
				$this.find('.col').each( function() {
					$(this).css( {
						'-webkit-transition-delay' : delay + 's',
						'-moz-transition-delay'    : delay + 's',
						'-ms-transition-delay'     : delay + 's',
						'-o-transition-delay'      : delay + 's',
						'transition-delay'         : delay + 's'
					} );

					delay += 0.4;
				} );
			} );
	
	
	//portfolio single comment order
	function portfolioCommentOrder(){
		
		if($('body').hasClass('mobile') && $('body').hasClass('single-portfolio') && $('#respond').length > 0){
			$('#sidebar').insertBefore('.comments-section');
		}
		
		else if($('body').hasClass('single-portfolio') && $('#respond').length > 0) {
			$('#sidebar').insertAfter('#post-area');
		}
		
	}
	
	$(window).resize(portfolioCommentOrder);
	 portfolioCommentOrder();
	
	

/*-------------------------------------------------------------------------*/
/*	6.	Footer Init
/*-------------------------------------------------------------------------*/	

	var copyrightHeight = $(window).height() - 86;
	var copyrightContentHeight = $('.v-footer-circle').height();
	var copyrightContentPosition = ( copyrightHeight - copyrightContentHeight ) / 2;
	

	$('#copyright').css({
		'height' : copyrightHeight,
		'padding-top' : copyrightContentPosition,
	});


	var $scrollTop = $(window).scrollTop();

	//starting bind
	if( $('#to-top').length > 0 && $(window).width() > 1020) {
		
		if($scrollTop > 350){
			$(window).bind('scroll',hideToTop);
		}
		else {
			$(window).bind('scroll',showToTop);
		}
	}


	function showToTop(){
		
		if( $scrollTop > 350 ){

			$('#to-top').stop(true,true).animate({
				'bottom' : '17px'
			},350,'easeInOutCubic');	
			
			$(window).unbind('scroll',showToTop);
			$(window).bind('scroll',hideToTop);
		}

	}

	function hideToTop(){
		
		if( $scrollTop < 350 ){

			$('#to-top').stop(true,true).animate({
				'bottom' : '-45px'
			},350,'easeInOutCubic');	
			
			$(window).unbind('scroll',hideToTop);
			$(window).bind('scroll',showToTop);	
			
		}
	}

	//to top color
	if( $('#to-top').length > 0 ) {
		
		var $windowHeight, $pageHeight, $footerHeight;
		
		function calcToTopColor(){
			$scrollTop = $(window).scrollTop();
			$windowHeight = $(window).height();
			$pageHeight = $('body').height();
			$footerHeight = $('#footer-outer').height();
		}
		
		//calc on scroll
		$(window).scroll(calcToTopColor);
		
		//calc on resize
		$(window).resize(calcToTopColor);

	}

	//scroll up event
	$('#to-top').click(function(){
		$('body,html').stop().animate({
			scrollTop:0
		},800,'easeOutCubic')
		return false;
	});


/*-------------------------------------------------------------------------*/
/*	7.	Cross Browser Fixes
/*-------------------------------------------------------------------------*/	
	
	//Fix current class in menu
	if ($("body").hasClass("single-portfolio") || $('body').hasClass("error404") || $('body').hasClass("search-results")) {   
		$("li").removeClass("current_page_parent");   
	}
	
	//fix for IE8 nth-child
	$('.recent_projects_widget div a:nth-child(3n+3), #sidebar #flickr div:nth-child(3n+3) a, #footer-outer #flickr div:nth-child(3n+3) a').css('margin-right','0px');
	
	//remove br's from code tag
	$('code').find('br').remove();	
	
	//if a clear is the last div, remove the padding
	if($('.container.main-content > .row > div:last-child').hasClass('clear')) {
		$('.container.main-content > .row > div:last-child').css('padding-bottom','0');
	}
	
	//homepage recent blog for IE8
	$('.home-wrap .blog-recent > div:last-child').addClass('col_last');
		
});


function resizeIframe() {
	var element = document.getElementById("pp_full_res").getElementsByTagName("iframe");
	var height = element[0].contentWindow.document.body.scrollHeight;
    
    //iframe height
    element[0].style.height = height + 'px';
	
	//pp height
	document.getElementsByClassName("pp_content_container")[0].style.height = height+40+ 'px';
	document.getElementsByClassName("pp_content")[0].style.height = height+40+ 'px';
	
}

/*-------------------------------------------------------------------------*/
/*	8.	Mobile Navigation
/*-------------------------------------------------------------------------*/	

/*!
 *
 *  Copyright (c) David Bushell | http://dbushell.com/
 *
 */
(function(window, document, undefined)
{

    // helper functions

    var trim = function(str)
    {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
    };

    var hasClass = function(el, cn)
    {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    };

    var addClass = function(el, cn)
    {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    };

    var removeClass = function(el, cn)
    {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    };

    var hasParent = function(el, id)
    {
        if (el) {
            do {
                if (el.id === id) {
                    return true;
                }
                if (el.nodeType === 9) {
                    break;
                }
            }
            while((el = el.parentNode));
        }
        return false;
    };

    // normalize vendor prefixes

    var doc = document.documentElement;

    var transform_prop = window.Modernizr.prefixed('transform'),
        transition_prop = window.Modernizr.prefixed('transition'),
        transition_end = (function() {
            var props = {
                'WebkitTransition' : 'webkitTransitionEnd',
                'MozTransition'    : 'transitionend',
                'OTransition'      : 'oTransitionEnd otransitionend',
                'msTransition'     : 'MSTransitionEnd',
                'transition'       : 'transitionend'
            };
            return props.hasOwnProperty(transition_prop) ? props[transition_prop] : false;
        })();

    window.App = (function()
    {

        var _init = false, app = { };

        var inner = document.getElementById('v-header'),

            nav_open = false,

            nav_class = 'js-nav';


        app.init = function()
        {
            if (_init) {
                return;
            }
            _init = true;

            var closeNavEnd = function(e)
            {
                if (e && e.target === inner) {
                    document.removeEventListener(transition_end, closeNavEnd, false);
                }
                nav_open = false;
            };

            app.closeNav =function()
            {
                if (nav_open) {
                    // close navigation after transition or immediately
                    var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner, '')[transition_prop + 'Duration']) : 0;
                    if (duration > 0) {
                        document.addEventListener(transition_end, closeNavEnd, false);
                    } else {
                        closeNavEnd(null);
                    }
                }
                removeClass(doc, nav_class);
            };

            app.openNav = function()
            {
                if (nav_open) {
                    return;
                }
                addClass(doc, nav_class);
                nav_open = true;
            };

            app.toggleNav = function(e)
            {
                if (nav_open && hasClass(doc, nav_class)) {
                    app.closeNav();
                } else {
                    app.openNav();
                }
                if (e) {
                    e.preventDefault();
                }
            };

            // open nav with main "nav" button
            document.getElementById('nav-open-btn').addEventListener('click', app.toggleNav, false);

            // close nav with main "close" button
            document.getElementById('nav-close-btn').addEventListener('click', app.toggleNav, false);

            // close nav by touching the partial off-screen content
            document.addEventListener('click', function(e)
            {
                if (nav_open && !hasParent(e.target, 'nav')) {
                    e.preventDefault();
                    app.closeNav();
                }
            },
            true);

            addClass(doc, 'js-ready');

        };

        return app;

    })();

    if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', window.App.init, false);
    }

})(window, window.document);
