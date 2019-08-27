import * as path from 'path';
import * as _ from "lodash";
import DataStore from 'nedb';
import {
    ConfigManager
} from '../config'

const session = require('electron').remote.session
const filter = {
    urls: ['*://*/*']
}
let Days = 30;
let exp = new Date();
let date = Math.round(exp.getTime() / 1000) + Days * 24 * 60 * 60;
const cookie = {
    url: "http://www.github.com",
    name: 'login',
    value: '',
    expirationDate: date
};

class StorageModel {
    constructor() {
        this.instance = null
        this.articledb =this.getDocumentDB('C:\\AppData\\noteApp\\art_list')
        this.updateArticle = this.updateArticle.bind(this)
    }


    async init() {
        return await true
    }
    async setCookies(data) {
        cookie['value'] = JSON.stringify(data) 
        session.defaultSession.cookies.set(cookie, (error) => {
            if (error) console.error(error);
        });
    }

    async getCookies(key) {
        console.log(key)
        let options = key?{name:key}:{}
        return new Promise((resolve, reject) => {
            session.defaultSession.cookies.get(options,(error, cookies) => {
                if (error) {
                    reject(error)
                } else {
                    for (const i of cookies) {
                        if(i.name ==key){
                            resolve(i)
                        }
                    }
                }

            });
        })

    }

    async clearCookies () {
        session.defaultSession.clearStorageData({
          origin: "http://www.github.com",
          storages: ['cookies']
        }, function (error) {
          if (error) console.error(error);
        })
      }
   
    getDocumentDB(filePath, dir  ) {
        let dbpath = path.join(filePath + '.json')
        return new DataStore({
            filename: dbpath,
            autoload: true
        })
    }
    async getArtList(){
        return new Promise((resolve, reject) => {
            this.articledb.find({}, (err, doc) => {
                err ? reject() : resolve(doc);
            })
        })
    }
    async newArticle(data){
        return new Promise((resolve, reject) => {
            this.articledb.insert(data, (err, doc) => {
                    err ? reject() : resolve(doc);
                })
        })
     }

    async getArtDetail(id) {
        return new Promise((resolve, reject) => {
            this.articledb.findOne({
                "id": id
            }, (err, doc) => {
                err ? reject() : resolve(doc);
            })
        })
    }
    async deleteArticle(id){
        return new Promise((resolve, reject) => {
            this.articledb.remove({"id":id}, (err, doc) => {
                    err ? reject() : resolve(doc);
                })
        })
    }
    
    async updateArticle(modifyObj){
        let data = {
            "id":modifyObj.id,
            "title":modifyObj.title,
            "description":this.stripHTML(modifyObj.content).substring(0,20),
            "content":modifyObj.content,
            "lastmodifytime":new Date().getTime()
        }
        return new Promise((resolve, reject) => {
            this.articledb.update({"id":modifyObj.id},{$set: { data}}, (err, doc) => {
                    err ? reject() : resolve(doc);
                })
        })
    }
    stripHTML(str){
        var reTag = /<(?:.|\s)*?>/g;
        return str.replace(reTag,"")
    }
}
const StorageManager = new StorageModel()
export {
    StorageManager
}