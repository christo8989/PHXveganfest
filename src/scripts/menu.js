/// <reference path="../../node_modules/jquery/dist/jquery.js" /> 
/// <reference path="main.js" /> 

//import {currentPage} from "history";

App.Menu = (function () {

    var init = function () {
        var page = App.History.page();
        page = page ? page : 'home';
        
        var $link = $('#' + page);
        $link.addClass('active');
    };

    return {
        'init': init,
    };
})();

App.Menu.init();
