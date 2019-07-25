import React, { Component } from 'react'
import { Input } from 'antd';

import AritcleInput from '../../../components/ArticleInput'
import './index.less'
import { observer, inject } from 'mobx-react';

@inject('editorStore')
@observer
export default class Editor extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     data:this.props.editorStore.ArticleData
        // }

    }

    componentDidMount() {
        let { editorStore } = this.props
        console.log(this.props.editorStore.ArticleData)
     

      

    }



    render() {
        let editorStore = this.props.editorStore

        return (
            <div className="Editor">
                <header className="header">

                </header>
                <AritcleInput title={editorStore.ArticleData.title} />
                <div className="toolbar">

                </div>

                <div className="wangEditor" id="wangEditor">

                </div>

            </div>
        )
    }
}
