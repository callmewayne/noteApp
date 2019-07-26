import React, { Component } from 'react'
import { Input } from 'antd';
import AritcleInput from '../../../components/ArticleInput'
import { Scrollbars } from 'react-custom-scrollbars';
import { observer, inject } from 'mobx-react';
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.less'

@inject('editorStore')
@observer
export default class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState:BraftEditor.createEditorState(this.props.editorStore.ArticleData.description),
            currentArtId:this.props.editorStore.ArticleData.id,
            currentArtData:this.props.editorStore.ArticleData
        }
        this.that = this
       
    }

    componentDidMount() {
        let { editorStore } = this.props
        console.log(this.props.editorStore.ArticleData)
     

      

    }
    handleChange(e){
        console.log(e)
     }


    static getDerivedStateFromProps(props, state) {
        if(props.editorStore.initData.id!==state.currentArtId){
            return {
                currentArtData:props.editorStore.initData,
                currentArtId:props.editorStore.initData.id,
                editorState:BraftEditor.createEditorState(props.editorStore.initData.description)
            }
    
        }
       
        return null

    }
  
    render() {
        let editorStore = this.state.editorStore
         
        return (
            <div className="Editor">
                <header className="header">

                </header>
                <AritcleInput handleChange={this.handleChange} id={this.props.editorStore.ArticleData.id} title={this.props.editorStore.ArticleData.title} />
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
