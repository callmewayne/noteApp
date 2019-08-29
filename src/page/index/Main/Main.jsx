import React, {  Component} from 'react'
import {Button,message} from 'antd';
import TopBar from '../../../components/TopBar/'
import Siderbar from './../Siderbar'
import EditorContainer from './../Editor'
import ArticleList from './../ArticleList'
import { editorAction,userAction } from "../../../actions";
import './Main.less'
import PubSub from 'pubsub-js'
import { observer, inject } from 'mobx-react';
const error = (mes) => {
    message.error(mes);
  };
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
    PubSub.subscribe('addArticle', (msg, data) => {
        let artlist = this.state.list
        artlist.unshift(data)
        this.setState({
            list: artlist
        })
        editorAction.newArticle('/api/blog/new',data).then(res=>{
            console.log(res)
            if(res.code!=200){
                error('新建文档失败')
            }
        })
    })
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
         this.getArtList()
         userAction.setUserData(userinfo)
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
       PubSub.publish('getArtDetail',data)
    //    this.setState({
    //     editorData:data
    //    })
   }
   render(){
       return (
        <div className="container">
           <TopBar />
           <Siderbar userinfo={this.state.UserInfo} showModal={this.showModal} visible={this.state.visible} handleOk={this.handleOk} handleCancel={this.handleCancel} getArtList={this.getArtList} />
           <ArticleList handleSelect={this.pickArticle} getArtList={this.getArtList} list={this.state.list} />
           <EditorContainer editorData={this.state.editorData}  />
        </div>
       ) 
   }
}


export default  Main
