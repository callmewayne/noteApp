import { observable, action } from 'mobx';
import { StorageManager } from '../modules/db/index'
class EditorStore{
 
    @observable ArticleData;
    initData
      constructor(){
         this.ArticleData = {}
        this.initData = {}
        this.articledb = StorageManager.getDocumentDB('D:\\stations\\blogs\\noteApp\\src\\json\\art_list')
      }
      @action getArtDetail=(item)=>{
        
        this.ArticleData = item
        this.initData = item
      }

      @action newArticle=(data)=>{
        return new Promise((resolve, reject) => {
          this.articledb.insert(data, (err, doc) => {
              err ? reject() : resolve(doc);
          })
  })
      }
}

const editorStore = new EditorStore()
export default editorStore