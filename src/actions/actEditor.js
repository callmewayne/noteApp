import { editorStore} from './../stores'
import ActBase from './actBase'
import axios from 'axios'
import { StorageManager } from '../modules/db/index'
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
     
    async newArticle(data){
        // let that = this
        // return new Promise((resolve, reject) => {
        //     that.articledb.insert(data, (err, doc) => {
        //             err ? reject() : resolve(doc);
        //         })
        // })
        editorStore.newArticle(data)
     }

     async saveArticle(data){
        return  StorageManager.updateArticle(data)
     }
    async getArtList(){
        return  StorageManager.getArtList()
    }
    async getArtDetail(id){
      return  StorageManager.getArtDetail(id)
     }
     async deleteArticle(id){
      return  StorageManager.deleteArticle(id)
     }

}
const editorAction = new EditorAction();
export default editorAction