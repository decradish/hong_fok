/*******************************************************
@ This JavaScript file is created
@ For     : Hong Fok
@ On      : 8th Oct 2012
@ By      : Liu Kangning
@ QQ      : 410532598
@ Email   : liukangning@gmail.com
@ Github  : https://github.com/decradish
********************************************************/

var winWidth = $(window).width();
var bro      = $.browser;

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

    $('.nav li.has_child > a').click(function(){
		winWidth = $(window).width();

    	if(winWidth <= 768 && (!bro.msie || (bro.msie && bro.version >= 9)) ){
	    	if($(this).nextAll('ul').css('display') == 'none'){
	    		$('.clicked').removeClass('clicked');
				$('.nav li ul').hide();
				$(this)
					.parent().addClass('clicked')
					.children('ul').show();
	    	}else{
				$(this)
					.parent().removeClass('clicked')
					.children('ul').hide();
			}
		}
    });

    /**********************************
    @ Functions for tab in all subpages
    ***********************************/
    var sUrlPar = location.search;
    var sPar    = sUrlPar.substr(1);
    fnTab(sPar);

    var iCurrent = 0;
    $('.ctt_tab li').click(function(){
		winWidth = $(window).width();

    	if(winWidth >= 768 || (bro.msie && bro.version < 9) ){
    		iCurrent = $('.ctt_tab li').index(this);

            fnTab(iCurrent);
    	}
    });

    var iCurrentMobile = 0;
    $('.content_wrapper h2').click(function(){
		winWidth = $(window).width();

    	if(winWidth < 768){
    		iCurrentMobile = $('.content_wrapper h2').index(this);

    		fnTab(iCurrentMobile);
    	}
    });
});

function fnTab(key){
    if( isNaN(key) ){
        key = 0;
    }

    $('.ctt_tab li.current, .tab_box.current').removeClass('current');
    $('.ctt_tab li').eq(key).addClass('current');
    $('.tab_box').eq(key).addClass('current');
}