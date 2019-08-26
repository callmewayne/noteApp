import React, { Component, Fragment } from 'react';
import { Avatar } from 'antd';
import './index.less'
class UserInfo extends Component {
    constructor(props) {
        super(props)
       
    }
   
    render() {
        return (
            <div className="userinfo">
                <Avatar className="avatar" onClick={(ev)=>this.props.showModal()} size={50} style={{ backgroundColor: '#87d068' }} icon="user" />
                {
                    this.props.UserInfo.username?<p>{this.props.UserInfo.username}</p>:null
                }
                
            </div>
        )
    }
}

export default UserInfo;