import { StringHelper } from './stringHelper';

export class History {
    private hasWindow: boolean = window ? true : false;
    private hasHistory: boolean = this.hasWindow && history ? true : false;
    private hasNavigator: boolean = this.hasWindow && navigator ? true : false;
    private hasLocation: boolean = this.hasWindow && location ? true : false;
    
    public currentPage = (): string => {
        if (!this.hasLocation)
            return null;
            
        let stringHelper = new StringHelper();
        let result = stringHelper.replaceAll(location.pathname, '/', ''); 
        return result || 'home';
    }
}
