import React, { Component } from 'react';
import { Icon } from 'antd';
import './index.less';
class SiderbarList extends Component {
    constructor(props){
        super(props)
        this.state = {
              list:[
                  {   

                      name:'最新文档',
                      icon:'appstore',
                      path:''
                      
                  },
                  {   

                    name:'最新文档',
                    icon:'appstore',
                    path:''
                },
                {   

                    name:'最新文档',
                    icon:'appstore',
                    path:''
                },
                {   

                    name:'最新文档',
                    icon:'appstore',
                    path:''
                }
              ]  
        }
    }
    
    render() {
        return (
            <div className="SiderbarList">
                <ul >
                    { this.state.list.map((item,index)=>{
                        return(
                            <li key={index}>
                                <Icon type={item.icon} />
                                <span>{item.name}</span>  
                            </li>
                        )
                    })}
                </ul>

            </div>
        )
    }
}

export default SiderbarList ;