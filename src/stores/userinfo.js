import { observable, action } from 'mobx';
import { NetworkManager } from '../modules/kernel/netWorkManager'
class UserStore{
    @observable userData;
      constructor(){
         this.userData = {}
      }
      @action async setUserData(data){
        this.userData = data
        return data
      }

      @action async newArticle(data){
        let result = await StorageManager.newArticle(data)
        return result
      }

      async saveArticle(data){
        let result = await StorageManager.updateArticle(data)
        return result
      }


}

const UserStore = new UserStore()
export default UserStore