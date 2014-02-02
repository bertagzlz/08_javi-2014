function UserServer() {

    this.isScriptAlive = isScriptAlive;
    this.addJsNode = addJsNode;
    this.login = login;
    this.createUser = createUser;
    this.getUserDetails = getUserDetails;
    this.updateUser = updateUser;
    this.sendVerificationEmail = sendVerificationEmail;
    this.forgotPassword = forgotPassword;
    this.logout = logout;
    this.getToken = getToken;
    this.getUserName = getUserName;
    this.getEmail = getEmail;
    this.getMailStatus = getMailStatus;
    this.getPermissions = getPermissions;
    this.isSessionNew = isSessionNew;
    this.isSessionValid = isSessionValid;
    this.setCookies = setCookies;
    this.deleteCookies = deleteCookies;
    this.setUserType = setUserType;

    var mainCookie = "wixSession", helperCookie = "wixClient";

    var apiUrl = "https://" + usersDomain + "/wix-auth/api/";
    var domainName = usersDomain.substring(usersDomain.indexOf("."));

    function isScriptAlive() {
        return "alive";
    }

    function callServer(func, params) {
        var paramStr = "";
        for (var param in params)
            paramStr += "&" + param + "=" + encodeURIComponent(params[param]);
        addJsNode(apiUrl + func + "?" + paramStr.substring(1));
    }

    function addJsNode(src) {
        var js = document.createElement("script");
        js.type = "text/javascript";
        js.src = src;
        document.getElementsByTagName("head")[0].appendChild(js);
    }

    function login(email, password, rememberMe, orgDocID) {
        callServer("login", {email:email, password:password, rememberMe:rememberMe, orgDocID: orgDocID});
    }

    function createUser(userName, password, email, orgDocID) {
        callServer("createUser", {userName:userName, password:password, email:email, orgDocID: orgDocID});
    }

    function getUserDetails(wsess) {
        callServer("getUserDetails", {wsess: wsess});
    }

    function updateUser(password, newUserName, newPassword, newEmail, optInMail, wsess) {
        callServer("updateUser", {password:password, newUserName:newUserName, newPassword:newPassword, newEmail:newEmail, optInMail:optInMail, wsess: wsess});
    }

    function sendVerificationEmail(email) {
        callServer("sendVerificationEmail", {email: email});
    }

    function forgotPassword(email) {
        callServer("forgotPassword", {email: email});
    }

    function logout() {
        deleteCookies();
        handleUserServerResponse("logout", true);
    }

    function getToken() {
        return getCookie(mainCookie);
    }

    function getUserName() {
        return getClientParam(0);
    }

    function getEmail() {
        return getClientParam(1);
    }

    function getMailStatus() {
        return getClientParam(2);
    }

    function getPermissions() {
        return getClientParam(3);
    }

    function isSessionNew() {
        var created = getClientParam(4);
        return created && created > new Date().getTime() - 20000;
    }

    function isSessionValid() {
        var exp = getClientParam(5);
        return exp && exp > new Date().getTime();
    }

    function getClientParam(i) {
        var params = getClientParams();
        return params ? params[i] : null;
    }

    function getClientParams() {
        var cookie = getCookie(helperCookie);
        return cookie ? cookie.split("|") : null;
    }

    function setCookies(token, userName, email, mailStatus, permissions, sessionExp) {
        setCookie(mainCookie, token, sessionExp);
        var now = new Date().getTime();
        setCookie(helperCookie, userName + "|" + email + "|" + mailStatus + "|" + permissions + "|" + now + "|" + (now + 86400000), sessionExp);
    }

    function deleteCookies() {
        deleteCookie(mainCookie);
        deleteCookie(helperCookie);
        deleteCookie(userTypeEnum.cookieName);
    }

    function setCookie(name, value, time) {
        cookieManager.setCookie(name, value, time, domainName);
    }

    function getCookie(name) {
        return cookieManager.getCookie(name);
    }

    function deleteCookie(name) {
        cookieManager.deleteCookie(name, domainName);
    }

    function setUserType(userType) {
        userTypeEnum.setUserType(userType);
    }

    var cookieManager = {

        setCookie : function(name, value, time, domain, path, secure) {
            window[name] = value;
            var cookie = name + "=" + value;
            if (time) cookie += ";expires=" + (new Date((new Date()).getTime() + time)).toGMTString();
            cookie += ";path=" + (path || "/");
            if (domain) cookie += ";domain=" + domain;
            if (secure) cookie += ";secure";
            document.cookie = cookie;
        },

        getCookie : function(name) {
            if (window[name]) return window[name];
            if (document.cookie) {
                var cookies = document.cookie.split(/;\s*/);
                for (var i = 0, n = cookies.length; i < n; i++) {
                    var cookie = cookies[i];
                    if (cookie.indexOf(name + "=") == 0)
                        return cookie.substring(name.length + 1);
                }
            }
            return null;
        },

        deleteCookie : function(name, domain, path, secure) {
            this.setCookie(name, "", -1, domain, path, secure);
        }

    };

    var userTypeEnum = {

        cookieName: "userType", expiration: 157784630000,

        ANONYMOUS: 0, REGISTERED: 1, PREMIUM_MONTHLY: 2, PREMIUM_YEARLY: 3,

        setUserType: function(userType) {
            var prevUserType = getCookie(this.cookieName);
            if (!prevUserType || this[userType] > this[prevUserType])
                setCookie(this.cookieName, userType, this.expiration);
        }

    };

}

var userServer = new UserServer();

