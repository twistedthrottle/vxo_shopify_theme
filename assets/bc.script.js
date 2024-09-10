var AT_Main = {

	getWidthBrowser : function() { // Get width browser
		var myWidth;

		if( typeof( window.innerWidth ) == 'number' ) {
			//Non-IE 
			myWidth = window.innerWidth;
		} 
		else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) { 
			//IE 6+ in 'standards compliant mode' 
			myWidth = document.documentElement.clientWidth; 
		} 
		else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) { 
			//IE 4 compatible 
			myWidth = document.body.clientWidth;  
		}

		return myWidth; 
	}

	,checkLayout : function() { // Function to check level of layout
		if(jQuery("#checkLayout .d-block").css("display") == "block")
      		return 0; //smallest layout
		else if(jQuery("#checkLayout .d-sm-block").css("display") == "block")
			return 1; //mobile layout
		else if(jQuery("#checkLayout .d-md-block").css("display") == "block")
			return 2; //tablet potrait layout
		else if(jQuery("#checkLayout .d-lg-block").css("display") == "block")
			return 3; //tablet landscape/medium desktop layout
		else if(jQuery("#checkLayout .d-xl-block").css("display") == "block")
			return 4; //desktop layout
	}

	,width_Nopadding : function(){ //in IE and Edge can't apply CSS calc()
		if (document.documentMode || /Edge/.test(navigator.userAgent)) {
			$('.no-padding').each(function(){
				var ele= $(this),
					winW = $(document).width(),
					parentW=$(this).parents().width(),
					margin = (winW - parentW) / 2 *(-1);

				if(winW > 992){
					ele.css({
						'margin-left': margin,
						'margin-right': margin
					});
				}
				if(winW <= 992){
					ele.css({
						'margin-left': 'auto',
						'margin-right': 'auto'
					});
				}
			})
		}
		
	}

	,homeSlideshow : function(slideshowId){
        if(jQuery(slideshowId + ' .home-slideshow-wrapper').length){
            jQuery(slideshowId + ' .home-slideshow-wrapper').each(function(index,value){
              
                var _delay_time = '';
                if(jQuery(value).data('autoplay')){
                	_delay_time = jQuery(value).data('time');
                }
              
                var swiper = new Swiper(slideshowId + ' .swiper-container-01', {
                  	autoplay: _delay_time
                  	,loop: true
                    ,pagination: slideshowId + ' .swiper-pagination-01'
                    ,paginationClickable: slideshowId + ' .swiper-pagination-01'
                    ,nextButton: slideshowId + ' .swiper-button-next-01'
                    ,prevButton: slideshowId + ' .swiper-button-prev-01'
                    ,spaceBetween: 30
                    ,scrollbarDraggable: true
                    ,effect: jQuery(value).data('animation')
                  	,setWrapperSize: false
                    ,onImagesReady: function(swiper){
                    	$(swiper.container[0]).find('.swiper-slide img').css('visibility','visible');
				        $(swiper.container[0]).find('.swiper-slide').each(function(){
				            var _this = $(this);
				            _this.find('.video-slide').show();
				            if (!_this.find('.video-slide').data('full-height')) {
				              _this.find('.video-slide video').css({
				                position: 'relative',
				                width: '100%'
				              });
				            }
				            else{
				              _this.find('.video-slide video').css({
				                left: '50%',
				                top: '50%',
				                transform: 'translate(-50%, -50%)'
				              });
				            }
				        });

				        jQuery(slideshowId + ' .swiper-container').data('parallax') && AT_Main.parallaxScroll(jQuery(slideshowId + ' .swiper-container'),jQuery(slideshowId + ' .swiper-container').find('.swiper-slide'));
                    	var el = jQuery(slideshowId);
				        if(el.data('adapt')){
				            var min_height = el.find('.bc-home-slideshow').width() / el.data('min-aspect-ratio');
				            el.height(min_height);
				            jQuery(slideshowId + ' .swiper-container').height(min_height);
				            jQuery(window).resize(function(){
				              var min_height = el.find('.bc-home-slideshow').width() / el.data('min-aspect-ratio');
				              el.height(min_height);
				              jQuery(slideshowId + ' .swiper-container').height(min_height);
				            });
				        }
                    } 
                });
            });
        }
    }

  	,homeIE : function(slideshowId){
        if(jQuery(slideshowId + ' .home-slideshow-wrapper').length){
            jQuery(slideshowId + ' .home-slideshow-wrapper').each(function(index,value){
              
                var _delay_time = '';
                if(jQuery(value).data('autoplay')){
                  _delay_time = jQuery(value).data('time');
                }
              
                var swiper = new Swiper(slideshowId + ' .swiper-container-01', {
                    autoplay: _delay_time
                  	,loop: true
                  	,pagination: slideshowId + ' .swiper-pagination-01'
                    ,paginationClickable: slideshowId + ' .swiper-pagination-01'
                    ,nextButton: slideshowId + ' .swiper-button-next-01'
                    ,prevButton: slideshowId + ' .swiper-button-prev-01'
                    ,spaceBetween: 30
                    ,scrollbarDraggable: true
                    ,effect: 'fade'
                  	,setWrapperSize: true
                    ,onImagesReady: function(swiper){
                    	$(swiper.container[0]).find('.swiper-slide img').css('visibility','visible');
				        $(swiper.container[0]).find('.swiper-slide').each(function(){
					        var _this = $(this);
					        _this.find('.video-slide').show();
					        if (!_this.find('.video-slide').data('full-height')) {
					            _this.find('.video-slide video').css({
					              position: 'relative',
					              width: '100%'
					            });
					        }
					        else{
					            _this.find('.video-slide video').css({
					              left: '50%',
					              top: '50%',
					              transform: 'translate(-50%, -50%)'
					            });
					        }
				        });

				        var el = jQuery(slideshowId);
				        if(el.data('adapt')){
					        var min_height = el.find('.bc-home-slideshow').width() / el.data('min-aspect-ratio');
					        el.height(min_height);
					        jQuery(slideshowId + ' .swiper-container').height(min_height);
					        jQuery(window).resize(function(){
					            var min_height = el.find('.bc-home-slideshow').width() / el.data('min-aspect-ratio');
					            el.height(min_height);
					            jQuery(slideshowId + ' .swiper-container').height(min_height);
					        });
				        }
                    }
                });
            });
        }
    }

    ,homeSlideshow02 : function(){
        if(jQuery('.slideshow-02 .home-slideshow-wrapper').length){
            jQuery('.slideshow-02 .home-slideshow-wrapper').each(function(index,value){
              
                var _delay_time = '';
                if(jQuery(value).data('autoplay')){
                	_delay_time = jQuery(value).data('time');
                }
              
                var swiper = new Swiper('.swiper-container-02', {
                  	autoplay: _delay_time
                  	,loop: true
                    ,pagination: '.swiper-pagination-02'
                    ,paginationClickable: '.swiper-pagination-02'
                    ,nextButton: '.swiper-button-next-02'
                    ,prevButton: '.swiper-button-prev-02'
                    ,spaceBetween: 30
                    ,scrollbarDraggable: true
                    ,effect: jQuery(value).data('animation')
                  	,setWrapperSize: false
                    ,onImagesReady: function(swiper){
                    	$(swiper.container[0]).find('.swiper-slide img').css('visibility','visible');
				        $(swiper.container[0]).find('.swiper-slide').each(function(){
				            var _this = $(this);
				            _this.find('.video-slide').show();
				            if (!_this.find('.video-slide').data('full-height')) {
				              _this.find('.video-slide video').css({
				                position: 'relative',
				                width: '100%'
				              });
				            }
				            else{
				              _this.find('.video-slide video').css({
				                left: '50%',
				                top: '50%',
				                transform: 'translate(-50%, -50%)'
				              });
				            }
				        });

				        var el = jQuery('.slideshow-02');
				        if(el.data('adapt')){
				            var min_height = el.find('.bc-home-slideshow').width() / el.data('min-aspect-ratio');
				            el.height(min_height);
				            jQuery('.slideshow-02 .swiper-container').height(min_height);
				            jQuery(window).resize(function(){
				              var min_height = el.find('.bc-home-slideshow').width() / el.data('min-aspect-ratio');
				              el.height(min_height);
				              jQuery('.slideshow-02 .swiper-container').height(min_height);
				            });
				        }
                    } 
                });
            });
        }
    }

    ,homeIE02 : function(){
        if(jQuery('.slideshow-02 .home-slideshow-wrapper').length){
            jQuery('.slideshow-02 .home-slideshow-wrapper').each(function(index,value){
              
                var _delay_time = '';
                if(jQuery(value).data('autoplay')){
                  _delay_time = jQuery(value).data('time');
                }
              
                var swiper = new Swiper('.swiper-container-02', {
                    autoplay: _delay_time
                  	,loop: true
                  	,pagination: '.swiper-pagination-02'
                    ,paginationClickable: '.swiper-pagination-02'
                    ,nextButton: '.swiper-button-next-02'
                    ,prevButton: '.swiper-button-prev-02'
                    ,spaceBetween: 30
                    ,scrollbarDraggable: true
                    ,effect: 'fade'
                  	,setWrapperSize: true
                    ,onImagesReady: function(swiper){
                    	$(swiper.container[0]).find('.swiper-slide img').css('visibility','visible');
				        $(swiper.container[0]).find('.swiper-slide').each(function(){
					        var _this = $(this);
					        _this.find('.video-slide').show();
					        if (!_this.find('.video-slide').data('full-height')) {
					            _this.find('.video-slide video').css({
					              position: 'relative',
					              width: '100%'
					            });
					        }
					        else{
					            _this.find('.video-slide video').css({
					              left: '50%',
					              top: '50%',
					              transform: 'translate(-50%, -50%)'
					            });
					        }
				        });

				        var el = jQuery('.slideshow-02');
				        if(el.data('adapt')){
					        var min_height = el.find('.bc-home-slideshow').width() / el.data('min-aspect-ratio');
					        el.height(min_height);
					        jQuery('.slideshow-02 .swiper-container').height(min_height);
					        jQuery(window).resize(function(){
					            var min_height = el.find('.bc-home-slideshow').width() / el.data('min-aspect-ratio');
					            el.height(min_height);
					            jQuery('.slideshow-02 .swiper-container').height(min_height);
					        });
				        }
                    }
                });
            });
        }
    }

    ,parallaxScroll : function(e,p){
	    if (typeof e != 'undefined' || typeof p != 'undefined') {
		    jQuery(window).on('scroll.parallax', function(){
		        var pos = jQuery(window).scrollTop();
		        var elem = e;//jQuery('.slideshow-catalog-wrapper');
		        var top = elem.offset().top;
		        var elemH = elem.height();
		        var windowHeight = jQuery(window).height();
		        var param =  p;//jQuery('.swiper-slide');

		        if (pos>top + elemH||pos<top||top > pos + windowHeight) {
		          param.each(function(){
		            param.css('transform', 'translateY(0px)');

		          })
		          return;
		        }

		        param.each(function(){
		          param.css('transform', 'translateY(' + Math.round((pos-top) * 0.35) + 'px)');

		        })
		    });
	    }
	}
	
	,stickMenu : function() {
		let enable_stick = jQuery(".header-content").data('stick');
		let headerStyle = jQuery(".header-container").data('style');
		let verticalNavbar = jQuery(".vertical-navbar")

		let verticalNavbarOpened;
		if(verticalNavbar.hasClass('opened')){
			verticalNavbarOpened = true;
		}

		if(enable_stick){
		  //Keep track of last scroll
			let lastScroll = 0;
			let header = jQuery(".header-container");
			let body_content = jQuery("#body-content");
			let bt = $(header).height();
			if (headerStyle == '5') {
				bt = $(header).find('.header-inner').height();
			}
			jQuery(window).scroll(function() {
				//Sets the current scroll position
				let st = jQuery(this).scrollTop();

				//Determines up-or-down scrolling
				if (st > lastScroll) {
					
					//Replace this with your function call for downward-scrolling
					if (st > bt ) {
						header.addClass("header-fixed fadeInDown animated");
						body_content.addClass("has-header-fixed");
						
						if(headerStyle == '1' && verticalNavbar.hasClass('opened') ) {
							verticalNavbar.removeClass('opened');
							$('.vertical-navbar .dropdown').removeClass('menu-open');
							verticalNavbarOpened = false;
						}
						
					}
					
				}
				else {
					//Replace this with your function call for upward-scrolling
					if (st < bt) {
						header.removeClass("header-fixed fadeInDown animated");
						body_content.removeClass("has-header-fixed");
					}
				}
				//Updates scroll position
				lastScroll = st;
			});
		}

	}
  
  	,stickAddToCart : function() {
		if(!$('#col-main').hasClass('layout-pre-order')){
			$(window).on( 'scroll' , function() {
			var ps = jQuery(this).scrollTop();
			var _show_sticky = ($('#add-to-cart').offset().top);

			if ( _show_sticky < ps ) {
				$('.add-to-cart-sticky').addClass('show');  
			}
			else {
				$('.add-to-cart-sticky').removeClass('show');
			}
			});
		}
	}

	,toTopButton : function(){
		var to_top_btn = $("#scroll-to-top");
		if( 1 > to_top_btn.length ){
			return;
		}
		$(window).on( 'scroll' , function() {
			var b = jQuery(this).scrollTop();
			var c = jQuery(this).height();
			if (b > 100) { 
				var d = b + c / 2;
			}
			else { 
				var d = 1 ;
			}

			if (d < 1000 && d < c) { 
				jQuery("#scroll-to-top").removeClass('on off').addClass('off'); 
			} else {
				jQuery("#scroll-to-top").removeClass('on off').addClass('on'); 
			}
		});

		to_top_btn.on( 'click',function (e) {
			e.preventDefault();
			jQuery('body,html').animate({scrollTop:0},800,'swing');
		});
	}
	,smoothBody:function(bodyTop){
	
		if ($("#body-content").hasClass("has-header-fixed")) {	
			$(".has-header-fixed").css(
				{	
					"padding-top": bodyTop + "px"
				}
			)
		}		
		else{
			$("#body-content").removeAttr('style');
		}
					
	}
      
    ,toggleVerticalMenu : function(){
        jQuery(document).on('click', '.vertical-menu .head', function(e) {
          jQuery(this).toggleClass('opened');
					jQuery('.vertical-navbar').toggleClass('opened');
					$('.vertical-navbar .main-nav').find('.dropdown').first().toggleClass('menu-open');
        });
	}
  
  	,toggleCartSidebar : function(){
		jQuery('.cart-toggle').on('click',function (e) { 
			e.stopPropagation();
			AT_Main.fixNoScroll();
			jQuery('.cart-sb').toggleClass('opened');
			jQuery('body').toggleClass('cart-opened');
		});

		jQuery('#page-body, .c-close').on('click',function () {
			jQuery('.cart-sb').removeClass('opened');
			jQuery('html,body').removeClass('cart-opened');
          
            
          
			AT_Main.fixReturnScroll();
		}); 
	}

  	,toggleFilterSidebar : function(){
        jQuery('.filter-icon.toggle').on('click',function (e) {
            jQuery('.filter-sidebar').slideToggle("slow");
		});
      
		jQuery('.filter-icon.drawer').on('click',function (e) {
			e.stopPropagation();
			AT_Main.fixNoScroll();
			jQuery('body').toggleClass('sidebar-opened');
		});

		jQuery('#page-body').on('click',function () {
			jQuery('html,body').removeClass('sidebar-opened');
			// AT_Main.fixReturnScroll();
		}); 	
      
      	jQuery('.f-close').on('click',function () {
          	jQuery('#sidebar').removeClass('opened');
			jQuery('html,body').removeClass('sidebar-opened');
			// AT_Main.fixReturnScroll();
		});
      
      	jQuery('.filter-icon-order').on('click',function (e) {
			e.stopPropagation();
			AT_Main.fixNoScroll();
			jQuery('body').toggleClass('order-sidebar-opened');
		});

		jQuery('#page-body').on('click',function () {
			jQuery('html,body').removeClass('order-sidebar-opened');
			// AT_Main.fixReturnScroll();
		}); 	
      
      	jQuery('.fof-close').on('click',function () {
			jQuery('html,body').removeClass('order-sidebar-opened');
			// AT_Main.fixReturnScroll();
		});

		
		
	}
	
    ,parallaxIt : function() {
		if($(".parallax-section").length == 0) 
			return;
		$.fn.parallaxScroll = function(xpos, speedFactor, outerHeight) {
			var elem = $(this);
			var getHeight;
			var firstTop;
			var paddingTop = 0;

			//get the starting position of each element to have parallax applied to it      
			$(this).each(function(){
				firstTop = $(this).offset().top;
			});

			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};

			var j$element, top, height, pos;

			function update(){

				pos = $(window).scrollTop();             
				firstTop = elem.offset().top;
				height = getHeight(elem);
				
				if (pos + $(window).height() < firstTop || pos > firstTop + height) {
				  return;
				}

				if(AT_Main.checkLayout()!=1)
				  elem.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px",0);   
				else         
				  elem.css('backgroundPosition', xpos + " " + -Math.round((firstTop - pos) * speedFactor) + "px",0);  
			}       

			window.addEventListener('scroll', function(){ 
				update(); 
			}, false)

			update();
		}; 

		$(".parallax-section").parallaxScroll("50%",0.1);
	}
      
    ,handleGridList : function(){
      
      	if ($.cookie('cata-grid-4') == "yes") {
          $("body").addClass("cata-grid-4");
          $('.grid').each(function() {
            $(this).removeClass("active");
          });            
          $('.grid-4').addClass("active");  
        }
      
        if ($.cookie('cata-grid-3') == "yes") {
          $("body").removeClass("cata-grid-4");
          $("body").addClass("cata-grid-3");
          $('.grid').each(function() {
            $(this).removeClass("active");
          });            
          $('.grid-3').addClass("active");
        }

        if ($.cookie('cata-grid-2') == "yes") {
          $("body").removeClass("cata-grid-4");
          $("body").addClass("cata-grid-2");
          $('.grid').each(function() {
            $(this).removeClass("active");
          });            
          $('.grid-2').addClass("active");
        }

        if ($.cookie('cata-grid-1') == "yes") {
          $("body").removeClass("cata-grid-4");
          $("body").addClass("cata-grid-1");
          $('.grid').each(function() {
            $(this).removeClass("active");
          });            
          $('.grid-1').addClass("active");
        }

        jQuery("body").on("click", ".grid-4", function() {
          	$.cookie('cata-grid-3','no',  {expires: 1, path: '/'});
            $.cookie('cata-grid-2','no',  {expires: 1, path: '/'});
          	$.cookie('cata-grid-1','no',  {expires: 1, path: '/'});
          	jQuery("body").removeClass("cata-grid-1 cata-grid-2 cata-grid-3");
            jQuery("body").addClass("cata-grid-4");
          
            var e = jQuery(this).closest(".grid-list");
            e.children('.grid').each(function() {
              $(this).removeClass("active");
            });            
			$(this).addClass("active");  

			if( _bc_config.enable_title_blance == "true" ){
				AT_Main.scareName();
			}  
          
        }),jQuery("body").on("click", ".grid-3", function() {
          	$.cookie('cata-grid-4','no',  {expires: 1, path: '/'});
            $.cookie('cata-grid-2','no',  {expires: 1, path: '/'});
          	$.cookie('cata-grid-1','no',  {expires: 1, path: '/'});
          	$.cookie('cata-grid-3','yes', {expires: 1, path: '/'});
          
          	jQuery("body").removeClass("cata-grid-1 cata-grid-2 cata-grid-4");
          	jQuery("body").addClass("cata-grid-3");
          
            var e = jQuery(this).closest(".grid-list");
            e.children('.grid').each(function() {
              $(this).removeClass("active");
            });            
			$(this).addClass("active");
			if( _bc_config.enable_title_blance == "true" ){
				AT_Main.scareName();
			}  
          
        }),jQuery("body").on("click", ".grid-2", function() {
            var e = jQuery(this).closest(".grid-list");
          	$.cookie('cata-grid-4','no',  {expires: 1, path: '/'});
          	$.cookie('cata-grid-3','no',  {expires: 1, path: '/'});
          	$.cookie('cata-grid-1','no',  {expires: 1, path: '/'});
            $.cookie('cata-grid-2','yes', {expires: 1, path: '/'});
          
          	jQuery("body").removeClass("cata-grid-1 cata-grid-3 cata-grid-4");
          	jQuery("body").addClass("cata-grid-2");
          
            var e = jQuery(this).closest(".grid-list");
            e.children('.grid').each(function() {
              $(this).removeClass("active");
            });            
			$(this).addClass("active");
			if( _bc_config.enable_title_blance == "true" ){
				AT_Main.scareName();
			}  
          
        }),jQuery("body").on("click", ".grid-1", function() {
            var e = jQuery(this).closest(".grid-list");
            $.cookie('cata-grid-4','no',  {expires: 1, path: '/'});
          	$.cookie('cata-grid-3','no',  {expires: 1, path: '/'});
          	$.cookie('cata-grid-2','no',  {expires: 1, path: '/'});
            $.cookie('cata-grid-1','yes', {expires: 1, path: '/'});
          
          	jQuery("body").removeClass("cata-grid-2 cata-grid-3 cata-grid-4");
          	jQuery("body").addClass("cata-grid-1");
          
            var e = jQuery(this).closest(".grid-list");
            e.children('.grid').each(function() {
              $(this).removeClass("active");
            });            
			$(this).addClass("active");
			if( _bc_config.enable_title_blance == "true" ){
				AT_Main.scareName();
			}  
        })
    }
  
    ,handleOrderFormQty : function(){
      jQuery("body").on("click",".global-product-info-qty-plus",function(){
        q = $(this).prev();
        var value = parseInt(q.val(), 10);
        value = isNaN(value) ? 0 : value;
        value++;
        q.val(value);
      });

      jQuery("body").on("click",".global-product-info-qty-minus",function(){
        q = $(this).next();
        var value = parseInt(q.val(), 10);
        value = isNaN(value) ? 1 : value;
        if(value > 1){
          value--;
          q.val(value);
        }
      });
    }
  
  	,effectNavigation : function(){ // Make hover effect of navigation
      
      	jQuery(".top-account-holder").hover(function(e){
			jQuery(this).find('>.dropdown-menu').addClass("fadeInUp animated");
		},function(e){
			jQuery(this).find('>.dropdown-menu').removeClass("fadeInUp animated");
		});
      
      	jQuery(".currency-block").hover(function(e){
			jQuery(this).find('>.dropdown-menu').addClass("fadeInUp animated");
		},function(e){
			jQuery(this).find('>.dropdown-menu').removeClass("fadeInUp animated");
		});
      
      	jQuery(document).on('click','.searchbox>a',function(e){
            $(this).parents().find('.searchbox').toggleClass('open');
  		});
      
        jQuery('#city-phone-numbers').on("change", function(e) {
          var _newcity = jQuery(e.currentTarget).find(':selected').attr('value');
          $('#city-phone-number-label').html(_newcity);
        });
      
	}

	,fixNoScroll : function() { // Fixed persitent position of page when scroll disapear
		var windowW = jQuery(window).width();
		if(!($('#page-body').hasClass('boxed'))){
			jQuery('#page-body, .header-content, #page-body .mobile-version').css("width", windowW + 'px');
		}
			
		
		
		
	}

	,fixReturnScroll : function() {
		jQuery('#page-body, .header-content,#page-body .mobile-version').attr('style', ''); 
	}

  	,fixButton : function(){
      	jQuery(".product-wrapper .product-head").each(function(e){
            if($(this).children().hasClass('wrapper-countdown')){
              	$(this).find('.product-button').addClass('fix');
            }
  		});
    }
  
  	,handleReviews: function() {
        SPR.registerCallbacks(), SPR.initRatingHandler(), SPR.initDomEls(), SPR.loadProducts(), SPR.loadBadges();
		}
	,toggleDropdownVerticalMenu : function(){
		$('.vertical-navbar .main-nav>li').click(function(event){
			let e = this;
			if( event.target !== e ) {
			    return;
			}
			$('.vertical-navbar .main-nav>li').each(function(index,item){
	          	if(e != item) {
	            	$(item).removeClass('menu-open');
	          	}
        	})
			e = $(this);
			if(e.hasClass('dropdown')) {
				if(e.hasClass('menu-open')) {
					e.removeClass('menu-open');
				}
				else {
					e.addClass('menu-open'); 
				}
			}
		})
		$('body').click(function(element) {
			if ($(element.target).closest('.vertical-navbar').length == 0) {
				$('.vertical-navbar .main-nav>li.dropdown').removeClass('menu-open');
			}
		});

	}
    
	,menuOnMobile : function(){
		if($('.mobile-version .mega-menu .position-left').length > 0 || $('.mobile-version .mega-menu .position-center').length > 0 || $('.mobile-version .mega-menu .position-right').length > 0){
			$('.mobile-version .mega-menu .position-left,.mobile-version .mega-menu .position-center,.mobile-version .mega-menu .position-right').attr('style','');
		    $('.mobile-version .mega-menu .mega-col').each(function(){
		      	$(this).parents('.row').first().before($(this).children());
		    })
		    $('.mobile-version .mega-menu .row').remove();
		}

        jQuery(document).on('click',function(e){
          	if(jQuery(e.target).attr('id') == 'page-body'){
          		jQuery(".menu-mobile").removeClass("opened");
				jQuery("html,body").removeClass("menu-opened");
				jQuery(".dropdown-menu").removeClass("menu-mobile-open parent-menu-mobile-open");
          	}
        });
						
				jQuery(window).on('resize',function () {
					jQuery(".menu-mobile").removeClass("opened");
					jQuery("html,body").removeClass("menu-opened");
					AT_Main.fixReturnScroll();
				}); 
				//let oldTitle=$('#title-menu').html();
      	jQuery('.mm-block-icons .wishlist-target, .mm-block-icons .compare-target, .m-close, .close-nd').on('click',function () {
					jQuery(".menu-mobile").removeClass("opened");
					jQuery("html,body").removeClass("menu-opened");
					jQuery(".dropdown-menu").removeClass("menu-mobile-open parent-menu-mobile-open");
				
					//$('#title-menu').html(oldTitle)
				
					AT_Main.fixReturnScroll();
				});

				jQuery(document).on('click','.responsive-menu',function(e){
					e.stopPropagation();
					AT_Main.fixNoScroll();
					jQuery(".menu-mobile").toggleClass("opened");
					jQuery("html,body").toggleClass("menu-opened")
				});

				jQuery(".navbar .menu-list li").hover(function(){jQuery(this).addClass("hover")},function(){jQuery(this).removeClass("hover")});

				if($('.mobile-version .menu-product-carousel').length > 0){
					setTimeout(function(){ 
						$('.mobile-version .menu-product-carousel').prepend('<li class="back-prev-menu"><i class="demo-icon icon-back"></i><span class="m-title">Translation missing: en.general.header.menu_text</span><i class="m-close demo-icon icon-close"></i></li>');
					},500)	
				}
				
				jQuery(document).on('click','.mobile-version .menu-mobile .main-nav .dropdown',function(event){

					if(event.target.tagName.toLowerCase() == 'a' || event.target.classList.contains('m-close')){
						return;
					}

					$('.menu-mobile').animate({
						scrollTop: 0
					}, 500);

					let title = $(this).find('a').first().text().trim().split('\n')[0];     
					let e = $(this);
	
					if (e.hasClass('dropdown') ) {
						let child = e.children('.dropdown-menu');
						if(child.length > 0){
							if (e.children('.dropdown-menu').hasClass('menu-mobile-open') == false) {
								if(child.find('.banners').length > 0){
									child.find('.banners').each(function(){
										let el = $(this);
										let img = el.children('.dropdown-menu').find('img');
										if (img.hasClass('lazyloaded')) {
											let temp = el.children('.dropdown-menu').find('img').parents('li').first().html();
											el.parents('.dropdown-menu').first().append(el.html(temp).removeClass('dropdown'));
										}
									})
								}

								e.children('.dropdown-menu').addClass('menu-mobile-open');
								e.closest('.dropdown-menu.menu-mobile-open')
									.animate({scrollTop:0},800,'swing')
									.addClass('parent-menu-mobile-open');

								if (title.length > 0) {
									// $('#title-menu').fadeOut('400', function() {
									// 		$('#title-menu').html(title).fadeIn('400');
									// });
									e.find('.back-prev-menu .m-title').text(title)
								}
								return false;
							}
						}
					}

				  	if (($(event.target).hasClass('back-prev-menu')) || ($(event.target).hasClass('icon-back'))  ) {
						$(event.target).parents('.dropdown-menu').first().removeClass('menu-mobile-open');
						$(event.target).parents('.menu-mobile-open').first().removeClass('parent-menu-mobile-open');
						let title = $(this).find('a').first().text().trim().split('\n')[0];  
						if (title.length > 0) {
							e.find('.back-prev-menu .m-title').text(title)
						}
						// if(!$('.menu-mobile-open').length){
						// 	// $('#title-menu').fadeOut('400', function() {
						// 	// 	$('#title-menu').html(oldTitle).fadeIn('400');
						// 	// });

						// 	//e.find('.back-prev-menu .m-title').text(title)
						// }
					}

				});

				

      	jQuery(document).on('click','.sb-menu .expand',function(){
				var e=jQuery(this).parents(".dropdown").first();
            if (e.hasClass("s-open")) {
                e.removeClass("s-open");
            } else {
                e.addClass("s-open");
            }
				})
      
      	jQuery(document).on('click','.currency_wrapper',function(){	
            if ($('.currency-block').hasClass("opened")) {
                $('.currency-block').removeClass("opened");
            } else {
                $('.currency-block').addClass("opened");
            }
				});
      
      	jQuery(document).on('click','.bc-toggle',function(){
				var e=jQuery(this);
            if (e.hasClass("opened")) {
                e.removeClass("opened");
            } else {
                e.addClass("opened");
            }
				});
      
      	jQuery(document).on('click','.top-cart-holder.hover-dropdown .cart-target',function(){
					var e=jQuery(this);
					if (e.hasClass("opened")) {
							e.removeClass("opened");
					} else {
							e.addClass("opened");
					}
				});

	}
	
	,handleMenuMultiLine : function() {
		var outItem = "";
		var down = false;

		var top = 0;

		jQuery(".navbar-collapse .main-nav > li").on("mousemove", function(e){
			var target = jQuery(e.currentTarget);

			if( down && outItem != "") {
				outItem.addClass("hold");
				setTimeout(function(){
					if(outItem != "")
					outItem.removeClass("hold");
					down = false;
					outItem = "";
				},500);

				if( (outItem[0] == target[0]) || (outItem.offset().top == target.offset().top) )
				{       
					outItem.removeClass("hold");
					down = false;
					outItem = "";
				}
			}
			else {
				outItem = "";
			}

		});

		jQuery(".navbar-collapse .main-nav >li").on("mouseout", function(e){

			var target = jQuery(e.currentTarget);

			if( e.pageY >= target.offset().top + 50 ) { //move down
				down = true;
			}

			if( target.hasClass("dropdown") ) { //target has child

				if(outItem == "")
					outItem = target;
			}

		});
	}

	,fixTitle : function(){ // fix title a in filter
		jQuery(".rt a").attr("data-title", function() { return jQuery(this).attr("title"); });
		jQuery(".rt a").removeAttr("title");
        jQuery(".size-all").after(jQuery(".size-xxxl")).after(jQuery(".size-xxl")).after(jQuery(".size-xl")).after(jQuery(".size-l")).after(jQuery(".size-m")).after(jQuery(".size-s")).after(jQuery(".size-xs")).after(jQuery(".size-xxs")).after(jQuery(".size-xxxs"));
	}

	,filterCatalogReplace : function(collectionUrl, filter_id){
      
		var value = collectionUrl.substring(collectionUrl.lastIndexOf('/') + 1);
		var val = value.substring(value.lastIndexOf('?')); 

		collectionUrl = collectionUrl.replace(value, '');

		value = value.replace(val, '');
		value = value.replace('#', '');

		var value_arr = value.split('+');

		var current_arr = [];
		jQuery('#'+filter_id+' li.active-filter').each( function() {
		  current_arr.push(jQuery(this).attr('data-handle'));
		});

		jQuery('#'+filter_id+' li.active-filter').find('a').attr('title', '');
		jQuery('#'+filter_id+' li').removeClass('active-filter');

		for(jQueryi = 0; jQueryi<current_arr.length; jQueryi++) {
		  value_arr = jQuery.grep(value_arr, function( n, i ) { return ( n !== current_arr[jQueryi]  ); });
		}

		var new_data = value_arr.join('+')

		var new_url = collectionUrl+new_data+val;

		if( typeof AT_Filter != 'undefined' && AT_Filter ){
			AT_Filter.updateURL = true;
            AT_Filter.requestPage(new_url);		
		}else{
			window.location = new_url;
		}
		
	}
  
	,filterCatalog : function(){
		var currentTags = ''
			,filters 	= jQuery('.advanced-filter');

		filters.each(function() {
			var el = jQuery(this)
				,group = el.data('group');

			if ( el.hasClass('active-filter') ) { //Remove class hidden
				el.parents('.sb-filter').find('a.clear-filter').removeClass('hidden');
			}
		});
      
      	filters.on('click', function(e) {
        var el = $(this)
            ,group = el.data('group')
            ,url = el.find('a').attr('href')

        // Continue as normal if we're clicking on the active link
        if ( el.hasClass('active-filter') ) {
          return;
        }
        
          var _logic = jQuery(".page-cata").data('logic');
          
          if( _logic ){
            // Get active group link (unidentified if there isn't one)
            activeTag = $('.active-filter[data-group="'+ group +'"]');

            // If a tag from this group is already selected, remove it from the new tag's URL and continue
            if ( activeTag && activeTag.data('group') === group ) {
              e.preventDefault();
              activeHandle = activeTag.data('handle') + '+';

              // Create new URL without the currently active handle
              url = url.replace(activeHandle, '');

              window.location = url;
            }
          }

         
      });

      	jQuery('.style-accordion').off().on('click', '.sb-filter', function(n){ // Handle accordion in sidebar filter
	        if(!($(n.target).hasClass('clear-filter')) && $(window).width() > 992) {
	        	$(this).toggleClass('accordion-active');
	        	$(this).find('.advanced-filters').slideToggle('slow');
	        }
	      });

		jQuery('.sb-filter').on('click', '.clear-filter', function(n){ // Handle button clear

			var filter_id = jQuery(this).attr('id');
			filter_id = filter_id.replace('clear-', '');

			var collectionUrl = window.location.href;

			if(collectionUrl.match(/\?/)){
				var string = collectionUrl.substring(collectionUrl.lastIndexOf('?') - 1);

				if(string.match(/\//)){
					var str_replace = string.replace(/\//, '');
					collectionUrl = collectionUrl.replace(string, '');
					collectionUrl = collectionUrl+str_replace;
					AT_Main.filterCatalogReplace(collectionUrl, filter_id);
				}
				else{
					AT_Main.filterCatalogReplace(collectionUrl, filter_id);
				}
			}
			else{
				var value = collectionUrl.substring(collectionUrl.lastIndexOf('/') + 1);

				collectionUrl = collectionUrl.replace(value, '');  

				value = value.replace('#', '');

				var value_arr = value.split('+');

				var current_arr = [];
				jQuery('#'+filter_id+' li.active-filter').each( function() {
				  current_arr.push(jQuery(this).attr('data-handle'));
				});

				jQuery('#'+filter_id+' li.active-filter').find('a').attr('title', '');
				jQuery('#'+filter_id+' li').removeClass('active-filter');

				for(jQueryi = 0; jQueryi<current_arr.length; jQueryi++) {
				  value_arr = jQuery.grep(value_arr, function( n, i ) { return ( n !== current_arr[jQueryi]  ); });
				}

				var new_data = value_arr.join('+')

				var new_url = collectionUrl+new_data;

				if( typeof AT_Filter != 'undefined' && AT_Filter ){
					AT_Filter.updateURL = true;
		            AT_Filter.requestPage(new_url);		
				}else{
					window.location = new_url;
				}
			}
			if($('.page-cata').hasClass('collection-infinite-template')){
				$.doTimeout( 'scroll', 3000, function(){
					location.reload();
				});
			}
		});
	}
	
	,swatch : function(){
        jQuery('.swatch :radio').change(function() {
          	var optionIndex = jQuery(this).closest('.swatch').attr('data-option-index');
          	var optionValue = jQuery(this).val();
          	jQuery(this)
          	.closest('form')
          	.find('.single-option-selector')
          	.eq(optionIndex)
          	.val(optionValue)
          	.trigger('change');
        });
  	}
  
  	,switchImgProduct: function() {
    	$('.product-swatch-images .swatch-element > input').on('change', function(e){
		    var imgUrl = $(this).data("swatch-image"),
		    	parent = $(this).parents('.mode-view-item'),
		    	imgElem = parent.find('.product-image img').first();

		    if(imgElem.hasClass('lazyloaded')){
		        var _img = $(this).parent().find('.img-swt-temp');
		        imgElem.attr('data-srcset',_img.attr('data-srcset'));
		        imgElem.attr('srcset',_img.attr('srcset'));
		    }else{
		        imgElem.attr('src', imgUrl);
		    };
        });
    }
      
   //  ,slickProductPage: function(){

   //  	jQuery('.slider-for-03').on('init', function(){
   //      	let _url = $('.slick-current').find('img').attr('data-zoom');
			// $('.slick-current .slick-zoom')
		 //      .zoom({
		 //        url: _url
		 //    	});
   //      })

   //      jQuery('.slider-for-03').length && jQuery('.slider-for-03').slick({
   //        slidesToShow: 1
   //        ,slidesToScroll: 1
   //        ,arrows: true
   //        ,fade: true
   //        ,asNavFor: '.slider-thumbs-03'
   //        ,nextArrow: $('.slick-btn-03 .btn-next')
   //        ,prevArrow: $('.slick-btn-03 .btn-prev')
   //      });

   //      jQuery('.slider-for-03').on('afterChange', function(){
   //      	$('.slick-zoom').trigger('zoom.destroy');
   //      	let _url = $('.slick-current').find('img').attr('data-zoom');
			// $('.slick-current .slick-zoom')
		 //      .zoom({
		 //        url: _url
		 //    	});
   //      })

   //      jQuery('.slider-thumbs-03').length && jQuery('.slider-thumbs-03').slick({
   //        infinite: false
   //        ,slidesToShow: 4
   //        ,slidesToScroll: 1
   //        ,asNavFor: '.slider-for-03'
   //        ,dots: false
   //        ,arrows: false
   //        ,focusOnSelect: true
   //        ,draggable: true
   //      });  
   //  }
           
	,scareName : function(){
		var _name_height = 0;
		jQuery('.product-wrapper').find('h5.product-name a, h5.product-name').each(function(){ 
			$(this).removeAttr('style');
		})
		jQuery('.product-wrapper').find('h5.product-name a, h5.product-name').each(function( index,value ){
			_name_height = jQuery(value).height() > _name_height ? jQuery(value).height() : _name_height;
			jQuery('.product-wrapper').find('h5.product-name').css('height',_name_height); 
			$('.sidemenu-holder .product-wrapper,.menu-mobile .product-wrapper').find('h5.product-name').removeAttr('style');
		}); 

		jQuery('.product-grid-item .product-wrapper').find('.product-content').each(function(){ 
			$(this).removeAttr('style');
		})
		if($('body').hasClass('templateCollection')){
			if(!$('body').hasClass('cata-grid-1')){
				var productContentHeight = 0;

				setTimeout(function(){
					jQuery('.product-grid-item .product-wrapper').find('.product-content').each(function( index,value ){
						productContentHeight = jQuery(value).height() > productContentHeight ? jQuery(value).height() : productContentHeight;
						jQuery('.product-grid-item .product-wrapper').find('.product-content').css('height', productContentHeight); 
						//$('.sidemenu-holder .product-wrapper,.menu-mobile .product-wrapper').find('.product-content').removeAttr('style');
					});
				},1000)
			}
		} else {
			var productContentHeight = 0;

			setTimeout(function(){
				jQuery('.product-grid-item .product-wrapper').find('.product-content').each(function( index,value ){
					productContentHeight = jQuery(value).height() > productContentHeight ? jQuery(value).height() : productContentHeight;
					jQuery('.product-grid-item .product-wrapper').find('.product-content').css('height', productContentHeight); 
					//$('.sidemenu-holder .product-wrapper,.menu-mobile .product-wrapper').find('.product-content').removeAttr('style');
				});
			},1000)
		}
    }      
  
  	,scareWidth : function(){
        var _name_width = 110;
        jQuery('.variants-wrapper .selector-wrapper').find('label').each(function( index,value ){
          _name_width = jQuery(value).width() > _name_width ? jQuery(value).outerWidth() : _name_width;
        });
        jQuery('.variants-wrapper .selector-wrapper').find('label').css('width',_name_width);
      	jQuery('.swatch.size').find('.header').css('width',_name_width);
      	jQuery('.swatch.color, .swatch.colour').find('.header').css('width',_name_width);
      	//jQuery('.product-code span:first-child').css('width',_name_width);
      	jQuery('.product-qty, .quantity').find('label').css('width',_name_width);
    }       
  
    ,scareScreen : function(){
      	if( typeof _bc_config == "undefined" ){
          	return;
      	}
      	var _current = this;
      
      	if( _bc_config.enable_title_blance == "true" ){
          	this.scareName();
      	}      
      	
      	jQuery( document ).ajaxComplete(function( event,request, settings ) {
          if( _bc_config.enable_title_blance == "true" ){
              _current.scareName();
          }  
        });  
    }

    ,highlightedWords: function(str, highlight, el){
      	var searchWord = str.indexOf(highlight);
		if (searchWord > -1) {
		  var arrayStr = str.split(highlight);
		  var hlWords = "<span class=\"highlighted\">" + highlight + "</span>";
		  if (arrayStr.length == 2) {
		    var newTitle = "" + arrayStr[0] + hlWords + " " + arrayStr[1];
		  } else {
		    var newTitle = arrayStr[0] + " " + hlWords + " " + arrayStr[1];
		  }
		  el.html(newTitle);
		}
  }

  ,hLWords_sectionProductTabs: function(str, elm){
    var n = str.split(" ");
	if (n.length > 1) {
	  var highlight = n[n.length - 1];
	  var strArray = str.split(highlight);
	  highlight = "<span class=\"highlight\">" + highlight + "</span>";

	  if (strArray.length == 2) {
	    var newText = "" + strArray[0] + highlight;
	  } else {
	    var newText = strArray[0] + " " + highlight;
	  }
	  elm.html(newText);
	}
  }

  	,productSlider : function(){
	    var bxMode;
	    var elm = $('.bxslider');
	    var bxWrapperWidth = $('.more-view-image').width() + 15;

	    if (window.matchMedia("(min-width: 767px)").matches) {
	    	window.productThumbSlider = elm.bxSlider({
		        mode: 'vertical',
		        slideMargin: 20,
		        infiniteLoop:false,
		        minSlides:4,
		        maxSlides:4,
		        pager:false,
		        slideWidth: bxWrapperWidth,
		        touchEnabled: false,
		        prevText:'<i class="icon-up-open-1" title="Previous"></i>',
		        nextText:'<i class="icon-down-open-1" title="Next"></i>',
		    })  
	    }  
	}

	,refreshImage : function(){ // Update product image in detail page
		if(jQuery('.more-view-image').length){

			jQuery('.more-view-image .thumb-img').on('click', function() {

				var _$this = jQuery(this);

				if(!_$this.hasClass('active')){
					var parent = _$this.parents('.product-image-inner');
					// var src_original = _$this.attr('data-zoom-image');
					var src_display = _$this.attr('data-image');

					parent.find('.thumb-img').removeClass('active');
					_$this.addClass('active');

					// parent.find('.featured-image').find('img').attr('data-zoom-image', src_original);
                 	parent.find('.featured-image').find('img').attr('src', src_display);
				}

				return false;
			});
		}
	}

	,portfolio_filter: function(){
		if( jQuery('.portfolio-masonry').length > 0 ){

		    if( 'undefined' === typeof Isotope ){
		      console.log(" Isotope has not defined yet! ");
		      return;
		    }

		    $('.portfolio-masonry').each(function(){
		    	let call_masonry = function(wrapper, item){
			        wrapper.isotope({
			            itemSelector: item,
			            layoutMode: 'packery'
			        });
		        };

		        let $module = $(this);
		        this.addEventListener('load', (function() {
		          var runs;
		          var update = function() {
		              call_masonry($module, '.portfolio-item');
		              runs = false;
		          };
		          return function() {
		              if (!runs) {
		                runs = true;
		                setTimeout(update, 33);
		              }
		          };
		        }()), true);
		        call_masonry($module, '.portfolio-item');

		        var jqPS = function(){
			   		$('.open-image.fancybox').jqPhotoSwipe({
			        	forceSingleGallery: true
			        });
			   } 
			   jqPS();

		        $('.filter-button-group').on( 'click', 'button', function() {
			      	let filterValue = $( this ).attr('data-filter');
			      	$module.isotope({ filter: filterValue });

			      	setTimeout(function(){
			      		$('.portfolio-item').each(function(){
				      		if($(this).css('display') == 'none'){
					    		$(this).find('.open-image').each(function(index, item){
					    			$(item).removeAttr('data-fancybox-group');
					    			$(item).removeClass('fancybox');
					    		})
					    	} else {
					    		$(this).find('.open-image').each(function(index, item){
					    			$(item).attr('data-fancybox-group', 'gallery');
					    			$(item).addClass('fancybox');
					    		})
					    	}
				      	})

			      		jqPS = null;
						//$('body').find('.pswp').remove()
						$('.open-image.fancybox:visible').jqPhotoSwipe({
				        	forceSingleGallery: true
				        });
			      	},500);
			    });


		   //      $('.open-image').on('click', function(e){
					// return false;
		   //      });

			    $(window).resize(function(e){call_masonry($module, '.portfolio-item')})

		    })
		}
	}

	// ,initPrice: []

	// ,callPriceSlider: function(code) {
 //      	if( $('#range-slider').length <= 0 ){
 //      		return;
 //      	}

 //      	var _min_price = jQuery('#amount > span.min-val > span.money').html()
 //    		,_min_price =_min_price.replace(/[^0-9\.]+/g,"")
 //        	,_min_price = _min_price.match(/\d+(\.\d+)?/g,"")
 //        	,_max_price = jQuery('#amount > span.max-val > span.money').html()
 //        	,_max_price =_max_price.replace(/[^0-9\.]+/g,"")
 //        	,_max_price = _max_price.match(/\d+(\.\d+)?/g,"");
  
 //        if( _min_price.length <= 0 || _max_price <= 0 ){
 //          return;
 //        } else{
 //           _min_price = Number(_min_price[0]);
 //           _max_price = Number(_max_price[0]);
 //        }

 //        let money_format = Currency.money_format[Currency.currentCurrency];
 //        let _currentCurrency = Currency.currentCurrency;

 //        if (this.initPrice.length == 0){
	//         this.initPrice.push(_min_price);
	//         this.initPrice.push(_max_price);
	//         this.initPrice.push(_currentCurrency);
	//     }
	//     else {
	//     	_min_price = Currency.convert(parseInt(this.initPrice[0], 10) * 100, this.initPrice[2], Currency.currentCurrency);
	//     	_min_price = Currency.formatMoney(Math.round(_min_price), money_format);
	//     	$('.min-val span.money').html(_min_price);
 //    		_min_price = _min_price.replace(/[^0-9\.]+/g,"");
 //        	_min_price = _min_price.match(/\d+(\.\d+)?/g,"");

	//     	_max_price = Currency.convert(parseInt(this.initPrice[1], 10) * 100, this.initPrice[2], Currency.currentCurrency);
	//     	_max_price = Currency.formatMoney(Math.round(_max_price), money_format);
	//     	$('.max-val span.money').html(_max_price);
	//     	_max_price = _max_price.replace(/[^0-9\.]+/g,"");
 //        	_max_price = _max_price.match(/\d+(\.\d+)?/g,"");

 //        	if( _min_price.length <= 0 || _max_price <= 0 ){
	//           return;
	//         } else{
	//            _min_price = Number(_min_price[0]);
	//            _max_price = Number(_max_price[0]);
	//         }
	//     }	 
	
 //        $('#range-slider').slider({
 //            range: true,
 //            min: _min_price,
 //            max: _max_price,
 //            values: [_min_price, _max_price],
 //            create: function() {
 //              //Currency.convertAll('USD', Currency.currentCurrency); 
 //              //$("#amount").html('<span class="min-val"><span class="money">$10.00</span></span> - <span class="max-val"><span class="money">30000.00</span></span>');
 //            },
 //            slide: function (event, ui) {
              
 //              $("#amount .money").each((index, item) => {
 //              	let priceVal = ui.values[index];
 //                let e, h;
 //                e = Currency.convert(parseInt(priceVal, 10) * 100, Currency.currentCurrency, Currency.currentCurrency)
                
 //                h = Currency.formatMoney(e, money_format);
 //                $(item).html(h);
 //                $(item).attr("data-currency-" + Currency.currentCurrency, h);
                
 //              })
 //              //$("#amount").html('<span class="min-val">' + Shopify.formatMoney(ui.values[0]*100,money_format) + '</span> - <span class="max-val">' + Shopify.formatMoney(ui.values[1]*100,money_format) + '</span>');
 //              var mi = ui.values[0];
 //              var mx = ui.values[1];
							

	// 						filterSystem(mi, mx);
							
 //            }
 //        })

 //        function filterSystem(minPrice, maxPrice) {

	// 				let _currency =  $('.currency_code').html();
 //          $(".cata-product .product-grid-item").hide().filter(function () {
	// 					var price = parseInt($(this).data("price"), 10);
	// 					price = parseInt(Currency.convert(price, '',_currency))	
 //            return price >= minPrice && price <= maxPrice;
 //          }).show();
	// 			}
		
 //    }

    ,totalFilter_2: function(_selector_title_2, chosen_select_1, chosen_select_2, search_button){
    	let jQuery_chosen_select_1 = "#" + chosen_select_1;
	    let jQuery_chosen_select_2 = "#" + chosen_select_2;
	    let jQuery_search_button = "#" + search_button;

    	$(jQuery_chosen_select_1).chosen().change(function(event, params){
			$('#collection-search-wrapper .selector-wrapper').addClass('pending')
			setTimeout(function(){
				$(jQuery_chosen_select_1).find('option').each(function(index, item){
					if(index != 0) {
						let optionVal = $(this).val();
						if(optionVal == params.selected) {
							let colUrl = $(this).data('collection-url');

							let dataTags = $(this).data('tags');
							let dataCountTags = $(this).data('count-tags');
							if(dataTags !== undefined && dataCountTags != undefined) {
								if (_selector_title_2 != ''){
									$(jQuery_chosen_select_2).html('<option value="' + _selector_title_2 + '">' + _selector_title_2 + '</option>');
								}
								else {
									$(jQuery_chosen_select_2).empty()	
								}

								$(jQuery_chosen_select_2).trigger("chosen:updated");

								let dataTagsArray = [], dataCountTagsArray = [];
								if(dataTags.charAt( dataTags.length-1 ) == ",") {
								  dataTags = dataTags.slice(0, -1);
								  dataTagsArray = dataTags.split(',');
								} else {
									dataTagsArray = dataTags.split(',');
								} 

								if(dataCountTags.charAt( dataCountTags.length-1 ) == ",") {
								  dataCountTags = dataCountTags.slice(0, -1);
								  dataCountTagsArray = dataCountTags.split(',');
								} else {
									dataCountTagsArray = dataCountTags.split(',');
								} 

								dataTagsArray.forEach( function(tag, i) {
									dataCountTagsArray.forEach(function (count, j){
										if (i == j) {
											let _tag = tag.replace(/-/g,' ');
											var optionElm = "<option value=\"" + tag + "\" data-collection-url=\"" + colUrl + "/" + tag + "\">" + _tag + " (" + count + ")</option>";
											$(jQuery_chosen_select_2).append(optionElm);
											document.getElementById(chosen_select_2).disabled = false;
											$(jQuery_chosen_select_2).trigger("chosen:updated");
										}
									})

									$('#collection-search-wrapper .selector-wrapper').removeClass('pending')
								})
							}
							else {
								if (_selector_title_2 != ''){
									$(jQuery_chosen_select_2).html('<option value="' + _selector_title_2 + '">' + _selector_title_2 + '</option>');
								}
								else {
									$(jQuery_chosen_select_2).empty()	
								}
								document.getElementById(chosen_select_2).disabled = true;
								$(jQuery_chosen_select_2).trigger("chosen:updated");

								$('#collection-search-wrapper .selector-wrapper').removeClass('pending')
							};

							$(jQuery_search_button).attr('href', colUrl);
							document.getElementById(search_button).disabled = false;
							$('#reset-filter').show()
						}
					}
					else {
						if (_selector_title_2 != ''){
							$(jQuery_chosen_select_2).html('<option value="' + _selector_title_2 + '">' + _selector_title_2 + '</option>');
						}
						else {
							$(jQuery_chosen_select_2).empty()	
						}
						document.getElementById(chosen_select_2).disabled = true;
						$(jQuery_chosen_select_2).trigger("chosen:updated");

						$('#collection-search-wrapper .selector-wrapper').removeClass('pending')

						$(jQuery_search_button).attr('href', 'javascript:;');
						$('#reset-filter').hide()
					}	
				})
			},1000)	
		});

		$(jQuery_chosen_select_2).chosen().change(function(event, params){
			$('#collection-search-wrapper .selector-wrapper').addClass('pending')
			setTimeout(function(){
				$(jQuery_chosen_select_2).find('option').each(function(index, item){
					if(index != 0) {
						let optionVal = $(this).val();
						if(optionVal == params.selected) {
							let colUrl = $(this).data('collection-url');
							$(jQuery_search_button).attr('href', colUrl)
							$('#collection-search-wrapper .selector-wrapper').removeClass('pending')
						}
					} 
					else {
						var defaultUrl = $('#search-collection').attr('href');
						var searchColUrlArray = defaultUrl.split('/');
						var searchColUrl = '/collection/' + searchColUrlArray[2];
						$(jQuery_search_button).attr('href', searchColUrl);
						$('#collection-search-wrapper .selector-wrapper').removeClass('pending')
					}	
				})
			},1000)
		});

		$('#reset-filter').on('click', function(){
			$('#collection-search-wrapper .selector-wrapper').addClass('pending')
			setTimeout(function(){
				$(jQuery_chosen_select_1).val("");
				$(jQuery_chosen_select_1).trigger("chosen:updated");

				if (_selector_title_2 != '') {
					$(jQuery_chosen_select_2).html('<option value="' + _selector_title_2 + '">' + _selector_title_2 + '</option>');
				}
				else {
					$(jQuery_chosen_select_2).empty()	
				}
				document.getElementById(chosen_select_2).disabled = true;
				$(jQuery_chosen_select_2).trigger("chosen:updated");

				$(jQuery_search_button).attr('href', 'javascript:;')
				$('#reset-filter').hide()

				$('#collection-search-wrapper .selector-wrapper').removeClass('pending')
			},1000)
		})
    }

    ,chosenSelect_1: function(_selector_title_2, _selector_title_3, chosen_select_1, chosen_select_2, chosen_select_3, search_button){
    	let jQuery_chosen_select_1 = "#" + chosen_select_1;
	    let jQuery_chosen_select_2 = "#" + chosen_select_2;
	    let jQuery_chosen_select_3 = "#" + chosen_select_3;
	    let jQuery_search_button = "#" + search_button;

    	$(jQuery_chosen_select_1).chosen().change(function(event, params){
			$('#collection-search-wrapper .selector-wrapper').addClass('pending');
			setTimeout(function(){
				$(jQuery_chosen_select_1).find('option').each(function(index, item){
					if (index != 0) {
						let optionVal = $(this).val();

						if(optionVal == params.selected) {
							let colUrl = $(this).data('collection-url');

							let dataTags = $(this).data('tags');
							let dataTags_2 = $(this).data('tags-2');
							let dataCountTags = $(this).data('count-tags');

							if(dataTags != undefined && dataTags != '') {
								if (_selector_title_2 != '') {
									$(jQuery_chosen_select_2).html('<option value="' + _selector_title_2 + '">' + _selector_title_2 + '</option>');
								}
								else {
									$(jQuery_chosen_select_2).empty();	
								}
								$(jQuery_chosen_select_2).trigger("chosen:updated");

								if (_selector_title_3 != '') {
									$(jQuery_chosen_select_3).html('<option value="' + _selector_title_3 + '">' + _selector_title_3 + '</option>');
								} else {
									$(jQuery_chosen_select_3).empty();	
								}
								$(jQuery_chosen_select_3).trigger("chosen:updated");

								let dataTagsArray = [], dataCountTagsArray = [];
								if(dataTags.charAt( dataTags.length-1 ) == ",") {
								  dataTags = dataTags.slice(0, -1);
								  dataTagsArray = dataTags.split(',');
								} else {
									dataTagsArray = dataTags.split(',');
								} 

								if(dataCountTags.charAt( dataCountTags.length-1 ) == ",") {
								  dataCountTags = dataCountTags.slice(0, -1);
								  dataCountTagsArray = dataCountTags.split(',');
								} else {
									dataCountTagsArray = dataCountTags.split(',');
								} 

								dataTagsArray.forEach( function(tag, i) {
									dataCountTagsArray.forEach(function(count, j) {
										if (i == j) {
											let _tag = tag.replace(/-/g,' ');
											var optionElm = "<option value=\"" + tag + "\" data-collection-url=\"" + colUrl + "/" + tag + "\" data-tags=\"" + dataTags_2 + "\">" + _tag + " (" + count + ")</option>";

											$(jQuery_chosen_select_2).append(optionElm);
											document.getElementById('chosen-select-2').disabled = false;
											$(jQuery_chosen_select_2).trigger("chosen:updated");
										}
									})

									$('#collection-search-wrapper .selector-wrapper').removeClass('pending')
								})
							}
							else {
								if (_selector_title_2 != '') {
									$(jQuery_chosen_select_2).html('<option value="' + _selector_title_2 + '">' + _selector_title_2 + '</option>');
								} else {
									$(jQuery_chosen_select_2).empty()	
								}
								document.getElementById(chosen_select_2).disabled = true;
								$(jQuery_chosen_select_2).trigger("chosen:updated");

								if (_selector_title_3 != '') {
									$(jQuery_chosen_select_3).html('<option value="' + _selector_title_3 + '">' + _selector_title_3 + '</option>');
								} else {
									$(jQuery_chosen_select_3).empty()	
								}
								document.getElementById(chosen_select_3).disabled = true;
								$(jQuery_chosen_select_3).trigger("chosen:updated");

								$('#collection-search-wrapper .selector-wrapper').removeClass('pending')
							}

							$(jQuery_search_button).attr('href', colUrl);
						}
					}
					else {
						if (_selector_title_2 != '') {
							$(jQuery_chosen_select_2).html('<option value="' + _selector_title_2 + '">' + _selector_title_2 + '</option>');
						} else {
							$(jQuery_chosen_select_2).empty()	
						}
						document.getElementById(chosen_select_2).disabled = true;
						$(jQuery_chosen_select_2).trigger("chosen:updated");

						if (_selector_title_3 != '') {
							$(jQuery_chosen_select_3).html('<option value="' + _selector_title_3 + '">' + _selector_title_3 + '</option>');
						} else {
							$(jQuery_chosen_select_3).empty()	
						}
						document.getElementById(chosen_select_3).disabled = true;
						$(jQuery_chosen_select_3).trigger("chosen:updated");

						$(jQuery_search_button).attr('href', 'javascript:;');

						$('#collection-search-wrapper .selector-wrapper').removeClass('pending')
					}
				})

				$('#reset-filter').show()
			},1000)	
		});
    }

    ,chosenSelect_2: function(_selector_title_3, chosen_select_2, chosen_select_3, search_button){
    	let jQuery_chosen_select_2 = "#" + chosen_select_2;
     	let jQuery_chosen_select_3 = "#" + chosen_select_3;
     	let jQuery_search_button = "#" + search_button;

    	$(jQuery_chosen_select_2).chosen().change(function(event, params){
			$(jQuery_chosen_select_2).find('option').each(function(index, item){
				let defaultUrl = $('#search-collection').attr('href');
				
				if(index != 0) {
					let optionVal = $(this).val();
					if(optionVal == params.selected) {
						$('#collection-search-wrapper .selector-wrapper').addClass('pending')

						let colUrl = $(this).data('collection-url').replace('.', '-').toLowerCase();
						$(jQuery_search_button).attr('href', colUrl);
							
						let dataTags = $(this).data('tags');
						if(dataTags != undefined) {
							let dataTagsArray = dataTags.split(';');
							if (dataTagsArray[0] != undefined) {
								$.ajax({
									url: colUrl,

									success: function ( response ) {
										if (_selector_title_3 != '') {
											$(jQuery_chosen_select_3).html('<option value="' + _selector_title_3 + '">' + _selector_title_3 + '</option>');
										} else {
											$(jQuery_chosen_select_3).empty()	
										}
										$(jQuery_chosen_select_3).trigger("chosen:updated");

										let _document = $(response);
										let tagArray = [],
											filterTagArr = [];
										_document.find('.cata-product .quick_shop').each(function(){
											let dataJson = $(this).find('span.json').html();
											let productJson = JSON.parse(dataJson);
											let productTagArray = productJson.tags;

											tagArray.push(productTagArray)
										})

										let stringify_tagArray = tagArray.toString();
										tagArray = stringify_tagArray.split(',')
										
										dataTagsArray.forEach(function(dataTag) {
	                                      	let countObj = {
	                                          item: dataTag,
	                                          count: 0
	                                        }
	                                        filterTagArr.push(countObj)
											tagArray.forEach(function(tag){
												if(dataTag == tag) {
	                                             	countObj.count++; 
												}
											})
										})

										filterTagArr.sort(function(a,b){
											if(a.item < b.item) return -1;
										    if(a.item > b.item) return 1;
										    return 0;
										});

										filterTagArr.forEach(function(tag){
											if (tag.count > 0) {
												let optionElm;
												let name = (tag.item).replace(/(-)|(_)/g, ' ');
												if((tag.item).indexOf(' ')){
													let item = (tag.item).replace(/\s/g, '-');
													optionElm = "<option value=\"" + tag.item + "\" data-collection-url=\"" + colUrl + "+" + item + "\">" + name + "</option>";
												} else {
													optionElm = "<option value=\"" + tag.item + "\" data-collection-url=\"" + colUrl + "+" + tag.item + "\">" + name + "</option>";
												}
												$(jQuery_chosen_select_3).append(optionElm);

												document.getElementById(chosen_select_3).disabled = false;

												$(jQuery_chosen_select_3).trigger("chosen:updated");

												$('#collection-search-wrapper .selector-wrapper').removeClass('pending')
											} else {
												$('#collection-search-wrapper .selector-wrapper').removeClass('pending')
											}
										})
									},
									error: function() {
										console.log('error AJAX filter lv 2')
									}
								})
							} 
							else {
								setTimeout(function(){
									console.log('dataTagsArray')
									if (_selector_title_3 != '') {
										$(jQuery_chosen_select_3).html('<option value="' + _selector_title_3 + '">' + _selector_title_3 + '</option>');
									} else {
										$(jQuery_chosen_select_3).empty()	
									}
									document.getElementById(chosen_select_3).disabled = true;
									$(jQuery_chosen_select_3).trigger("chosen:updated");

									$('#collection-search-wrapper .selector-wrapper').removeClass('pending')
								},1000)
							}
						}	
						else {
							setTimeout(function(){
								console.log('dataTags')
								if (_selector_title_3 != '') {
									$(jQuery_chosen_select_3).html('<option value="' + _selector_title_3 + '">' + _selector_title_3 + '</option>');
								} else {
									$(jQuery_chosen_select_3).empty()	
								}
								document.getElementById(chosen_select_3).disabled = true;
								$(jQuery_chosen_select_3).trigger("chosen:updated");

								$('#collection-search-wrapper .selector-wrapper').removeClass('pending')
							},1000)
						}
					}
				}
				else {
					if (_selector_title_3 != '') {
						$(jQuery_chosen_select_3).html('<option value="' + _selector_title_3 + '">' + _selector_title_3 + '</option>');
					} else {
						$(jQuery_chosen_select_3).empty()	
					}
					document.getElementById(chosen_select_3).disabled = true;
					$(jQuery_chosen_select_3).trigger("chosen:updated");

					var searchColUrlArray = defaultUrl.split('/');
					var searchColUrl = '/collection/' + searchColUrlArray[2];
					$(jQuery_search_button).attr('href', searchColUrl);	
				}
				
			})
		});
    }

    ,resetFilter: function(_selector_title_2, _selector_title_3, chosen_select_1, chosen_select_2, chosen_select_3, search_button){
    	let jQuery_chosen_select_1 = "#" + chosen_select_1;
	    let jQuery_chosen_select_2 = "#" + chosen_select_2;
	    let jQuery_chosen_select_3 = "#" + chosen_select_3;
	    let jQuery_search_button = "#" + search_button;

    	$('#reset-filter').on('click', function(){
			$('#collection-search-wrapper .selector-wrapper').addClass('pending')
			setTimeout(function(){
				$(jQuery_chosen_select_1).val("")
				$(jQuery_chosen_select_1).trigger("chosen:updated");

				if (_selector_title_2 != '') {
					$(jQuery_chosen_select_2).html('<option value="' + _selector_title_2 + '">' + _selector_title_2 + '</option>');
				} else {
					$(jQuery_chosen_select_2).empty()	
				}
				document.getElementById(chosen_select_2).disabled = true;
				$(jQuery_chosen_select_2).trigger("chosen:updated");

				if (_selector_title_3 != '') {
					$(jQuery_chosen_select_3).html('<option value="' + _selector_title_3 + '">' + _selector_title_3 + '</option>');
				} else {
					$(jQuery_chosen_select_3).empty()	
				}
				document.getElementById(chosen_select_3).disabled = true;
				$(jQuery_chosen_select_3).trigger("chosen:updated");

				$(jQuery_search_button).attr('href', 'javascript:;')
				$('#reset-filter').hide()

				$('#collection-search-wrapper .selector-wrapper').removeClass('pending')
			},1000)
		})
    }

    ,swatch_product_image: function(){
	    var elm = $('.product-swatch-images .swatch');

	    setTimeout(function(){
	        elm.bxSlider({
		        mode: 'vertical',
		        slideMargin: 3,
		        infiniteLoop:false,
		        minSlides:4,
		        maxSlides:4,
		        pager:false,
		        slideWidth: 50,
		        controls: false,
		        touchEnabled: false,
		        auto: true,
		        infiniteLoop: true,
		        autoHover: true,
		        pause: 1000
		    }) 	
	    },500)
 
    }
		,fixlayoutCustomSectionImage: function(){
			let element= $('.custom-item-inner-image');
			let number = $(element).find('.custom-block-image').length;
			if (number == 2 ){
				$(element).parents('.custom-item').addClass('two-block-inside');
			}

		}
    ,megamenuWithTabs : function(){
      jQuery(".tab-title .title-item").hover(function(e){
        $('.title-item').removeClass('active');
        $('.tab-content-inner').removeClass('active');

        let titleclass = $(this).attr('data-id');
        let elementclass = "." + titleclass;
        
        $(elementclass).addClass('active');
      });
      
      jQuery(".mega-menu").mouseleave(function(){
        $('.title-item').removeClass('active');$('.title-item-1').addClass('active');
        $('.tab-content-inner').removeClass('active');$('.mm-tabs-1').addClass('active')
      });
    }
    
    ,menuLeftColumnHomepage: function(){
    	let _htmlVerticalNav = $('.vertical-menu').find('.vertical-navbar').html();
      	$('.left-column-container .sb-vertical-menu .vertical-navbar').html(_htmlVerticalNav);

      	$('.left-column-container .sb-vertical-menu .vertical-navbar .main-nav>li').click(function(event){
        	let e = this;
        	if( event.target !== e ) {
			    return;
			}
        	$('.left-column-container .sb-vertical-menu .vertical-navbar .main-nav>li').each(function(index,item){
          
	          	if(e != item) {
	            	$(item).removeClass('menu-open')
	          	}
        	})
 
	  //       e = $(this);
			// if(e.hasClass('dropdown')) {
			// 	if(e.hasClass('menu-open')) {
			// 		e.removeClass('menu-open'); 
			// 	}
			// 	else {
			// 		e.addClass('menu-open');
			// 	}
			// }
	       
      	})

      	// $('body').click(function(element) {
       //  	if ($(element.target).closest('.vertical-navbar').length == 0) {
       //    		$('.left-column-container .sb-vertical-menu .vertical-navbar .main-nav>li.dropdown').removeClass('menu-open');
       //  	}
      	// }); 

      	setTimeout(function(){
            if(AT_Main.getWidthBrowser() < 992) {
              jQuery(".left-column-container .sb-vertical-menu .menu-product-carousel").length && jQuery(".left-column-container .sb-vertical-menu .menu-product-carousel").owlCarousel({
                  loop: !1,
                  nav: !0,
                  dots: !1,
                  items: 1,
                  navText: ['<span class="button-prev"></span>', '<span class="button-next"></span>']
              })
            } 
            else {
              jQuery(".left-column-container .sb-vertical-menu .menu-product-carousel").length && jQuery(".left-column-container .sb-vertical-menu .menu-product-carousel").owlCarousel({
                  loop: !1,
                  nav: !0,
                  dots: !1,
                  items: 1,
                  navText: ['<span class="button-prev"></span>', '<span class="button-next"></span>']
              })
            }  
        },1000) 
    }

    ,termsAndConditions : function(){
        jQuery('body').on('click', '[name="checkout"], [name="goto_pp"], [name="goto_gc"]', function() {
          if (jQuery('#agree').is(':checked')) {
            jQuery(this).submit();
          }
          else {
            alert("You must agree with the terms and conditions of sales to check out.");
            return false;
          }
        });
	}

	,currencies_translate_popup: function() {
	    $(document).on('click','.currency-translator',function(e){
	      $('.currency-translator-popup').addClass('show-popup');
	    });

	    $(document).on('click','.topbar-popup-close',function(e){
	      $('.currency-translator-popup').removeClass('show-popup');
	    });

	    $(document).on('click','.currency-translator-popup',function(e){
	      if(e.target.classList.contains('currency-translator-popup')) {
	        $('.currency-translator-popup').removeClass('show-popup');
	      }
	    });

	    jQuery(document).on('click','.currency_wrapper',function(){
	      if ($('.currency-container').hasClass("active")) {
	        $('.currency-container').removeClass("active");
	      } else {
	        $('.currency-container').addClass("active");
	      }
	    });
	}


	,addEvent : function(obj, evt, fn){ // Exit intent
	    if (obj.addEventListener) {
	      obj.addEventListener(evt, fn, false);
	    }
	    else if (obj.attachEvent) {
	      obj.attachEvent("on" + evt, fn);
	    }
	}

	,exitIntent : function(){  // Exit intent trigger
	    AT_Main.addEvent(document, 'mouseout', function(evt) {

	      if (evt.toElement == null && evt.relatedTarget == null ) {
	        AT_Main.newsletterPopupAction();
	      };

	    });
	}

	,newsletterPopupAction : function(){ // Action newsletter popup
	    let expire = jQuery("#newsletter-popup").data('expires');

	    if (jQuery.cookie('mycookie')) {
	      //it hasn't been one days yet
	    }
	    else {
		   	$('#newsletter_popup').modal('show');
	    }
	    jQuery.cookie('mycookie', 'true', { expires: expire });
	}

	,newsletterPopupDelayAction : function(){ // Action newsletter popup with delay time
	    let delay = jQuery("#newsletter-popup").data('delay');
	    let expire = jQuery("#newsletter-popup").data('expires');
	    if (jQuery.cookie('mycookie')) {
	      //it hasn't been one days yet
	    }
	    else {
		   	setTimeout(function(){
		        $('#newsletter_popup').modal('show');
		  	}, delay);
	    }
	    jQuery.cookie('mycookie', 'true', { expires: expire });
	}

	,newsletterPopup : function(){ // Show newsletter popup
	    let style = jQuery("#newsletter-popup").data('style');
	    if ($('.newsletter-popup-content').length > 0){
	      $("#newsletter-popup").on('shopify:block:select', function(){
	      	$('#newsletter_popup').modal('show');

	        let currentDate = new Date();
		    $('.block-countdown .wrapper-countdown').each(function(){
		        let $this = $(this);
		        let prod_id = $this.data('id');
		        let prod_dueDate = $this.data('date');
		        let dueDate = prod_dueDate.split('/');
		        let n_date = dueDate[2] +'-'+dueDate[0]+'-'+dueDate[1];
		        let newdueDate = new Date(n_date);

		        if(currentDate < newdueDate){
		          $this.countdown({until: newdueDate,format: 'DHMS',labels: ['Yrs', 'Mon', 'Week', 'Day', 'Hrs', 'Min', 'Sec'], });
		          $this.parent().removeClass('hide');
		        }
		    });
	      });
	      $("#newsletter-popup").on('shopify:block:deselect', function(){
	      	$('#newsletter_popup').modal('hide');
	      });
	      if (style == 'delay'){
	        AT_Main.newsletterPopupDelayAction();
	      }

	      else if (style == 'exit-intent'){
	        AT_Main.exitIntent();
	      }

	      else{
	        jQuery(window).scroll(function() {
	          let scroll_position = jQuery("#newsletter-popup").data('scroll');
	          let newsletter_st = jQuery(this).scrollTop();

	          if (newsletter_st > scroll_position ) {
	            AT_Main.newsletterPopupAction();
	          }
	        });
	      }

	      jQuery('.np-close').on('click',function (e) {
	        $('#newsletter_popup').modal('hide');
	      })
	    }
	    else {return ;}
	}

	,newsletterCoupon: function(){ // Show coupon code when subscribe newsletter
		let platform = $('#newsletter-popup').data('platform');
		if($('#newsletter-popup').find('.coupon-placeholder').length > 0) {
			if (platform == 'mailchimp') {
				jQuery('#mc-button').on('click', function (event) {
			      if (event) event.preventDefault()
			      let $form = $('#mc-form');

			      jQuery.ajax({
			        type: 'POST',
			        url: $form.attr('action'),
			        data: $form.serialize(),
			        cache: false,
			        dataType: 'json',
			        contentType: 'application/json; charset=utf-8',
			        error: function (err) { alert('Could not connect to the registration server. Please try again later.') },
			        success: function (data) {
			          jQuery('.text-box-image').hide();
			          jQuery('.subscribe-result').show();
			          jQuery('.newsletter-popup-content').removeClass('block-image-true').addClass('block-image-false');
			        }
			      })
			    })
			}
			else {
				KlaviyoSubscribe.attachToForms('#mc-form', {
				 	success: function ($form) {
				 		//console.log('success')
				 		jQuery('.text-box-image').hide();
				        jQuery('.subscribe-result').show();
				        jQuery('.newsletter-popup-content').removeClass('block-image-true').addClass('block-image-false');
				 	}
				});	
			}

			jQuery('.btn-copy').on('click',function (e) {
			    var _temp = $('<input>');
			    $("body").append(_temp);
			    _temp.val($('#mycode').text()).select();
			    document.execCommand("copy");
			    _temp.remove();
			    alert('Copied!');
		    })	
		}    
	}


	,init : function(){
      
      	if( typeof _bc_config == 'undefined' ){
           	console.log( " _bc_config is undefined " );
           	return ;
		}

        this.stickMenu();
		this.toTopButton();
      	this.toggleVerticalMenu();
      	this.toggleCartSidebar();
      	this.toggleFilterSidebar();
      	this.parallaxIt();
      	this.handleGridList();
      	this.effectNavigation();
        this.fixButton();
		this.menuOnMobile();
		this.handleMenuMultiLine();
		this.fixTitle();
		this.filterCatalog();
        this.swatch();
      	this.switchImgProduct();
      	this.refreshImage();
				// this.slickProductPage();
		this.swatch_product_image();	
		this.megamenuWithTabs();	
		this.fixlayoutCustomSectionImage();
		this.toggleDropdownVerticalMenu();
		this.width_Nopadding();
		this.currencies_translate_popup();
		this.newsletterPopup();		
	}
}


/* Handle when window resize */
jQuery(window).resize(function() {
    
    /* Fakecrop */
    if(AT_Main.checkLayout() != 1){
        setTimeout(function(){
        	AT_Main.scareScreen();
        },1000)
    }

	/*Reset Page when fixNoScroll had called before*/
	AT_Main.fixReturnScroll();
	AT_Main.width_Nopadding();
	if(AT_Main.checkLayout() != 1 && jQuery('.menu-mobile').hasClass('opened'))
		jQuery("#page-body").trigger('click');
     	
});
      
jQuery(document).ready(function($) {
	AT_Main.init();
	if($('body').hasClass('templateCart') && $('body').find('.terms-conditions').length > 0){
		AT_Main.termsAndConditions();
	}
  
  	/* Fakecrop */
    if(AT_Main.checkLayout() != 1){
        AT_Main.scareScreen();
	}	
});

$(window).load(function() {
	// setTimeout(function(){
		var body= $('#body-content'),
		bodyTop= body.offset().top;
		$(window).scroll(function() {
			AT_Main.smoothBody(bodyTop);	
		});
		
	// },500)

	//$('body').addClass('layout_loaded')
		//AT_Main.slickProductPage();
	
})
                        
