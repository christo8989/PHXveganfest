/// <reference path="../../node_modules/jquery/dist/jquery.js" /> 

var App = App || {};

App.IsMobile = App.IsMobile || false;

App.StringHelper = (function () {
    
    var escapeRegExp = function (str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    };
    
    var replaceAll = function (str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    };
    
    return {
        'replace' : replaceAll,
    };
    
})();
