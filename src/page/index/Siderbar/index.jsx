import React, { Component } from 'react'
import { Avatar, Button, Icon ,Dropdown,Menu} from 'antd'
import SiderbarList from '../../../components/SiderbarList'
import { windowManager } from '../../../modules/kernel/windowManager'
import shortid from 'shortid'
import {editorAction}   from "../../../actions";
import PubSub from 'pubsub-js'
import './index.less'

export default class Siderbar extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
      
    }
  async  addDocument(type){
        let newid = shortid.generate()
        let data =   {
            id:newid,
            data : {
                "id":newid,
                "title":`新建文档${newid}`,
                "description":"",
                "content":`这是文档${newid}内容`,
                "lastmodifytime":new Date().getTime()
            },
            createtime:new Date().getTime(),
            type:type=='txt'?'txt':'md',
            size:'20B',
            lastmodifytime:new Date().getTime()
        }
        try {
            PubSub.publish('addArticle', data) 
      let result = await editorAction.newArticle(data)
        } catch (error) {
            console.log(error)
        }
    }
  async  getDetail(){
    let result = await  editorAction.getArtDetail()
    }
    render() {
        const menu = (
            <Menu>
              <Menu.Item key="0">
                <a href="#" onClick={ ev=>{this.addDocument('txt')}}>新建笔记</a>
              </Menu.Item>
              <Menu.Item key="1">
                <a href="#"onClick={ev=>{this.addDocument('md')}} >新建markdown</a>
              </Menu.Item>
              <Menu.Item key="3">导入word</Menu.Item>
            </Menu>
          );
        return (
            <div className="siderbar">
                <header className="hearder">
                    <Avatar className="avatar" size={50} style={{ backgroundColor: '#87d068' }} icon="user" />
                    <div className="tool">
                        <div className="tool_item">
                            <span className="border">
                                <Icon type="pay-circle" />
                                会员</span>
                        </div>
                        <div className="tool_item">

                            <span>
                                <Icon type="sync" />
                                同步
                               </span>
                        </div>
                    </div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button className="newButton" type="primary" shape="round" icon="plus" size='large'>
                            新文档
                       </Button>
                    </Dropdown>

                </header>
                <SiderbarList>

                </SiderbarList>
            </div>
        )
    }
}
