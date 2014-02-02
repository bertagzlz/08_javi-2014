/*
 * Copyright (c) 2007 Josh Bush (digitalbush.com)
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE. 
 */
 
/*
 * Progress Bar Plugin for jQuery
 * Version: Alpha 2
 * Release: 2007-02-26
 */ 
(function($) {	
	//Main Method
	$.fn.reportprogress = function(val,maxVal) {			
		var max=100;
		if(maxVal)
			max=maxVal;
		return this.each(
			function(){		
				var div=$(this);
				//var innerdiv=div.find(".progress");
				var innerdiv=div;//div.find('#bgProgressBarTime');
				var width=Math.round(val/max*100);				
				if(innerdiv.length!=1){						
					//innerdiv=$("<div class='progress'></div>");					
					var progressBarTime=$('#progressBarTime');
					var txtTime=progressBarTime.find('#txtTime');
					
					progressBarTime.css('width',width+'%');
					progressBarTime.attr('aria-valuenow',width);
					//div.append("<div class='text'>&nbsp;</div>");
					txtTime.html(width+'%');
					//$("<span class='sr-only'>&nbsp;</span>").css("width",div.width()).appendTo(innerdiv);					
					//div.append(innerdiv);					
				}
				//var width=Math.round(val/max*100);
				//innerdiv.css("width",width+"%");	
				//div.find(".text").html(width+" %");
			}
		);
	};
})(jQuery);

/* ___ ESTO ES LO QUE TENGO _____ */
/* <div class="progress" id="bgProgressBarTime" style="height:5px; margin-bottom:5px; width:50%">
        	<div class="progress-bar" id="progressBarTime" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
          	<span class="sr-only" id="txtTime">60% Complete</span>
           </div>
        </div>*/
