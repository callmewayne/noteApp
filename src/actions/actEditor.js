import { editorStore} from './../stores'
import ActBase from './actBase'
import axios from 'axios'
import { StorageManager } from '../modules/db/index'

class EditorAction extends ActBase {
     constructor(){
         super()
         this.articledb = StorageManager.getDocumentDB('D:\\stations\\blogs\\noteApp\\src\\json\\art_list')
     }
     static instance
     static get instance(){
         if(EditorAction.instance ==null){
            EditorAction.instance = new EditorAction()
         }
         return EditorAction.instance
     }
     
    async newArticle(data){
        return new Promise((resolve, reject) => {
                this.articledb.insert(data, (err, doc) => {
                    err ? reject() : resolve(doc);
                })
        })
     }

     saveArticle(){

     }
    async getArtList(){
        return new Promise((resolve, reject) => {
            this.articledb.find({}, (err: Error, doc: any) => {
                err ? reject() : resolve(doc);
            })
        })
    }
    async getArtDetail(id){
        editorStore.getArtDetail(id)
     
     }
     deleteArticle(){

     }

}
const editorAction = new EditorAction();
export default editorAction