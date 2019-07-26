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
        this.handleChange = this.handleChange.bind(this)

    }
    handleChange(event) {
        this.setState({ title: event.target.value });
    }
    static getDerivedStateFromProps(props, state) {
        if (props.id !== state.id) {
            return {
                id: props.id,
                title: props.title
            }

        }

        return null

    }
    render() {
        return (
            <div className="AritcleInput">
                <input type="text" placeholder="请输入文章标题" onChange={this.handleChange} value={this.state.title} />
            </div>
        )
    }
}

export default AritcleInput;