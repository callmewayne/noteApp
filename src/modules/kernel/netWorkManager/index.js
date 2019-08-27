import * as path from 'path';
import * as _ from "lodash";
import * as request from 'request';

class NetworkModel {
    constructor(props) {
        this.instance = null
        this.init()
    }

     
    async init() {
        console.log(11111)
        // session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
        //     details.requestHeaders['User-Agent'] = 'MyAgent'
        //     details.requestHeaders['values'] = 'zhangsan'
        //     callback({ requestHeaders: details.requestHeaders })
        //   })
        return await true
    }

    newGET(uri) {
        return new Promise((resolve, reject) => {
            request.get(uri, (err, response, body) => {
                if (err) {
                    reject()
                } else {
                    if (response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({
                            response: response,
                            body: body
                        });
                    } else {
                        reject({
                            response: response,
                            body: body
                        });
                    }
                }
            })
        })
    }
    newPUT(uri, options) {
        return new Promise((resolve, reject) => {
            request.post(uri, options, (err, body) => {
                if (err) {
                    reject()
                } else {
                    resolve(body)
                }
            })
        })
    }
    newPOST(uri, options) {
        return new Promise((resolve, reject) => {
            request.post({
                url: uri,
                body: options,
                json: true,
                headers:{
                    'user':'zhangsan'
                }
            }, (err, response, body) => {
                if (err) {
                    reject()
                } else {
                    if (response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({
                            response: response,
                            body: body
                        });
                    } else {
                        reject({
                            response: response,
                            body: body
                        });
                    }
                }
            })
        })
    }
}
const NetworkManager = new NetworkModel()
export {
    NetworkManager
}