import React, { Component } from 'react'
import { Input } from 'antd';
import AritcleInput from '../../../components/ArticleInput'
import { Scrollbars } from 'react-custom-scrollbars';
import { observer, inject } from 'mobx-react';
import BraftEditor from 'braft-editor'
console.log(BraftEditor)
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.less'

@inject('editorStore')
@observer
export default class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState:BraftEditor.createEditorState(this.props.editorStore.ArticleData.description)
        }

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
                {/* <div className="toolbar">

                </div> */}
                  <Scrollbars>
                  <div  id="wangEditor">
               <BraftEditor
                    value={this.state.editorState}
                    // onChange={this.handleEditorChange}
                    // onSave={this.submitContent}
                />
                </div> 

                  </Scrollbars>
              

            </div>
        )
    }
}
