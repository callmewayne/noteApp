import React, { Component } from 'react';
import { Button } from 'antd';
import './index.less';
class AritcleInput extends Component {
    constructor(props){
          super(props)
          this.state = {
              title:props.title
          }
      
    }
    handleChange(e){
        console.log(e)
           }
    render() {
        return (
            <div className="AritcleInput">
                  <input type="text" placeholder="请输入文章标题" onChange={ev=>{this.handleChange(ev)}} value={ this.props.title} />
            </div>
        )
    }
}

export default AritcleInput ;