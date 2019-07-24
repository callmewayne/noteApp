import React, { Component } from 'react';
import { Button } from 'antd';
import './index.less';
class AritcleInput extends Component {
    render() {
        return (
            <div className="AritcleInput">
                  <input type="text" placeholder="请输入文章标题"/>
            </div>
        )
    }
}

export default AritcleInput ;