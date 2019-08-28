

const jwt_decode = require('jwt-decode'); //無秘解析

class UtilManager{
    constructor(){
       
    }
  
    convertResponse(ret){
        console.log(ret)
        return {
            code:ret.body.code,
            message: decodeURIComponent(ret.response.headers['status-message']),
            body: ret.body?ret.body:null
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
}
const utilManager = new UtilManager()
export {utilManager}