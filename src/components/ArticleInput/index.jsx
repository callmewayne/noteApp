import React, { Component } from 'react';
import { Button } from 'antd';
import './index.less';
class AritcleInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            id: props.id
        }

    }
    // handleChange(event) {
    //     this.setState({ title: event.target.value });
    // }
    static getDerivedStateFromProps(props, state) {
      
        return null

    }
    render() {
        let { handleChange ,title } = this.props
        return (
            <div className="AritcleInput">
                <input type="text" placeholder="请输入文章标题" onChange={(ev=>{handleChange(ev)})} defaultValue={title} />
            </div>
        )
    }
}

export default AritcleInput;