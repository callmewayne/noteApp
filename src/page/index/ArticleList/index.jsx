import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import ArticleItem from '../../../components/ArticleItem'
import { editorAction } from "../../../actions";
import { StorageManager } from '../../../modules/db/index'
import PubSub from 'pubsub-js'
import './index.less'
export default class ArticleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // list: [
            //     //   {
            //     //       id:'123124111111',
            //     //       title:'article11',
            //     //       description:'这是一段描述。。。',
            //     //       createtime:1563957437027,
            //     //       type:'txt',
            //     //       size:'20B'
            //     //   },
            //     //   {
            //     //     id:'1231231',
            //     //     title:'article2',
            //     //     description:'将一个复杂的程序依据一定的规则（规范）封装成几个块（文件）并组合在一起。块的内部数据与实现是私有的，只是',
            //     //     createtime:1563957437027,
            //     //     type:'md',
            //     //     size:'20B'
            //     // },
            // ]
            list:this.props.list
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
        PubSub.subscribe('updateTitle',(msg,data)=>{
            let list = this.state.list
            for (let i of list) {
                if(i.id==data.id  && i.data.content!=data.content){
                    i.data.title = data.title
                    i.data.description = StorageManager.stripHTML(data.content).substring(0,20),
                    i.data.content=data.content
                    i.data.lastmodifytime = data.lastmodifytime
                    editorAction.saveArticle(data).then(res=>{
                    })
                }
            }
        
            this.setState({
                list: list
            })
        })
        // this.getArtList()

    }
    async  getArtList() {
        try {
            let result = await editorAction.getArtList()
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
     PubSub.publish('getArtDetail', result) 
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
                            this.props.list.map((item) => {
                            //    item = item.data
                                return (
                                    <ArticleItem key={item.id} data={item} removeArticle={this.removeArticle} getDetail={this.props.handleSelect}>

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
