import React, {  Component} from 'react'
import {Button} from 'antd';
import TopBar from '../../../components/TopBar/'
import Siderbar from './../Siderbar'
import EditorContainer from './../Editor'
import ArticleList from './../ArticleList'
import { editorAction } from "../../../actions";
import './Main.less'
class Main extends Component{
   constructor(props){
       super(props)
       this.pickArticle = this.pickArticle.bind(this)
       this.state = {
           editorData:{},
           list:[]
       }
   }

   componentDidMount(){
     this.getArtList()
   }
   async  getArtList() {
    try {
        let result = await editorAction.getArtList()
        this.setState({
            list: result
        })
        console.log(result)
        this.state.list.length >0? this.getDetail(this.state.list[0].id):null  

    } catch (error) {
        console.log(error)
    }
}
async getDetail(id) {
    let result = await editorAction.getArtDetail(id)
   }
   pickArticle(data){
       this.setState({
        editorData:data
       })
   }
   render(){
       return (
        <div className="container">
           <TopBar />
           <Siderbar />
           <ArticleList handleSelect={this.pickArticle} list={this.state.list} />
           <EditorContainer editorData={this.state.editorData} />
        </div>
       ) 
   }
}


export default  Main
