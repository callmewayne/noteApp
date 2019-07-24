import React, { Component } from 'react'
import { Avatar,Button,Icon } from 'antd'
import SiderbarList from '../../../components/SiderbarList'
import { windowManager} from '../../../modules/kernel/windowManager'
import './index.less'

export default class Siderbar extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount(){
      
    }
    render() {
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
                    <Button className="newButton" type="primary" shape="round" icon="plus" size='large'>
                                  新文档
                     </Button>
                </header>
                <SiderbarList>
                         
                 </SiderbarList>
            </div>
        )
    }
}
