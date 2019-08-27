import { observable, action } from 'mobx';
import { NetworkManager } from '../modules/kernel/netWorkManager'
class UserStore{
    @observable userData;
      constructor(){
         this.userData = {
             username:'wayne'
         }
      }
      @action async setUserData(data){
        this.userData = data
        return data
      }

      @action async getUserData(){
        return  this.userData
      }

    

}

const userStore = new UserStore()
export default userStore