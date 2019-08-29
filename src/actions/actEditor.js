import { editorStore} from './../stores'
import ActBase from './actBase'
import axios from 'axios'
import { StorageManager } from '../modules/db/index'
import {NetworkManager}  from '../modules/kernel/netWorkManager'
class EditorAction extends ActBase {
     constructor(){
         super()
         this.articledb = StorageManager.getDocumentDB('C:\\AppData\\noteApp\\art_list')

     }
     static instance
     static get instance(){
         if(EditorAction.instance ==null){
            EditorAction.instance = new EditorAction()
         }
         return EditorAction.instance
     }
     
    async newArticle(url,data){
        let result = this.cv(await NetworkManager.newPOST( this.basePath+ url,data)) 
        return  result
     }

     async saveArticle(url,options){
        let result = this.cv(await NetworkManager.newPUT( this.basePath+ url,options)) 
        return  result
       // return  StorageManager.updateArticle(data)
     }
    async getArtList(url,options){
        let result = this.cv(await NetworkManager.newGET( this.basePath+ url,options)) 
        return  result
    }
    async getArtDetail(url,options){
      return this.cv(await NetworkManager.newGET( this.basePath+ url,options))
     }
     async deleteArticle(url,options){
        let result = this.cv(await NetworkManager.newDELETE( this.basePath+ url,options)) 
        return  result
     }

}
const editorAction = new EditorAction();
export default editorAction