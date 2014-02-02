/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.2
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 // Recibimos:
        function getOptionsFromForm(){
        var opt = {callback: pageselectCallback, finTest: notYetFinished, showPagination: showPagination, tipo:tipo, setCronom:setCronom};
				opt['items_per_page']=1;
				opt['num_display_entries']=10;
				opt['num_edge_entries']=2;
				opt['prev_text']="<";
				opt['next_text']=">";
        // Avoid html injections in this app
        var htmlspecialchars ={ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;"}
        $.each(htmlspecialchars, function(k,v){
          opt.prev_text = opt.prev_text.replace(k,v);
          opt.next_text = opt.next_text.replace(k,v);
        })
        return opt;
	      }
				optInit = getOptionsFromForm();
        $("#Pagination").pagination(totalPreguntas+2, optInit);
 */
jQuery.fn.pagination = function(maxentries, opts){
	opts = jQuery.extend({
		target:"one",
		items_per_page:8,
		num_display_entries:8,
		current_page:0,
		num_edge_entries:0,
		link_to:"#",
		prev_text:"Prev",
		next_text:"Next",
		ellipse_text:"...",
		prev_show_always:true,
		next_show_always:true,
		callback:function(){return false;},
		showPagination:function(n) {return false;},
		finTest:function(){return false;},
		estaVisitada:function(page_id) { return false; },
		estaRespondida:function(page_id) { return false; },
		alMenosUnaVezReproducida:function(page_id) { return false; },
		tipo:tipo,
		delayedAlert:function() {return false;}
	},opts||{});
	
	return this.each(function() {
		/*** Calculate the maximum number of pages */
		function numPages() {
			//return maxentries; // se recibe com parámetro totpreguntas+2
			return Math.ceil(maxentries/opts.items_per_page);
		}
		/** Calculate start and end point of pagination links depending on current_page and num_display_entries.
		 *  @return {Array} */
		function getInterval()  { // imaginamos 10 preguntas en el exámen
			var ne_half = Math.ceil(opts.num_display_entries/2); // devuelve 5
			var np = numPages(); // devuelve totpreguntas+2
			var upper_limit = np-opts.num_display_entries; // 12-10=2
			var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
			var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display_entries, np);
			//alert("np="+np+"\n"+"start="+start+" end= "+end); // devuelve 0, 10 ó 3-13 si por ejemplo pulse el 8
			return [start,end];
		}
		
		var fin =$("body").find("a#fin");
		//fin.bind('click', function(e) { });
		//var ya=0;
		/**This is the event handling function for the pagination links. 
		 * @param {int} page_id The new page number */
		function pageSelected(page_id, evt){
			current_page = page_id;
			//alert(ok+" numpage= "+page_id);
			var idw= $('#slider').attr('id');
			var id= $('#Pagination').attr('id');
			//var eok=window.confirm(page_id);
			//alert(current_page);
			
			//$('#slider').ContentSlider.moveSlider2();
			//$(".cs_slider").css("left", "-2700px");
			//var thisInstance = this.attr('id');
			//var butt = $('#one').find(".cs_rightBtn");
			//alert(butt.css('styleFloat'));
			//$("body").find('#one').moveSlider('left', butt, 2);
		
 			// sigue sin funcionar
			
			//var e = $('#'+thisInstance);//+' .cs_leftBtn');
			//alert(id);
			//$('#one').moverA();
			//*[@id="slider"]
				 /*$('#one').find('.rightBtn')
          .siblings('.cs_wrapper')
            .children('.cs_slider')
              .animate({ 'left':-1800+'px' }, o.speed, o.easing, function() {
                inuse=false;
              });*/
			//$('#slider').animate({ 'left':-1800+'px' }, o.speed, o.easing, function() {});
			
			//$("body").prepend("<h3>" + MouseOver+ "</h3><span>"+page_id+"</span>");
			//var currentPage = $('#Pagination').find(".current");
			//alert("currentPage: "+currentPage[1].innerHTML+"\nPageSelected= "+current_page);
			//if (page_id==0) { alert("pulso inicio"); }

			var v=opts.finTest(); // todas las reguntas han sido respondidas????
			if ( v && (page_id==numPages()-1)) {
				
				var ok=checkFinished();
				
				if (ok) {
				// ____________________ USUARIO PULSÓ FIN PERO TODAVÍA QUEDAN PREGUNTAS Y DECIDE FINALIZAR _________
					drawLinks(); // ahora se dibuja el current
					$('#one').find('.controller').click();
					// esconde la barra de paginación PARA SIEMPRE, YA NO PODEMOS VOLVER, SÓLO GUARDAR
					opts.showPagination(0); 
				} //alert("notYetFinished="+v);
				else {
				// ____________________ USUARIO PULSÓ FIN PERO TODAVÍA QUEDAN PREGUNTAS ______________________________
				// ____________________ NO HACEMOS NADA ______________________________________________________________
				} //fin.click();
			}
			// ______________________ USUARIO PULSÓ cualquier slide excepto la FIN _________________________________
			else {
				
				//alert($(document).arrRespondidas[page_id]);
				opts.showPagination(0); // esconde la barra de paginación
				drawLinks(); // ahora se dibuja el current
				$('#one').find('.controller').click(); // esto dispara la slide actual y siempre la siguiente	
				// Si queremos poner un tiempo a cada lide de TEXTO, aquí lo podemo hacer
				if ((opts.tipo=='Textos') && (tipo=="Textos")) {opts.showPagination(1);
					//alert("tipo= "+tipo+ "\n opt.tipo="+opts.tipo);				
					// OJO tipo="READING COMPREHENSION TEXTS" y opts.tipo=Textos
				}

				/*if ((opts.tipo=='Composition') && (tipo=="Composition")) {
					opts.showPagination(1);}*/
				// opts.setCrono();	esto lo haré al terminar el mp3, que de de tiempo variable
				
				if (estaVisitada(current_page))  {
					opts.showPagination(1);}
				//if (opts.tipo=='Listening') { if (opts.alMenosUnaVezReproducida(current_page)) opts.showPagination(1); }
			}
			if (current_page==0) { alert("Inicio del ejercicio"); opts.showPagination(1); }
			//if (current_page==31) { opts.showPagination(0); }			
				
			
			//$("body").find('#Pagination').find('.current').click();
			//$("body").find('#one').update('visible');
			
			/*var continuePropagation = opts.callback(page_id, panel);
			if (!continuePropagation) {
				if (evt.stopPropagation) { evt.stopPropagation(); }
				else { evt.cancelBubble = true; }
			}
			return continuePropagation;*/
		}
		//_____________________________________ DRAWLINKS ___________________________________________
		/** This function inserts the pagination links into the container element */
		function drawLinks() {
			//if (ya==0) {
			panel.empty();//}
			var interval = getInterval();
			var np = numPages();
			//alert("num pages="+np); // devuelve 20
			// This helper function returns a handler function that calls pageSelected with the right page_id
			var getClickHandler = function(page_id) { 
				return function(evt) {return pageSelected(page_id,evt); } 
			}
			
			//___________________________________ APPENDITEM___________________________________________
			// Helper function for generating a single link (or a span tag if it's the current page)
			var appendItem = function(page_id, appendopts) {//, fueRespondida) {
				//fueRespondida=
				page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
				var texto=(page_id==np-1)?String('FIN'):
				((page_id==0)?String('INICIO'):Number(page_id)); //ESTO FUNCIONA pero el link de FIN NO, pq no es un número
				
				appendopts = jQuery.extend({text:texto, classes:""}, appendopts||{});

				var r="current";
				//if (estaRespondida(current_page)) {r="respondido";}
				//if (opts.estaRespondida(page_id)) { r="respondido"; }
				if (page_id == current_page) {  // <span class="current">2</span>
					var lnk = jQuery("<span class='"+r+"'>"+(appendopts.text)+"</span>"); 
				}
				else { // reemplaza __id__ por #
					var lnk;
					if (page_id==numPages()-1) { lnk = jQuery("<a id='"+"fin"+"'>"+(appendopts.text)+"</a>") }
					else {
						if (estaRespondida(page_id) && appendopts.classes!="next" && appendopts.classes!="prev") {
							r="resp";} else {r="";}
						lnk = jQuery("<a class='"+r+"'>"+(appendopts.text)+"</a>") 
					} // <a href="#">3</a>
					lnk.bind("click", getClickHandler(page_id))
					lnk.attr('href', opts.link_to.replace(/__id__/,page_id)); // reemplaza # por 
					// .unbind("mouseout", getClickHandler(page_id))
				}
				if (appendopts.classes) { lnk.addClass(appendopts.classes); }
				//if (ya==0) {
				panel.append(lnk);//}
				
			} // end appenditem
			
			//___________________________________ GENERATE LINKS _______________________________________
			// Generate "Previous"-Link
			if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
									// a donde ir  , Anterior           , bordes+text en gris y background en blanco
				appendItem(current_page-1,{text:opts.prev_text, classes:"prev"});
			}
			//________________ GENERATE ___________________________________________
			// Generate starting points, por ejemplo del 0 1 2 3.........23 si tuviésemos 22 preguntas
			//if (ya==0) {
			if (interval[0] > 0 && opts.num_edge_entries > 0)	{
				var end = Math.min(opts.num_edge_entries, interval[0]);
				for(var i=0; i<end; i++) {	appendItem(i); }
				// ahora dibuja los ...
				if(opts.num_edge_entries < interval[0] && opts.ellipse_text) {
					jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
			}
			// Generate interval links que están en medio!!!!
			for(var i=interval[0]; i<interval[1]; i++) { appendItem(i); }
			// Generate ending points
			if (interval[1] < np && opts.num_edge_entries > 0) {
				if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text) {
					jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
				var begin = Math.max(np-opts.num_edge_entries, interval[1]);
				for(var i=begin; i<np; i++) { appendItem(i); }
			}
			// Generate "Next"-Link
			if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
				appendItem(current_page+1,{text:opts.next_text, classes:"next"});
			}	
			//} // end ya
		} // end drawlinks
		//_____________________________________________________________________________________
		// Extract current_page from options
		var current_page = opts.current_page;
		// Create a sane value for maxentries and items_per_page
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
		
		// Store DOM element for easy access from all inner functions
		var panel = jQuery(this);
		
		// Attach control functions to the DOM element 
		this.selectPage = function(page_id) { pageSelected(page_id);}
		this.prevPage = function() { if (current_page > 0) { pageSelected(current_page - 1); return true; } else { return false; } }
		this.nextPage = function() { if(current_page < numPages()-1) { pageSelected(current_page+1); return true; } else { return false;}
		}
		// When all initialisation is done, draw the links
		drawLinks();
		//ya=1;
    // call callback function
    //opts.callback(current_page, this);
	});
}


