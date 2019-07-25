import React, { Component } from 'react';
import { Button } from 'antd';
import './index.less';
class AritcleInput extends Component {
    constructor(props){
          super(props)
          state = {
              title:props.title
          }
    }
    render() {
        return (
            <div className="AritcleInput">
                  <input type="text" placeholder="请输入文章标题" value={this.state.title}/>
            </div>
        )
    }
}

export default AritcleInput ;