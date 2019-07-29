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
   }

   render(){
       return (
        <div className="container">
           <TopBar />
           <Siderbar />
           <ArticleList />
           <EditorContainer />
        </div>
       ) 
   }
}


export default  Main
