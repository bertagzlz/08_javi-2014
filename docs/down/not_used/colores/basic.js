//--------------------------------------------- Start basic.js ---------------------------------------------

var MARGIN_WIDTH = 12;
var MARGIN_HEIGHT = 12;
var FOOTER_HEIGHT = 31;
var IS_BEST_FIT = false;

function handleUserServerResponse(action, success, errorCode, errorDescription, userJson, token) {
    var app = getFlashAppInstance();
    app.handleUserServerResponse(action, success, errorCode, errorDescription, userJson, token);
}

function addListener(win, eventName, handler) {
    if (win.addEventListener)
        win.addEventListener(eventName, handler, false);
    else if (win.attachEvent)
        win.attachEvent("on" + eventName, handler);
    else
        win["on" + eventName] = handler;
}

function openUrl(url) {
    var win = window.open(url, '_blank');
    win.focus();
    return true;
}

function openUrlNoMenu(url, vaildatePopup) {
    var popupBlocked = false;
    var screenSize = getPhysicalScreenDimensions();
    var win = window.open(url, '_blank', "resizable=yes,menubar=no,status=no,titlebar=no,toolbar=no,channelmode=yes,width=" + screenSize.width + ",height=" + screenSize.height);
    if (!win || win.closed || typeof win.closed == 'undefined') {
        popupBlocked = true;
    } else {
        win.focus();
    }
    if (vaildatePopup) {
        var app = getFlashAppInstance();
        app.popupFailure(popupBlocked);
    }
    return true;
}

function isIE() {
    return (navigator.appName.indexOf("Microsoft") != -1);
}

function getPhysicalScreenDimensions() {
    var winW = 1024, winH = 768;
    if (isIE()) {
        winW = document.body.width;
        winH = document.body.height;
    } else {
        winW = screen.width;
        winH = screen.height;
    }
    return {width: (winW ), height: (winH )};
}

function getScreenDimensions() {
    var w = 0, h = 0;
    if (!window.innerWidth) {
        //strict mode
        if (!(document.documentElement.clientWidth == 0)) {
            w = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight;
        } else { //quirks mode
            w = document.body.clientWidth;
            h = document.body.clientHeight;
        }
    } else { //w3c
        w = window.innerWidth;
        h = window.innerHeight;
    }
    return {width: (w - (2 * MARGIN_WIDTH)), height: (h - (2 * MARGIN_HEIGHT + (getFooter() ? FOOTER_HEIGHT : 0)))};
}

function getScrollOffset() {
    var x = 0,y = 0;
    if (self.pageYOffset) { // all except Explorer
        x = self.pageXOffset;
        y = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
        x = document.documentElement.scrollLeft;
        y = document.documentElement.scrollTop;
    } else if (document.body) {
        // all other Explorers
        x = document.body.scrollLeft;
        y = document.body.scrollTop;
    }
    return {x:x,y:y}
}

function getViewport() {
    var app = getFlashAppInstance();
    var dimensions = getScreenDimensions();
    var position = findFlashAppInstancePosition();
    var scroll = getScrollOffset();
    return {x:scroll.x, y:scroll.y, width:Math.min(dimensions.width - position.x, app.clientWidth), height:Math.min(dimensions.height - position.y, app.clientHeight)};
}

function findFlashAppInstancePosition() {
    return findElementPosition(getFlashAppInstance());
}

function findElementPosition(oElement) {
    if (typeof( oElement.offsetParent ) != 'undefined') {
        for (var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
            posX += oElement.offsetLeft;
            posY += oElement.offsetTop;
        }
        return {x:posX, y:posY};
    } else {
        return {x:oElement.x, y:oElement.y};
    }
}

function getScreenSize() {
    var dimensions = getScreenDimensions();
    return dimensions.width + "," + dimensions.height;
}

function setTitle(title) {
    document.title = title;
}

function getFlashAppInstance() {
    return swfobject.getObjectById("app");
}

function getFooter(){
    return document.getElementById("wixfooter");
}

function setFooterWidth(width){
    try {
        var footer = getFooter();
        if (footer){
            footer.style.width = width + "px";
        }
    } catch(e){}
}

function setSize(width, height) {

    setFooterWidth(width);

    var app = getFlashAppInstance();
    app.width = width;
    app.height = height;

    var dimensions = getScreenDimensions();
    document.body.style.marginTop = height > dimensions.height ? "8px" : "0";
}

function createStyles(autoSize, width, height){
    IS_BEST_FIT = (autoSize == "fitScreen");
    var cssText = new Array();
    cssText.push('<style type="text/css">');
    if (IS_BEST_FIT){
        cssText.push('body {overflow:hidden !important}');
    } else {
        var dimensions = getScreenDimensions();
        if (height > dimensions.height){
            cssText.push('body {margin-top:8px}');
        }
    }
    cssText.push('</style>');
    document.write(cssText.join(""));
}

//this function should call both the wix googlitics and the users (if the user have one)
function doGooglitics(fakeUrl) {
    pageTracker._trackPageview(fakeUrl);
    if (hasGoogleAnalytics) {
        pageTrackerUser._trackPageview(fakeUrl);
    }
}

//this function should call only the wix googlitics
function doGoogliticsWix(fakeUrl) {
    pageTracker._trackPageview(fakeUrl);
}

//this function should call only the user googlitics (if the user doesnt have one the function should be empty
function doGoogliticsUser(fakeUrl) {
    if (null != userGoogleAnalytics && "" != userGoogleAnalytics) {
        if (hasGoogleAnalytics) {
            pageTrackerUser._trackPageview(fakeUrl);
        }
    }
}

function gaSSDSLoad(acct) {
    var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."),
            pageTracker,
            s;
    s = document.createElement('script');
    s.src = gaJsHost + 'google-analytics.com/ga.js';
    s.type = 'text/javascript';
    s.onloadDone = false;
    function initPageTrackers() {
        pageTracker = _gat._getTracker(acct);
        pageTracker._trackPageview();

        if (hasGoogleAnalytics) {
            pageTrackerUser = _gat._getTracker(userGoogleAnalytics);
            pageTrackerUser._initData();
            pageTrackerUser._trackPageview();
        }
    }
    s.onload = function () {
        s.onloadDone = true;
        initPageTrackers();
    };
    s.onreadystatechange = function() {
        if (('loaded' === s.readyState || 'complete' === s.readyState) && !s.onloadDone) {
            s.onloadDone = true;
            initPageTrackers();
        }
    };
    document.getElementsByTagName('head')[0].appendChild(s);
}

function pageOnLoad() {
    gaSSDSLoad(wixGoogleAnalytics);
}

function pageOnResize() {
    var dimensions = getScreenDimensions();
    var app = getFlashAppInstance();
    if (app != null) {
        try {
            app.onScreenResize(dimensions.width, dimensions.height);
        } catch(e) {}
    }
    return false;
}

function setHistoryFrame(adress, additionalInfo) {
    try {
        var page_name = adress.substr(8, adress.indexOf(',') - 8);
        if (additionalInfo != null && additionalInfo.length > 0) {
            page_name = page_name + '_' + additionalInfo;
        }
        page_name = page_name + '.html';
        var ifrm = document.getElementById("historyframe");
        if (ifrm != null) {
            ifrm.src = "/siteBackHtml?adress=" + adress + '&additionalInfo=' + additionalInfo;
        }
    } catch(ex) {
        var ifrm = document.getElementById("historyframe");
        if (ifrm != null) {
            ifrm.src = "/siteBackFiles/siteBack.html?adress=" + adress + '&additionalInfo=' + additionalInfo;
        }
    }
}

function onHistoryFrameLoaded(adress, additionalInfo) {
    var app = getFlashAppInstance();
    if (app != null) {
        try {
            app.onHistoryFrameLoaded(adress, additionalInfo);
        } catch(e) {
        }
    }
}

addListener(window, "load", function() {
    pageOnLoad();
});
addListener(window, "resize", function() {
    pageOnResize();
});