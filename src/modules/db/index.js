import * as path from 'path';
import * as _ from "lodash";
import DataStore from 'nedb';
import {
    ConfigManager
} from '../config'
class StorageModel {
    constructor() {
        this.instance = null
        this.articledb =this.getDocumentDB('D:\\stations\\blogs\\noteApp\\src\\json\\art_list')
    }


    async init() {
        return await true
    }

    getDocumentDB(filePath, dir ? ) {
        let dbpath = path.join(filePath + '.json')
        return new DataStore({
            filename: dbpath,
            autoload: true
        })
    }
    async getArtDetail(id) {
        return new Promise((resolve, reject) => {
            this.articledb.findOne({
                "id": id
            }, (err: Error, doc: any) => {
                err ? reject() : resolve(doc);
            })
        })
    }

}
const StorageManager = new StorageModel()
export {
    StorageManager
}