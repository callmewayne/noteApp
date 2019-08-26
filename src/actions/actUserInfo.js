import { UserStore} from './../stores'
import ActBase from './actBase'
import { NetworkManager } from '../modules/kernel/netWorkManager'
import { utilManager } from '../modules/kernel/utilsManager'
class UserAction extends ActBase {
     constructor(){
         super()
         this.basePath = 'http://localhost:8000'
         this.cv = utilManager.convertResponse
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
       console.log(result)
       return result
    }

}
const userAction = new UserAction();
export default userAction