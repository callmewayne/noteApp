

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

    }
}
const utilManager = new UtilManager()
export {utilManager}