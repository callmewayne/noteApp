import React, {  Component} from 'react'
import {Button} from 'antd';
import TopBar from '../../../components/TopBar/'
import Siderbar from './../Siderbar'
import Editor from './../Editor'
import ArticleList from './../ArticleList'
import './Main.less'
class Main extends Component{
   constructor(props){
       super(props)
   }

   render(){
       return (
        <div className="container">
            <TopBar></TopBar>
           <Siderbar>

           </Siderbar>
           <ArticleList></ArticleList>
           <Editor></Editor>
        </div>
       ) 
   }
}


export default  Main
