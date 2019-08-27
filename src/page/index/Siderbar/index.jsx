import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';
import { Modal, Button, Icon, Dropdown, Menu } from 'antd'
import SiderbarList from '../../../components/SiderbarList'
import UserInfo from '../../../components/UserInfo'
import WrappedNormalLoginForm from '../../../components/LoginForm'
import { windowManager } from '../../../modules/kernel/windowManager'
import shortid from 'shortid'
import { editorAction,userAction } from "../../../actions";
import axios from 'axios'
import PubSub from 'pubsub-js'
import './index.less'
@inject("userStore")
@observer
export default class Siderbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            UserInfo: {},
            visible: false,
            confirmLoading: false,
        }
       
    }



    componentDidMount() {
          userAction.getCookies('login').then(res=>{
              console.log(res)
             if(res.value==''){
                this.setState({
                    visible:true
                  })
             }else{
                console.log(JSON.parse(res.value))
                 this.setState({
                    UserInfo:JSON.parse(res.value)
                 })

             }
          })
        //   axios.get('http://localhost:8000/api/blog/list').then(res=>{
        //     console.log(res)
        // })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
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
    async  addDocument(type) {
        let newid = shortid.generate()
        let data = {
            id: newid,
            data: {
                "id": newid,
                "title": `新建文档${newid}`,
                "description": "",
                "content": `这是文档${newid}内容`,
                "lastmodifytime": new Date().getTime()
            },
            createtime: new Date().getTime(),
            type: type == 'txt' ? 'txt' : 'md',
            size: '20B',
            lastmodifytime: new Date().getTime()
        }
        try {
            PubSub.publish('addArticle', data)
            let result = await editorAction.newArticle(data)
        } catch (error) {
            console.log(error)
        }
    }
    async  getDetail() {
        let result = await editorAction.getArtDetail()
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a href="#" onClick={ev => { this.addDocument('txt') }}>新建笔记</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="#" onClick={ev => { this.addDocument('md') }} >新建markdown</a>
                </Menu.Item>
                <Menu.Item key="3">导入word</Menu.Item>
            </Menu>
        );
        return (
            <div className="siderbar">
                <header className="hearder"  >
                    <UserInfo UserInfo={this.state.UserInfo} showModal={this.showModal}/>
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

                <Modal
                    title="登录"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    style={{ top: 100 }}
                    okText="确认"
                    cancelText="取消"
                    onCancel={this.handleCancel}
                    confirmLoading={this.state.confirmLoading}
                >
                   <WrappedNormalLoginForm  handleOk={this.handleOk}/>
                </Modal>
            </div>
        )
    }
}
