
import axios from 'axios'
import {
    utilManager
} from '../modules/kernel/utilsManager'
class ActBase{
    constructor(){
        this.cv = utilManager.convertResponse
        this.basePath = 'http://localhost:8000'
    }
    
   


}

export default ActBase