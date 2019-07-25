import { editorStore} from './../stores'
import ActBase from './actBase'
import axios from 'axios'


class EditorAction extends ActBase {
     constructor(){
         super()
     }
     static instance
     static get instance(){
         if(EditorAction.instance ==null){
            EditorAction.instance = new EditorAction()
         }
         return EditorAction.instance
     }
     
     newArticle(){

     }

     saveArticle(){

     }

    async getArtDetail(item){
        editorStore.getArtDetail(item)
     }
     deleteArticle(){

     }

}
const editorAction = new EditorAction();
export default editorAction