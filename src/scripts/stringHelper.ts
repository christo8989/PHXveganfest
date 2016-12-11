export class StringHelper {
    private escapeRegExp(str) {
        let result = str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        return result;
    }
    
    public replaceAll(str, find, replace) {
        let result = str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        return result;
    }
}

//export new StringHelper();