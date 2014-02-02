// JavaScript Document
// _________________________ DISABLE/TEXT _______________________________________________________
	function disabletext(e){return false}
	function reEnable(){return true}
	//if the browser is IE4+
	document.onselectstart=new Function ("return false")
	//if the browser is NS6
	if (window.sidebar){document.onmousedown=disabletext; document.onclick=reEnable}
