import * as path from 'path';
import * as _ from "lodash";
import  * as request from 'request';

class NetworkModel {
    constructor() {
        this.instance = null
    }


    async init() {
        return await true
    }
   newGET(uri,options){
    return new Promise((resolve,reject)=>{
        request.get(uri,options,(err,response,body)=>{
            if(err){
                reject()
            }else{
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    resolve({ response: response, body: body });
                } else {
                    reject({ response: response, body: body });
                }
            }
        })
    })
   }
   newPUT(uri,options){
    return new Promise((resolve,reject)=>{
        request.post(uri,options,(err,body)=>{
            if(err){
                reject()
            }else{
                resolve(body)
            }
        })
    })
   }
   newPOST(uri,options){
    return new Promise((resolve,reject)=>{
        request.post(uri,options,(err,response,body)=>{
            if(err){
                reject()
            }else{
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    resolve({ response: response, body: body });
                } else {
                    reject({ response: response, body: body });
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