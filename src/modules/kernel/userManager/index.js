import * as path from 'path';
import * as _ from "lodash";
import * as request from 'request';

class UserModel {
    constructor(props) {
        this.instance = null
        this.UserInfo = null
        this.init()
    }

     
    async init() {
        // session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
        //     details.requestHeaders['User-Agent'] = 'MyAgent'
        //     details.requestHeaders['values'] = 'zhangsan'
        //     callback({ requestHeaders: details.requestHeaders })
        //   })
        return await true
    }
    
    
}
const UserManager = new UserModel()
export {
    UserManager
}