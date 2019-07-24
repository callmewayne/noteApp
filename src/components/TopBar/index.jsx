import React, { Component } from 'react'
import { Icon,Menu ,Dropdown} from 'antd';
import {windowManager} from '../../modules/kernel/windowManager'
import './index.less'
class TopBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMax:false
        }
        this.setSize = this.setSize.bind(this)
        this.menu = this.menu.bind(this)
    }
    close() {
        windowManager.closeWindow()
    }
    minimize() {
        windowManager.minimize()

    }
    openDevTool(){
        windowManager.openDevTool()
    }
    setSize(){
        if(windowManager.isMaximized()){
            windowManager.setSize()
            this.setState({
                isMax : false
            })
        }else{
            this.setState({
                isMax : true
            })
            windowManager.maximize()
           
        }
    }
    menu(){
        return (
            <Menu>
              <Menu.Item key="0">
                <a href="#" onClick={this.openDevTool}>  打开调式工具</a>
              </Menu.Item>
              <Menu.Item key="1">
                <a href="http://www.taobao.com/">2nd menu item</a>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="3">3rd menu item</Menu.Item>
            </Menu>
        )
    }
    render() {
        return (
            <div className="topbar">
                {/* <Icon className="topbar-icon" type="more" /> */}
                <Dropdown className="topbar-icon" overlay={this.menu} trigger={['click']}>
                      <Icon type="more" />
                </Dropdown>
                <Icon className="topbar-icon" type="minus" onClick={this.minimize} />
                <Icon className="topbar-icon" type={this.state.isMax?"shrink":"arrows-alt"}  onClick={this.setSize} />
                <Icon className="topbar-icon" type="close" onClick={this.close} />
            </div>
        )
    }
}


export default TopBar
