function loadYa(file) {
			alert(file);
			$("#preloader").fadeIn("fast"); //hide preloader 
			$.ajax({ type: "GET", url: file, dataType: "xml", cache:false,
			/*______________ ON SUCCESS _______________________________________*/
			success: function(xmlDoc, status) {
				// The SUCCESS EVENT means that the xml document came down from the server AND got parsed successfully
				// using the browser's own xml parsing caps.
				processXMLDoc( xmlDoc );
				// _____ 	 TIPO  LISTENING _____
				if (tipo=='Listening') {
					$("ul.herramientas").css('display','none');
					$('#one').ContentSlider({ width : '900px', height : '450px', speed : 800, easing : 'easeInOutBack', tipo:tipo, 
					setAutoStart:setAutoStart, clearSetCrono:clearSetCrono }); // tenï¿½a height: '400px'			 
				}
				// _____ 	 TIPO  NORMAL _____
				else { 
					$("ul.herramientas").css('display','block');
					$('#one').ContentSlider({ width : '900px', height : '950px', speed : 800, easing : 'easeInOutBack', tipo:tipo }); 
				}
				/*$("a#fin").fancybox({
					onStart : function() { 
					var ok=window.confirm('No ha terminado todas las preguntas, ï¿½Desea continuar?');
					return ok; },
					onCancel : function() { alert('cancelado'); 
					},
					onComplete : function() { // ocurre despuï¿½s de cargarse el cuadro de diï¿½logo fancybox 
					var c = [];
					//$('#one').hola();
					//$('#checkboxForm :checkbox:checked').each(function () {	c.push($(this).val()); });
					//$('#checkboxStatus').html('Checked ' + c.join(', ') + '.').show();
					alert('Completed!'); 
					},
					onCleanup : function() { return window.confirm('Close?'); },
					onClosed : function() { alert('Closed!'); }
				});
				*/ 
				// Create pagination element with options from form
				optInit = getOptionsFromForm();
				$("#Pagination").pagination(totalPreguntas+2, optInit);
					// Event Handler for for butto
					//$("#setoptions").click(function(){
					//var opt = getOptionsFromForm();
					// Re-create pagination content with new parameters
					//$("#Pagination").pagination(totalPreguntas, opt);
					//}); 
					// IE gets very upset when the mime-type of the document that
					// gets passed down isn't text/xml. If you are missing the text/xml header
						// apparently the xml parse fails, and in IE you don't get to execute this function AT ALL.
			},
			/*______________ ON COMPLETE _____________________________________*/
			complete: function( xhr, status ) {
				//alert( "COMPLETE.  You got:\n\n" + xhr.responseText ) ;
					// si hay error
						if( status == 'parsererror' ) {
							alert( "There was a PARSERERROR.  Luckily, we know how to fix that.\n\n" +
										 "The complete server response text was " + xhr.responseText ) ;
							xmlDoc = null;
							// Create the xml document from the responseText string.
							// This uses the w3schools method.
							// see also
							if( window.DOMParser ) {
								parser=new DOMParser();
								xmlDoc=parser.parseFromString( xhr.responseText,"text/xml" ) ;
							}
							else { // Internet Explorer
								xmlDoc=new ActiveXObject( "Microsoft.XMLDOM" ) ;
								xmlDoc.async = "false" ;
								xmlDoc.loadXML( xhr.responseText ) ;
							}
							$( '#response' ).append( '<p>Server status<br>complete event/xmlDoc: ' + xmlDoc + '</p>' ) ;
							$( '#response' ).append( '<p>complete event/status: ' + status + '</p>' ) ;
							//processXMLDoc( xmlDoc ) ;
						} // end parseerror
						if ($.browser.mozilla) $("#btnSalir").css("visibility", "hidden");
						$("#preloader").fadeOut("fast"); //hide preloader
    			},
				/*______________ ON ERROR ________________________________________*/
				error: function( xhr, status, error ) {
					alert( 'ERROR: ' + status ) ;
					alert( xhr.responseText ) ;
				}
			}); // end ajax
		} // end loadYa