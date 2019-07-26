import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import ArticleItem from '../../../components/ArticleItem'
import {editorAction}   from "../../../actions";
import PubSub from 'pubsub-js'
import './index.less'
export default class ArticleList extends Component {
    constructor(props){
          super(props)
          this.state={
              list:[
                  {
                      id:'123124111111',
                      title:'article11',
                      description:'这是一段描述。。。',
                      createtime:1563957437027,
                      type:'txt',
                      size:'20B'
                  },
                  {
                    id:'1231231',
                    title:'article2',
                    description:'将一个复杂的程序依据一定的规则（规范）封装成几个块（文件）并组合在一起。块的内部数据与实现是私有的，只是',
                    createtime:1563957437027,
                    type:'md',
                    size:'20B'
                },
              ]
          }
        //   this.getDetail(this.state.list[0])
        
    }

    componentDidMount(){
        PubSub.subscribe('addArticle', (msg, data)=>{
            console.log(data)
        })
        this.getArtList()
    }
  async  getArtList(){
        try {
            let result = await editorAction.getArtList()
            this.setState({
                list:result
            })
                  console.log(result)
              } catch (error) {
                  console.log(error)
              }
    }
    getDetail(id){
        editorAction.getArtDetail(id)
      }
    render() {
        return (
            <div className="ArticleList">
                <header className="header">
                      <input type="search" placeholder="搜索..."/>
                </header>
                <ul className="list">
                      <Scrollbars>
                          {
                              this.state.list.map((item)=>{
                                  return(
                                    <ArticleItem key={item.id} data={item} getDetail={this.getDetail}>
                                    
                                </ArticleItem>  
                                  )
                              })
                          }
                          
                        
                      </Scrollbars> 
                </ul>
            </div>
        )
    }
}
