import React, { Component, Fragment } from 'react';
import { Avatar } from 'antd';
import './index.less'
import { observer, inject } from 'mobx-react';
@inject("userStore")
@observer
class UserInfo extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.userStore.userData.realname)
    }
   
    render() {
     
        return (
            <div className="userinfo">
                <Avatar className="avatar" onClick={(ev)=>this.props.showModal()} size={50} style={{ backgroundColor: '#87d068' }} icon="user" />
                {
                    this.props.userStore.userData.realname?<p>{this.props.userStore.userData.realname}</p>:<p>未登录</p>
                }
                
            </div>
        )
    }
}

export default UserInfo;