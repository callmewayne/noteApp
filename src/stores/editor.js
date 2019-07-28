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
        this.ArticleData = result
        this.initData = result
        return result
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

const editorStore = new EditorStore()
export default editorStore