export class Cookies {
    private cookie_version: string = 'version';
    public version = (pageName:string, value: string = null): string => {
        if (pageName != null && pageName.trim() !== '') {
            let key = `${this.cookie_version}_${pageName}`;
            if (value == null)
                return this.get(key);
            
            this.set(key, value);
        }
    }
    
    
    private set = (key, value): void => {
        let encodedValue = encodeURIComponent(value);
        document.cookie = `${key}=${encodedValue}`;
    }
    
    private get = (key): string => {
        let value = '';
        if (document.cookie != null && document.cookie.length > 0) {
            let cookies = `; ${document.cookie}`;
            var halves = cookies.split(`; ${key}=`);
            if (halves.length === 2) {
                let encodedValue = halves.pop().split(';').shift();
                value = decodeURIComponent(encodedValue);
            }
        }
        return value;
    }
}