import * as path from 'path';
import * as _ from "lodash";
import * as request from 'request';
import { StorageManager } from './../../db'

class NetworkModel {
    constructor(props) {
        this.instance = null
        this.userInfo = null
        //this.init()
        this.getUserInfo()
    }

     
    async init() {
        // session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
        //     details.requestHeaders['User-Agent'] = 'MyAgent'
        //     details.requestHeaders['values'] = 'zhangsan'
        //     callback({ requestHeaders: details.requestHeaders })
        //   })
        return await true
    }
    async getUserInfo(){
        let result = await StorageManager.getCookies('login')
        this.userInfo =  result?result.value:null
    }
    newGET(uri,options) {
        let that = this
        return new Promise((resolve, reject) => {
            request.get({
                url: uri,
                qs: options,
                headers:{
                    "token":that.userInfo
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
    newPUT(uri, options) {
        let that = this
         return new Promise((resolve, reject) => {
             request.post({
                 url: uri,
                 body: options,
                 json: true,
                 headers:{
                     'token':that.userInfo
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

    newDELETE(uri, options) {
        console.log(uri)
        let that = this
         return new Promise((resolve, reject) => {
             request.delete({
                 url: uri,
                 qs: options,
                 headers:{
                     'token':that.userInfo
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

   async newPOST(uri, options) {
        let that = this
       // let user = await that.getUserInfo()
        return new Promise((resolve, reject) => {
            request.post({
                url: uri,
                body: options,
                json: true,
                headers:{
                    'token':that.userInfo
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