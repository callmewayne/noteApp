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
            //     //     description:'',
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
      
        PubSub.subscribe('updateTitle',(msg,data)=>{
         
            let list = this.props.list
            for (let i of list) {
                if((i.id==data.id  && i.content!=data.content) || (i.id==data.id  && i.title!=data.title)){
                    i.title = data.title
                    i.description = StorageManager.stripHTML(data.content).substring(0,20)
                    i.content=data.content
                    i.lastmodifytime = data.lastmodifytime
                    editorAction.saveArticle('/api/blog/update',data).then(res=>{
                        console.log(res)
                    })
                }
            }
            this.setState({
                list: list
            })
        })

    }
    // async  getArtList() {
    //     try {
    //         let result = await editorAction.getArtList()
    //         this.setState({
    //             list: result
    //         })
    //         this.state.list.length >0? this.getDetail(this.state.list[0].id):null  

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // async getDetail(id) {
    //  let result = await editorAction.getArtDetail(id)
    //  PubSub.publish('getArtDetail', result) 
    // }

    async removeArticle(ev) {
        
         let result = await editorAction.deleteArticle('/api/blog/delete',{id:ev.key})
         console.log(result)
         this.props.getArtList()
        // if(result==1){
        //     let list =this.state.list
        //     let ind = list.findIndex((item) => {
        //         return item.id == ev.key
        //     })
        //     ind > -1 ? list.splice(ind, 1) : null
        //     this.setState({
        //         list:list
        //     })
        // }
      

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
