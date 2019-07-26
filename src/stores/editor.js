import { observable, action } from 'mobx';
import { StorageManager } from '../modules/db/index'
class EditorStore{
    @observable ArticleData;
    initData
      constructor(){
         this.ArticleData = {}
        this.initData = {}
         
      }
      @action async getArtDetail(id){
      let result = await StorageManager.getArtDetail(id)
      console.log(result)
        this.ArticleData = result
        this.initData = result
      }

      @action newArticle=(data)=>{}
}

const editorStore = new EditorStore()
export default editorStore