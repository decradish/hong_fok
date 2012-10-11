/*******************************************************
@ This JavaScript file is created
@ For     : Hong Fok
@ On      : 8th Oct 2012
@ By      : Liu Kangning
@ Email   : liukangning@gmail.com
@ QQ      : 410532598
********************************************************/

var winWidth = $(window).width();
var bro = $.browser;

$(function() {
	$("a").bind("focus",function(){
		if(this.blur){
			this.blur();
		}
	});

    if (window.PIE) {
        $('.rounded').each(function() {
            PIE.attach(this);
        });
    }

    $('.search_input')
	    .focus(function(){
	    	if($(this).val() == "Search"){
	    		$(this).val('');
	    	}
	    })
	    .blur(function(){
	    	if($(this).val() == ""){
	    		$(this).val('Search');
	    	}
	    });

    $('.nav li.has_child').click(function(){
		winWidth = $(window).width();

    	if(winWidth <= 768 && !bro.msie){
	    	if($(this).children('ul').css('display') == 'none'){
	    		$('.clicked').removeClass('clicked');
				$('.nav li ul').hide();
				$(this)
					.addClass('clicked')
					.children('ul').show();
	    	}else{
				$(this)
					.removeClass('clicked')
					.children('ul').hide();
			}
		}
    });

    var iCurrent = 0;
    $('.ctt_tab li').click(function(){
		winWidth = $(window).width();

    	if(winWidth >= 768 || bro.msie){
    		iCurrent = $('.ctt_tab li').index(this);
    		$('.ctt_tab li.current').removeClass('current');
    		$(this).addClass('current');

    		$('.tab_box.current').removeClass('current');
    		$('.tab_box').eq(iCurrent).addClass('current');
    	}
    });

    var iCurrentMobile = 0;
    $('.content_wrapper h2').click(function(){
		winWidth = $(window).width();

    	if(winWidth < 768){
    		iCurrentMobile = $('.content_wrapper h2').index(this);

    		$('.ctt_tab li.current').removeClass('current');
    		$('.ctt_tab li').eq(iCurrentMobile).addClass('current');

    		$('.content_wrapper .tab_box.current').removeClass('current');
    		$(this).parent().addClass('current');

    		$('.tab_box.current').removeClass('current');
    		$('.tab_box').eq(iCurrentMobile).addClass('current');
    	}
    });
});