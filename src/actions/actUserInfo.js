import { userStore} from './../stores'
import ActBase from './actBase'
import { NetworkManager } from '../modules/kernel/netWorkManager'
import { StorageManager } from '../modules/db'
import { utilManager } from '../modules/kernel/utilsManager'
class UserAction extends ActBase {
     constructor(){
         super()
         this.basePath = 'http://localhost:8000'
         this.cv = utilManager.convertResponse
        //  this.getCookies = utilManager.getCookies
     }
   
     static instance
     static get instance(){
         if(UserAction.instance ==null){
            UserAction.instance = new UserAction()
         }
         return UserAction.instance
     }
     
   async login(uri,options){
       let result  = this.cv(await NetworkManager.newPOST(this.basePath+uri,options)) 
       return result
    }
    async setCookies(data){
        let cookies = await StorageManager.setCookies(data)
        return cookies
    }
    async getCookies(key){
        let cookies = await StorageManager.getCookies(key)
        return cookies
    }
async setUserData(data){
    userStore.setUserData(data)
}
async loginTest(uri,options){
    let result  = await NetworkManager.newPOST(this.basePath+uri,options) 
    return result
}
async sessionTest(uri){
    let result =  NetworkManager.newGET(this.basePath+uri)
    return result
}

}
const userAction = new UserAction();
export default userAction