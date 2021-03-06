// JavaScript Document
// _________________________ TOOLTIP _______________________________________________________
	var tooltip=function(){
	var id = 'tt';
	var top = 3;
	var left = 3;
	var maxw = 250;
	var speed = 10;
	var timer = 20;
	var endalpha = 85;
	var alpha = 0;
	var tt,c,h;
	var ie = document.all ? true : false;
	return {
    	show:function(v,w) {
		/**_____Esto es lo que tenemos oculto en el html:
				<div id="tt" style="opacity: 0; display: none; width: 250px; top: 361px; left: 739px;">
				<div id="ttcont">Introduzca su dni sin letra, por ejemplo 25371436</div>
				</div>**/
        if(tt == null) {
        	tt = document.createElement('div');
            tt.setAttribute('id',id);
            c = document.createElement('div');
            c.setAttribute('id',id + 'cont');
            tt.appendChild(c);
            document.body.appendChild(tt);
            tt.style.opacity = 0;
            tt.style.filter = 'alpha(opacity=0)';
            document.onmousemove = this.pos;                
				}
					tt.style.display = 'block';
        	c.innerHTML = v;
        	tt.style.width = w ? w + 'px' : 'auto';
        	if(!w && ie){
            tt.style.width = tt.offsetWidth;
        	}
        	if(tt.offsetWidth > maxw) {tt.style.width = maxw + 'px'}
        	h = parseInt(tt.offsetHeight) + top;
          clearInterval(tt.timer);
          tt.timer = setInterval(function(){tooltip.fade(1)},timer);
					setTimeout(tooltip.hide,10000);
        },
        pos:function(e){
            var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
            var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
            tt.style.top = (u - h) + 'px';
            tt.style.left = (l + left) + 'px';
        },
        fade:function(d){
            var a = alpha;
            if((a != endalpha && d == 1) || (a != 0 && d == -1)){
                var i = speed;
                if(endalpha - a < speed && d == 1) {
                    i = endalpha - a;
                } else if(alpha < speed && d == -1) {
                    i = a;
                }
                alpha = a + (i * d);
                tt.style.opacity = alpha * .01;
                tt.style.filter = 'alpha(opacity=' + alpha + ')';
            } else {
                clearInterval(tt.timer);
                if(d == -1) { tt.style.display = 'none' }
            }
        },
        hide:function(){
            if(tt){
                clearInterval(tt.timer);
                tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
            }
        } // end show
		
    }; // end return
}();
