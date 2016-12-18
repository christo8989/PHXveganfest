import { Cookies } from './cookies';
import { History } from "./history";

export class CacheBust {
    private cookie: Cookies = new Cookies();
    private version: string = '2.2.1';
    
    public init = (): void => {
        let page = new History().currentPage();
        let version = this.cookie.version(page);
        if (version == null || version.trim() == '' || version !== this.version) {
            this.cookie.version(page, this.version);
            location.reload(true);
        }
    }
}