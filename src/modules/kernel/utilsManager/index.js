


class UtilManager{
    constructor(){

    }
  
    convertResponse(ret){
        console.log(ret)
        return {
            code:ret.response.statusCode,
            message: decodeURIComponent(ret.response.headers['status-message']),
            body: ret.body?JSON.parse(ret.body):null
        }
    }
}
const utilManager = new UtilManager()
export {utilManager}