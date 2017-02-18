import { Menu } from './menu';
import { CacheBust } from './cacheBust';
import { PreLoad } from './preload';

new Menu().init(); 
new CacheBust().init();
new PreLoad().init();
