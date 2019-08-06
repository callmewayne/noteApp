import React, {  Component} from 'react'
import {Button} from 'antd';
import TopBar from '../../../components/TopBar/'
import Siderbar from './../Siderbar'
import EditorContainer from './../Editor'
import ArticleList from './../ArticleList'
import './Main.less'
class Main extends Component{
   constructor(props){
       super(props)
       this.pickArticle = this.pickArticle.bind(this)
       this.state = {
           editorData:{}
       }
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
           <ArticleList handleSelect={this.pickArticle} />
           <EditorContainer editorData={this.state.editorData} />
        </div>
       ) 
   }
}


export default  Main
