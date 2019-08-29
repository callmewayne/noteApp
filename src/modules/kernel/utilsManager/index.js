

const jwt_decode = require('jwt-decode'); //無秘解析

class UtilManager{
    constructor(){
       
    }
  
    convertResponse(ret){
        if( Object.prototype.toString.call(ret.body)=="[object String]"){
            let result = JSON.parse(ret.body)
            return {
                code:result.code,
                message: decodeURIComponent(ret.response.headers['status-message']),
                body: result.data?result.data:null
            }
        }else{
            return {
                code:ret.body.code,
                message: decodeURIComponent(ret.response.headers['status-message']),
                body: ret.body?ret.body:null
            }
        }
      
    }
     verifyToken(token){
        try {
        var decoded = jwt_decode(token);
        return decoded
            
        } catch (error) {
            console.log(error)
        }
    
    }

    debounce(fn,wait){
        console.log(wait)
        var timeout = null;
        return function() {
            window.clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
            // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
            timeout = window.setTimeout(() => { 
                console.log(wait)
                fn.apply(this, arguments);
            }, wait);
        }
    }
}
const utilManager = new UtilManager()
export {utilManager}