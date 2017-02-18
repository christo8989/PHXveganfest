/// <reference path="./jquery/jquery.d.ts" />

import { History } from "./history";
import { Cookies } from "./cookies";

export class Menu {
    public init = (): void => {
        //Set active menu item based on url
        let page = new History().currentPage();
        let $link = $(`#${page}`);
        $link.addClass('active');
    }
}
