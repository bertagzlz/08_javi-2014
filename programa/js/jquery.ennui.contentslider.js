(function($) {
  $.fn.ContentSlider = function(options) {
    var defaults = {
      leftInitBtn : 'programa/images/cs_leftInitImg.jpg',
      rightEndBtn : 'programa/images/cs_rightEndImg.jpg',
			leftBtn : 'programa/images/cs_leftImg.jpg',
      rightBtn : 'programa/images/cs_rightImg.jpg',
      width : '900px',
      height : '400px',
			heightInit : '400px',
      speed : 400,
      easing : 'easeOutQuad',
      textResize : false,
      IE_h2 : '26px',
      IE_p : '11px',
			tipo:'Textos',
			setAutoStart:function(){return false;},
			clearSetCrono:function(){return false;}
    }
	
	var defaultWidth = defaults.width;
	var o = $.extend(defaults, options);
	if (o.tipo=='Listening') o.heightInit=o.height;
  var w = parseInt(o.width); //900
  // devuelve 11 con 9 preguntas + el de introducción + el del final
	var n = this.children('.cs_wrapper').children('.cs_slider').children('.cs_article').length;
	// Minimum left value
	var x = -w*(n-1); 
		
	//alert("n= "+n+ " x= "+x); // n=12 x=-9900px;
	//Veamos con 9 preguntas instead of 10
	// n=11 x=-9000px, parece que va bien
		
  var p = parseInt(o.width)/parseInt(defaultWidth); // supongo que vale 1
  var thisInstance = this.attr('id');
  var inuse = false; // Prevents colliding animations
	var quedan=n; //-parseInt(this.children('.cs_wrapper').children('.cs_slider').css('left'));
	
	//____________________________ MOVE SLIDER _______________________________________
  	// _____________recibimos:  moveSlider('left', rightBtn);
	function moveSlider(d, b, cuantos) {
		// en cuanto me muevo debo abandonar el posible timer que hubiése en ese slide
		defaults.clearSetCrono(); 
		if (b==undefined) b=rightBtn;
		 
		var l = parseInt(b.siblings('.cs_wrapper').children('.cs_slider').css('left')); // cuántos  que desplazar
		//alert("botones right= " +String(l)); // 0 -900 -1800.....-9900

		//alert(quedan); 
		//QUEDAN ES SIEMPRE 4,3,2,1 EN CASO DE dos PREGUNTAS+SLIDE INICIAL+FINAL
		quedan-=cuantos;

		if (quedan==n) { // n y 1 son los primero y último slides
			$('#'+thisInstance)
	      // Set the width and height of the div to the defined size
	      .css({ width:o.width, height:o.heightInit })
				
		} else if (quedan==1) { // última slide
			$("ul.herramientas").css('display','none');
			// lo quiero grande para que quepan las notas, incluido las no contestadas. Máximo 30 preguntas de dos cada una (total 60)
			if (o.tipo=='Listening') {	
				$('#'+thisInstance).height(700); 
			}
			if (o.tipo=='Textos') {			
				$('#'+thisInstance).height(700); 
			}
			// LO QUIERO PEQUEÑO PORQUE NO HAY QUE PRESENTAR NOTAS, SÓLO imprimir la composición....
			if (o.tipo=='Composition') {$('#'+thisInstance).height(o.heightInit); }
		}
		else { // CUALQUIER OTRA SLIDE
			var hOptimized;
			var ho;
			var we;
			var p;
			if (o.tipo=='Listening') {
				// Esto es lo que tengo en TE:
				//<div id="art1" class"cs_article".....style="width: 900px; height: 898.414px;"
				//<div class="container"><div class="wrap-container">
				//<div id="page-wrap1" class="page-wrap"><div class="preg">38. Pensioners....</div></div></div>
				//<div class="preg" style="font: 130%/1.25em garamond,georgia,times new roman,serif;">36. Sibling rivalry &ndash; gas pricing 
				ho=$("#art"+String(n-quedan)).find(".container").height();
				p = $("#art1").find(".container");
				//$("p:last").text( "innerHeight:" + p.innerHeight() );

				we=$("body").find("#page-wrap"+String(n-quedan)).html();
                //$("body").find("#page-wrap"+String(n-quedan))
				//.prepend($("<div>" + "question" + " : <span>" + "\n Longitud="+we.length + "</span>")); 
				heightOptimized=0.5*we.length-5E-5*Math.pow(we.length,2)+84;
				if (heightOptimized<450) {heightOptimized=450;}
				//alert("\n heightOptimized="+p.innerHeight());
				//alert("\n heightOptimized="+ho);
			} 
			else if (o.tipo=='Textos') {
				$("ul.herramientas").css('display','block');
				var f=$("body").find("#page-wrap"+String(n-quedan)).html();
				var le=parseInt(f.length);
			  	//var heightOptimized=String(714+36*le-0.303*Math.pow(le,2))+'px';
				var k=0;
				if ($.browser.msie) {k=540} else {k=440}
				heightOptimized=k+0.23*le; // y = 8E-10x4 - 1E-05x3 + 0,0453x2 - 89,128x + 65412
				//heightOptimized= 8E-10*Math.pow(le,4) - 1E-05*Math.pow(le,3) + 0.0453*Math.pow(le,2) - 89.128*le + 65412;
			}
			else if (o.tipo=='Composition') {
				//alert(o.tipo);
				var f=$("body").find("#page-wrap"+String(n-quedan)).html();
				var le=parseInt(f.length);
			  	//var heightOptimized=String(714+36*le-0.303*Math.pow(le,2))+'px';
				var k=0;
				if ($.browser.msie) {k=440} else {k=340}
				heightOptimized=1200;//k+0.23*le+500; // y = 8E-10x4 - 1E-05x3 + 0,0453x2 - 89,128x + 65412
				//heightOptimized= 8E-10*Math.pow(le,4) - 1E-05*Math.pow(le,3) + 0.0453*Math.pow(le,2) - 89.128*le + 65412;
			}

			else {}
			
			$('#'+thisInstance)
        .css({ width:o.width, height:heightOptimized })// Set the width and height of the div to the defined size
				.find('.cs_article') .css({ width:o.width, height:heightOptimized }) .end()
				// Animate the entrance of the buttons
      	.find('.cs_leftBtn') .css('opacity','0') .css('height', o.height) .hide() .end()
				.find('.cs_leftInitBtn') .css('opacity','0') .css('height', o.height) .hide() .end()
			//.find('.cs_rightBtn') .hide() .css('height', o.height) .animate({ 'width':'show' });
		}
		
		
		//if (cuantos==undefined) { cuantos=1; }
		if(isNaN(l)) { var l = 0; }
     //var m = (d=='left') ? l-cuantos*w : l+cuantos*w; // aquí es donde muevo vale -900, -1800,......-9900
		var m =l-cuantos*w; // +1 botón right significa: mover 0-1*900=-900px
		// x da siempre -9900
		if(m<=0&&m>=x) { /* TENEMOS EN HTML:<div id="one" class="contentslider">
																				<div class="cs_wrapper">
																					<div class="cs_slider" id="slider">*/
				b
          .siblings('.cs_wrapper')
            .children('.cs_slider')
              .animate({ 'left':m+'px' }, o.speed, o.easing, function() {
                inuse=false;
              });
        var left = $('#'+thisInstance+' .cs_leftBtn');
        var right = $('#'+thisInstance+' .cs_rightBtn');
				var endRight = $('#'+thisInstance+' .cs_rightEndBtn');
				var endLeft = $('#'+thisInstance+' .cs_leftInitBtn');
        if(m==0) { // la opacidad válida es 0 0 1 1 
          left.animate({ 'opacity':'0' }, o.speed, o.easing, function() { left.hide(); });
					endLeft.animate({ 'opacity':'0' }, o.speed, o.easing, function() { endLeft.hide(); });
					right.animate({ 'opacity':'0' }, o.speed, o.easing, function() { right.show(); });
					endRight.animate({ 'opacity':'0' }, o.speed, o.easing, function() { endRight.show(); });
				} else if (m==x) { // la opacidad válida es 1 0 0 1 
          left.show().animate({ 'opacity':'0' }, { duration:o.speed, easing:o.easing });
          right.animate({ 'opacity':'0' }, o.speed, o.easing, function() { right.hide(); });
          endRight.animate({ 'opacity':'0' }, o.speed, o.easing, function() { endRight.hide(); });
					endLeft.animate({ 'opacity':'0' }, o.speed, o.easing, function() { endLeft.show(); });
        }	else { // la opacidad válida es 1 1 1 1 
					left.animate({ 'opacity':'0' }, o.speed, o.easing, function() { left.show(); });
					right.animate({ 'opacity':'0' }, o.speed, o.easing, function() { right.show(); });
          endRight.animate({ 'opacity':'0' }, o.speed, o.easing, function() { endRight.show(); });
          endLeft.animate({ 'opacity':'0' }, o.speed, o.easing, function() { endLeft.show(); });
				}
      }
    } // end moveSlider
    // Safari and IE don't seem to like the CSS used to vertically center the buttons, so we'll force it with this function
		function vCenterBtns(b) {
      var mid = parseInt(o.heightInit)/2;
      b
        // coloco la imágen en el medio en altura
				.find('.cs_leftBtn img').css({ 'top':mid+'px', 'padding':0 }).end()
        .find('.cs_rightBtn img').css({ 'top':mid+'px', 'padding':0 });
    }
		/**___________________________________ PARA CADA SLIDER DEL DOCUMENTO, NORMALMENTE UNO _____________________**/
    return this.each(function() {
      $(this)
        // Set the width and height of the div to the defined size
        .css({ width:o.width, height:o.heightInit })
        // Add the buttons to move left and right, leftInit, rightEnd, and controller
				.append('<a href="#" class="cs_leftInitBtn"><img src="'+o.leftInitBtn+'" /></a>')
				.append('<a href="#" class="cs_leftBtn"><img src="'+o.leftBtn+'" /></a>')				
				.append('<a href="#" class="cs_rightEndBtn"><img src="'+o.rightEndBtn+'" /></a>')
				.append('<a href="#" class="cs_rightBtn"><img src="'+o.rightBtn+'" /></a>')
				.append('<a href="#" class="controller"></a>')
     		// Dig down to the article div elements, Set the width and height of the div to the defined size
				// Animate the entrance of the buttons
        .find('.cs_article') .css({ width:o.width, height:o.heightInit }) .end()
        .find('.cs_leftBtn') .css('opacity','0') .css('height', o.heightInit) .hide() .end()
				.find('.cs_leftInitBtn') .css('opacity','0') .css('height', o.heightInit) .hide() .end()
				.find('.cs_rightBtn') .css('opacity','0') .css('height', o.heightInit) .hide() .end()
				.find('.cs_rightEndBtn') .css('opacity','0') .css('height', o.heightInit) .hide() .end()
				//.find('.cs_rightBtn') .hide() .css('height', o.heightInit) .animate({ 'width':'show' });
				/*.find('#art0') .css({ width:o.width, height:o.heightInit }) .end()
        		.find('.cs_leftBtn') .css('opacity','0') .css('height', o.heightInit) .hide() .end()
				.find('.cs_leftInitBtn') .css('opacity','0') .css('height', o.heightInit) .hide()
				.find('.cs_rightEndBtn') .css('opacity','0') .css('height', o.heightInit) .hide()
				.find('.cs_rightBtn') .hide() .css('height', o.heightInit) .animate({ 'width':'show' });
				*/
				// Resize the font to match the bounding box
				if(o.textResize===true) {
					var h2FontSize = $(this).find('h2').css('font-size');
					var pFontSize = $(this).find('p').css('font-size');
					$.each(jQuery.browser, function(i) {
						if($.browser.msie) { h2FontSize = o.IE_h2; pFontSize = o.IE_p; }
					});
					$(this).find('h2').css({ 'font-size' : parseFloat(h2FontSize)*p+'px', 'margin-left' : '66%' });
					$(this).find('p').css({ 'font-size' : parseFloat(pFontSize)*p+'px', 'margin-left' : '66%' });
					$(this).find('.readmore').css({ 'font-size' : parseFloat(pFontSize)*p+'px', 'margin-left' : '66%' });
				}		
			/*$(this).bind('moverA', function() {
        moveSlider2();
        return false; // Keep the link from firing
      });*/
			/*function update(b) {
				$('#Pagination').css("visibility",b);
				//Finds all children of the element with id "main" which is yellow.
				//$("#main > *").css("border", "3px double red");
				//
				//alert("updating");
				var elementCount = $('#Pagination').find("a").css("border","1px solid green").length;
				var currents = $('#Pagination').find(".current").length; // devuelve 2 elementos
				//var currentPage = $('#Pagination').find(".current");
				//alert(currentPage[0].innerHTML); // devuelve anterior
				//var elementCount = $('#Pagination').find("a").length;
				//var elementCount = $('div.pagination').find("a").length;
				//$("body").prepend("<h3>" + currents + " elements found</h3>");
				// alert($("body").find('#Pagination').attr('id')); // good
				//$("body").find('#Pagination').css("border","2px solid red");
				//$("body").find('#Pagination').css('background-color', 'red');
				$("body").find('#Pagination').find("a", ".current").bind('mouseover', function(e) {
					var currentPage = $('#Pagination').find(".current");
					alert("mouseover sobre "+  e.target.nodeName);
					var d=parseInt(e.target.innerHTML)-parseInt(currentPage[1].innerHTML);
					});
				//$('> pagination.a').css("border", "3px double red");
			}*/		
			/*$("body").find('#ege').bind('mouseover', function(e) {
				//alert("click en el bot&oacute;n derecho para empezar");
			});
			$("body").find('#ege').bind('mouseout', function(e) {
			});*/
			/*$('#Pagination').css("visibility","visible");
			$("body").find('#Pagination').find("a").live('click', function(e) {
					var currentPage = $('#Pagination').find(".current");
					var d=parseInt(e.target.innerHTML)-parseInt(currentPage[1].innerHTML);
					//alert("Moviendonos: "+d);
					if (d>0) { moveSlider('left', rightBtn, d) } else { moveSlider('right', leftBtn, d); }
				});
			*/	
			//$("body").find('#Pagination').css("visibility",'visible');
			// click sobre el slide de destino.....que ahora es el actual
			var controller = $(this).children('.controller');
    	controller.bind('click', function(e) {
				var currPage =$("body").find('#Pagination').find(".current");
				/** en el slide 40 actual, el botón siguiente queda desactivado, y contiene:
				//<div style="visibility: visible;" class="pagination" id="Pagination">
				<a href="#" class="prev">Anterior</a>
				<a href="#">1</a><a href="#">2</a>
				<span>...</span><a href="#">31</a>
				...
				<span class="current">40</span>
				<span class="current next">Siguiente</span>
				</div>*/
				var l = $('#Pagination').find(".current").length;
				/*var s="l= "+String(l)+" currPage_0: "+currPage[0].innerHTML ;var s2=" currPage_1: " + currPage[1].innerHTML;
				alert(s);
				alert(s2);*/
				// l=2 en INICIO Y FIN
				/*	var curr1=currPage[0].innerHTML;
						var curr2=currPage[1].innerHTML;
				if (l==1) { alert("currPage="+curr1);	}
				else { if (curr1=='&lt;') { alert("currPage="+curr2);}	else { alert("currPage="+curr1); }}*/
				var x;
				if (currPage[0].innerHTML=='&lt;') { } // x=parseInt(currPage[1].innerHTML); }
				else { x=parseInt(currPage[0].innerHTML); }
				//if ((currPage[0].innerHTML=='&lt;') && (currPage[1].innerHTML=='INICIO')) alert("voy a inicio");
				// currPage[0] apunta a la página a la que queríamos ir, que ya es la actual
				// si queríamos ir a INICIO, es porque currPage=[Anterior, INICIO]
        //__________ DESHABILITO EL BOTÓN INICIO así EL Usuario NO puede volover ___________________________________________
				if (currPage[0].innerHTML=='&lt;') { x=0; } // estaba en la 8, por ejemplo, y pulsé INICIO
				
				// si queríamos ir a FIN, es porque currPage=[FIN, Siguiente], la página actual ya es FIN, aunque todavía no me he movido
				if (currPage[0].innerHTML=='FIN') { x=n-1;
				} // estaba en la 4, por ejemplo, y pulsé FIN
				var d=x-(n-quedan);
				if (d>0) { moveSlider('left', rightBtn, d) } else { moveSlider('right', leftBtn, d); }
				
				if (tipo=='Listening' && currPage[0].innerHTML!='FIN') {
					//alert($.trim(currPage[0].innerHTML)+ "tipo="+tipo); FUNCIONA BIEN:
					// devuelve 1,2,3,..............
					
					if ($.browser.mozilla)	{
						c=$.trim(currPage[0].innerHTML);
						window.setTimeout(start, 4000); 
					}
					else { var v=defaults.setAutoStart($.trim(currPage[0].innerHTML)); }
				}
        return true; // Keep the link from firing
    	}); // end controller bind click
			var c="";
			function start(){
				var v=defaults.setAutoStart(c);
				//alert("4seg has passed");
			}
		
		// _____ LEFT_BUTTON _________
		// Store a copy of the button in a variable to pass to moveSlider()
      var leftBtn = $(this).children('.cs_leftBtn');
      leftBtn.bind('click', function() {
        if(inuse===false) {
          inuse = true;
          //moveSlider('right', leftBtn, -1); // DESACTIVADO
        }
				//if (quedan==0) {update('invisible')} else {update('visible');};
        return false; // Keep the link from firing
      });
		// _____ RIGHT_BUTTON _________
    // Store a copy of the button in a variable to pass to moveSlider()
      var rightBtn = $(this).children('.cs_rightBtn');
      rightBtn.bind('click', function(e) {
        //alert(e.target);
				if(inuse===false) {
          inuse=true;
          //moveSlider('left', rightBtn, 1); // DESACTIVADO
        }
				//update('visible');
				return false; // Keep the link from firing
      });
		// _____ RIGHT_END BUTTON _________
		var rightEndBtn = $(this).children('.cs_rightEndBtn');
    rightEndBtn.bind('click', function() {
			var l = parseInt($(this).siblings('.cs_wrapper').children('.cs_slider').css('left')); // cuántos  que desplazar    
			// w es la anchura de cada slide
			// quedan es el total de slides que quedan
			//alert(quedan+parseInt(l/w));			
			if(inuse===false) {
				inuse=true;
      	//moveSlider('left', rightEndBtn, quedan-1);  // DESACTIVADO
      }
			//update('visible');
      return false; // Keep the link from firing
    });
		// _____ LEFT INIT BUTTON _________
		var leftInitBtn = $(this).children('.cs_leftInitBtn');
    leftInitBtn.bind('click', function() {
			var l = parseInt($(this).siblings('.cs_wrapper').children('.cs_slider').css('left')); // cuántos  que desplazar
			//alert("voy a desplazar "+(n-quedan));
			if(inuse===false) {
				inuse=true;
      	//moveSlider('right', leftInitBtn, -n+quedan); // DESACTIVADO
      }
			//update('invisible');
      return false; // Keep the link from firing
    });
			
    vCenterBtns($(this)); // This is a CSS fix function.
  }); // end this each function

}
})(jQuery)