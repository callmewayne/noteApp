import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import ArticleItem from '../../../components/ArticleItem'
import { editorAction } from "../../../actions";
import PubSub from 'pubsub-js'
import './index.less'
export default class ArticleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                //   {
                //       id:'123124111111',
                //       title:'article11',
                //       description:'这是一段描述。。。',
                //       createtime:1563957437027,
                //       type:'txt',
                //       size:'20B'
                //   },
                //   {
                //     id:'1231231',
                //     title:'article2',
                //     description:'将一个复杂的程序依据一定的规则（规范）封装成几个块（文件）并组合在一起。块的内部数据与实现是私有的，只是',
                //     createtime:1563957437027,
                //     type:'md',
                //     size:'20B'
                // },
            ]
        }
        this.removeArticle = this.removeArticle.bind(this)

    }

    componentDidMount() {
        PubSub.subscribe('addArticle', (msg, data) => {
            let artlist = this.state.list
            artlist.unshift(data)
            this.setState({
                list: artlist
            })
        })
        this.getArtList()

    }
    async  getArtList() {
        try {
            let result = await editorAction.getArtList()
            console.log(result)
            this.setState({
                list: result
            })
        this.getDetail(this.state.list[0].id)

        } catch (error) {
            console.log(error)
        }
    }
    async getDetail(id) {
        console.log(id)
     let result = await editorAction.getArtDetail(id)
     PubSub.publish('getArtDetail', result) 
     console.log(result)
    }

    async removeArticle(ev) {
        let result = await editorAction.deleteArticle(ev.key)
        if(result==1){
            let list =this.state.list
            let ind = list.findIndex((item) => {
                return item.id == ev.key
            })
            ind > -1 ? list.splice(ind, 1) : null
            this.setState({
                list:list
            })
        }
      

    }
    render() {
        return (
            <div className="ArticleList">
                <header className="header">
                    <input type="search" placeholder="搜索..." />
                </header>
                <ul className="list">
                    <Scrollbars>
                        {
                            this.state.list.map((item) => {
                               item = item.data
                                return (
                                    <ArticleItem key={item.id} data={item} removeArticle={this.removeArticle} getDetail={this.getDetail}>

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
