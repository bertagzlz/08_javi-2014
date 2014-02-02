
var _LANG;
var _STR = {
	'cs' : {
		'collapse' : 'Sbalit',
		'expand' : 'Rozbalit vše'
		},
	'en' : {
		'collapse' : 'Collapse',
		'expand' : 'Expand All'
		}
	}

$(function(){

	_LANG = $('body').attr('lang');
	$('#menu').append('<li id="collapse"><a href="javascript:void()"></a></li>');
	$('#collapse a').click( function(){ $(this).blur();collapse();return false } );

	if(document.referrer.indexOf('?')==-1) {
		collapse(true);
		if (!document.location.hash) {
			$('html,body').css('overflow','hidden');
			$('h1').css('left','-300px').hide();
			$('#menu').css('left','-300px').hide();
			$('#lang-menu').css('top',0).hide();
			$('#content').fadeTo(0,0);
			var y = $('#footer').position().top;
			$('#footer').css('bottom','400px').hide();
			setTimeout( function(){ $('#lang-menu').show().animate({top:'165px'},{ duration:1000,easing:'easeOutElastic' }) }, 10 );
			setTimeout( function(){ $('h1').show().animate({left:'0'},{ duration:500,easing:'easeOutSine' }) }, 1000 );
			setTimeout( function(){ $('#content').fadeTo(4000,1) }, 1500 );
			setTimeout( function(){ $('#menu').show().animate({left:'-14px'},{ duration:200,easing:'easeOutCirc' }) }, 2000 );
			setTimeout( function(){ $('#footer').show().animate({bottom:'0'},{ duration:800,easing:'easeOutBounce' }) }, 2500 );
			setTimeout( function(){ $('html,body').css('overflow','auto') }, 3800 );
			}
		}
	else {
		collapse(false);
		if (document.location.hash) {
			var elm = $(document.location.hash).get(0);
			if (elm && elm.scrollIntoView) elm.scrollIntoView();
			}
		}
	});


var isCollapsed = true;
function collapse(on) {
	if (on==undefined) isCollapsed = !isCollapsed;
	else isCollapsed = on;
	$('a[href^=#]').parent('li').removeClass('sel');
	if (isCollapsed) {
		$('#content .chttl, #content hr').hide();
		$('.chapter').hide().find('.subchapter').hide();
		$('#collapse a').text(_STR[_LANG].expand);
		checkHash(true);
		}
	else {
		$('#content .chttl, #content hr').show();
		$('.chapter').show().find('.subchapter').show();
		$('#collapse a').text(_STR[_LANG].collapse);
		}
	fixFooter();
	}

function fixFooter() {
	$('#footer').css( { bottom:'auto',top:0 } );
	$('#footer').css( { bottom:0,top:'auto' } );
	}

var hashHash = {
	'kontakt':'part-about-contact',
	'kontakty':'part-about-contact',
	'contact':'part-about-contact',
	'contacts':'part-about-contact',
	'about':'part-about',
	'info':'part-about',
	'cenik':'part-web-price'
	}

var currentHash, hashTimerID;
var hidePhoto = false;
function checkHash(force) {
	if (!isCollapsed) return;
	if (force || document.location.hash!=currentHash) {
		currentHash = document.location.hash;
		var chID, subchID, harr;
		hash = currentHash || '#part-start';
		hash = hash.substring(1);
		if (hashHash[hash]) hash = hashHash[hash];
		harr = hash.split('-');
		if (harr.length>2) { chID = harr[0]+'-'+harr[1]; subchID = hash }
		else { chID = hash; subchID = '' }
		$('a[href^=#]').parent('li').removeClass('sel');
		$('#menu a[href=#'+chID+']').parent('li').addClass('sel');
		$('.chapter').hide().find('.subchapter').hide();
		if (subchID) {
			$('#'+chID).parent('.chapter').show().find('#'+subchID).parent('.subchapter').show();
			$('.submenu a[href=#'+subchID+']').parent('li').addClass('sel');
			}
		else {
			$('#'+chID).parent('.chapter').show().find('.subchapter:first').show().end().find('.submenu li:first').addClass('sel');
			}
		if (hash=='part-about-me' || hash=='part-about') {
			if($.browser.msie) $('h1,#footer').hide();
			else $('h1,#footer').fadeTo(100,0.1);
			hidePhoto = true;
			}
		else if (hidePhoto) {
			if($.browser.msie) $('h1,#footer').show();
			else $('h1,#footer').fadeTo(500,1);
			hidePhoto = false;
			}
		fixFooter();
		}
	hashTimerID = setTimeout( function(){checkHash()},100);
	}

