import React, {  Component} from 'react'
import {Button} from 'antd';
import TopBar from '../../../components/TopBar/'
import Siderbar from './../Siderbar'
import EditorContainer from './../Editor'
import ArticleList from './../ArticleList'
import { editorAction,userAction } from "../../../actions";
import './Main.less'
import { observer, inject } from 'mobx-react';
@inject("userStore")
@observer
class Main extends Component{
   constructor(props){
       super(props)
       this.pickArticle = this.pickArticle.bind(this)
       this.getArtList = this.getArtList.bind(this)
       this.handleCancel =  this.handleCancel.bind(this)
       this.handleOk =  this.handleOk.bind(this)
       this.showModal =  this.showModal.bind(this)
       this.state = {
           editorData:{},
           list:[],
           UserInfo:null,
           visible:false,
           confirmLoading:false
       }
       this.switchCurrentUser()
   }

   componentDidMount(){
    //  this.getArtList()
       
   }

   switchCurrentUser(){
    userAction.getCookies('login').then(res=>{
       if(res.value==''){
          this.setState({
              visible:true
            })
       }else{
          let userinfo = userAction.getUserDataBytoken(res.value)
         this.setState({
            UserInfo:userinfo
         })
         userAction.setUserData(userinfo)
       this.getArtList()
       }
    })
}

showModal = () => {
    this.setState({
        visible: true,
    });
};

handleOk = e => {
    this.switchCurrentUser()
    this.setState({
        visible: false,
        confirmLoading: false
    });
};

handleCancel = e => {
    this.setState({
        visible: false,
    });
};
   async  getArtList() {
    try {
        let result = await editorAction.getArtList('/api/blog/list')
     
        result.body.length >0? this.getDetail(result.body[0].id):null  
        this.setState({
            list: result.body
        })

    } catch (error) {
        console.log(error)
    }
}
async getDetail(id) {
    let options = {
        id:id
    }
    let result = await editorAction.getArtDetail('/api/blog/detail',options)
    this.pickArticle(result.body)
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
           <Siderbar userinfo={this.state.UserInfo} showModal={this.showModal} visible={this.state.visible} handleOk={this.handleOk} handleCancel={this.handleCancel} getArtList={this.getArtList} />
           <ArticleList handleSelect={this.pickArticle} list={this.state.list} />
           <EditorContainer editorData={this.state.editorData} />
        </div>
       ) 
   }
}


export default  Main
