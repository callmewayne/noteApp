import * as path from 'path';
import * as _ from "lodash";
import  DataStore from 'nedb';
import  {ConfigManager} from '../config'
class StorageModel {
    constructor(){
        this.instance = null
    }
     

   async init(){
       return await true
   }

   getDocumentDB(filePath,dir?){
         let dbpath= path.join(filePath+'.json')
         return new  DataStore({filename:dbpath, autoload: true })
   }
  
}
const StorageManager = new StorageModel()
export { StorageManager }