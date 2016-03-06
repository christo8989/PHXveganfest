/// <reference path="../../node_modules/jquery/dist/jquery.js" /> 
/// <reference path="main.js" /> 

//import {replaceAll} from "string";

var App = App || {};

App.History = (function () {
    var hasWindow = window ? true : false;
    var hasHistory = hasWindow && history ? true : false;
    var hasNavigator = hasWindow && navigator ? true : false;
    var hasLocation = hasWindow && location ? true : false;
    
    
    var currentPage = function() {
        if (!hasLocation) 
            return null;
            
        return App.StringHelper.replace(location.pathname, '/', '');
    };
    
    return {
        'page' : currentPage,
    };
})();


