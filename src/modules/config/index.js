


import * as _ from "lodash";
import * as path from 'path';
import * as os from 'os';
class ConfigManager {
    constructor(){
        this.instance= null;
      //  this.JSON_DIR = path.resolve(__dirname, 'json');
    }
  
    static Instance(){
        if (null == ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

}

export { ConfigManager}