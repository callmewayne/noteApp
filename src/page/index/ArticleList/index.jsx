import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import ArticleItem from '../../../components/ArticleItem'
import './index.less'
export default class ArticleList extends Component {
    constructor(props){
          super(props)
          this.state={
              list:[
                  {
                      id:'123124',
                      title:'article1',
                      description:'这是一段描述。。。',
                      createtime:1563957437027,
                      type:'txt',
                      size:'20B'
                  },
                  {
                    id:'1231231',
                    title:'article2',
                    description:'这是一段描述。。。这是一段描述。。。这是一段描述。。。这是一段描述。。。这是一段描述。。。这是一段描述。。。',
                    createtime:1563957437027,
                    type:'md',
                    size:'20B'
                },
              ]
          }
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
                                    <ArticleItem key={item.id} data={item} >
                                    
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
