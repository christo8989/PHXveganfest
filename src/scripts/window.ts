import { StringHelper } from './stringHelper';

console.log(StringHelper.replaceAll);

export class AppWindow {
    constructor() {
        this.widthMobile = 768;
    }
    
    private init() {
        this.w = window;
        this.d = document;
        this.e = this.d.documentElement;
        this.g = this.d.getElementsByTagName('body')[0];
    }
    
    public width() {
        this.init();
        return this.w.innerWidth || this.e.clientWidth || this.g.clientWidth;
    }

    public height() {
        this.init();
        return this.w.innerHeight || this.e.clientHeight || this.g.clientHeight;
    }

    public isMobile() {
        let result = this.width() < this.widthMobile;
        return result;
    }
}

//export new AppWindow();