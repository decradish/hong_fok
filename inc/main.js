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

        fnScroll('.p:visible');
    });

    var iCurrentMobile = 0;
    $('.content_wrapper h2').click(function(){
		winWidth = $(window).width();

    	if(winWidth < 768){
    		iCurrentMobile = $('.content_wrapper h2').index(this);

    		fnTab(iCurrentMobile);
    	}
    });

    /**********************************
    @ for Properties page right content function
    ***********************************/
    //for custom scroll function
    fnScroll('.p:visible');
    $(window).resize(function() {
      fnScroll('.p:visible');
    });

    $('h5').click(function(){
        var oThis = $(this);
        oThis.closest('.p').find('h5').hide();
        oThis.closest('.p').find('table.contact_table.current').removeClass('current');
        oThis.nextAll('table.contact_table:first').addClass('current');

        $('.see_all').hide();
        $('.h2_content').show();

        fnScroll('.p:visible');
    });

    $('h2').delegate(".see_list, .see_all", "click", function(){
        var oThis   = $(this);
        var oTabBox = oThis.closest('.tab_box');

        if(oThis.hasClass('see_all')){
            oThis
                .text('See List')
                .removeClass('see_all').addClass('see_list');

            oTabBox.find('table.contact_table').addClass('current');
            oTabBox.find('h5').hide();
        }else{
            oThis
                .text('See All')
                .removeClass('see_list').addClass('see_all');

            oTabBox.find('table.contact_table.current').removeClass('current');
            oTabBox.find('h5').show();
        }

        fnScroll('.p:visible');
    });

    $('.list_icon').click(function(){
        var oThis   = $(this);
        var oTabBox = oThis.closest('.tab_box');

        $('.see_all').show();
        $('.h2_content').hide();

        oTabBox.find('table.contact_table.current').removeClass('current');
        oTabBox.find('h5').show();

        fnScroll('.p:visible');
    });

    $('.pre_icon, .next_icon').click(function(){
        fnBuildingShow(this);
        fnScroll('.p:visible');
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

function fnBuildingShow(obj){
    var oThis   = $(obj);
    var oTabBox = oThis.closest('.tab_box');
    var iAll    = oTabBox.find('table.contact_table').length - 1;
    var idx     = oTabBox.find('table.contact_table').index($('table.contact_table:visible'));

    if(oThis.hasClass('next_icon')){
        idx ++;
        if(idx > iAll){
            idx = 0;
        }
    }
    if(oThis.hasClass('pre_icon')){
        idx --;
        if(idx < 0){
            idx = iAll;
        }
    }

    oTabBox.find('table.contact_table.current').removeClass('current');
    oTabBox.find('table.contact_table:eq('+idx+')').addClass('current');

}

//Scroll function
var apis = [];
function fuDestroyScroll(){
    if (apis.length) {
        $.each(apis, function(i){
            this.destroy();
        });
        apis = [];
    }
}
function fnScroll(obj){
    if(!bro.webkit && winWidth >= 768){
        fuDestroyScroll();

        // Loop over each scrollpane individually so we can
        // save a reference to each api object.
        $(obj).each(function(){
            apis.push($(this).jScrollPane().data().jsp);
        });
    }
}