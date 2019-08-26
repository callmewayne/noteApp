


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
}
const utilManager = new UtilManager()
export {utilManager}