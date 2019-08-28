import React, {  Component} from 'react'
import {Button} from 'antd';
import { observer, inject } from 'mobx-react';
import TopBar from '../../../components/TopBar/'
import Siderbar from './../Siderbar'
import EditorContainer from './../Editor'
import ArticleList from './../ArticleList'
import { editorAction } from "../../../actions";
import './Main.less'
@inject("userStore")
@observer
class Main extends Component{
   constructor(props){
       super(props)
       this.pickArticle = this.pickArticle.bind(this)
       this.getArtList = this.getArtList.bind(this)
       this.state = {
           editorData:{},
           list:[]
       }
   }

   componentDidMount(){
    //  this.getArtList()
        this.switchCurrentUser()
   }

   switchCurrentUser(){
    userAction.getCookies('login').then(res=>{
        console.log(res)
       if(res.value==''){
          this.setState({
              visible:true
            })
       }else{
          let userinfo = userAction.getUserDataBytoken(res.value)
        console.log(userinfo)
         this.setState({
            UserInfo:userinfo
         })
         userAction.setUserData(userinfo)
         this.props.getArtList()
       }
    })
}

   async  getArtList() {
    try {
        let result = await editorAction.getArtList('/api/blog/list')
        console.log(result)
        this.setState({
            list: result
        })
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
           <Siderbar getArtList={this.getArtList} />
           <ArticleList handleSelect={this.pickArticle} list={this.state.list} />
           <EditorContainer editorData={this.state.editorData} />
        </div>
       ) 
   }
}


export default  Main
