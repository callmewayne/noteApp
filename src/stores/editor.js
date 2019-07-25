import { observable, action } from 'mobx';

class EditorStore{
    @observable ArticleData;
    initData
      constructor(){
         this.ArticleData = {}
        this.initData = {}
         
      }
      @action getArtDetail=(item)=>{
        console.log(item)

        this.ArticleData = item
        this.initData = item
      }
}

const editorStore = new EditorStore()
export default editorStore