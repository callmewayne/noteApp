import React, { Component } from 'react'
import { Input } from 'antd';
import AritcleInput from '../../../components/ArticleInput'
import { Scrollbars } from 'react-custom-scrollbars';
import { observer, inject } from 'mobx-react';
import { editorAction } from "../../../actions";
import { StorageManager } from '../../../modules/db/index'
import { utilManager } from '../../../modules/kernel/utilsManager'
import BraftEditor from 'braft-editor'
import Editor from 'for-editor'
import moment from 'moment'
import PubSub from 'pubsub-js'
import * as _ from 'loadsh'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.less'

@inject('editorStore')
@observer
export default class EditorContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            savetime:null,
            saveword:null,
            currentArtData: {},
            mdContent: '',
            val: this.props.editorData.title,
            editorState: this.props.editorData == undefined ? null : BraftEditor.createEditorState(this.props.editorData.content),
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateArticleList = this.updateArticleList.bind(this)
        this.saveArticle = this.saveArticle.bind(this)
        this.handleEditorChange = _.debounce(this.handleEditorChange, 15000)
        this.canSave = false
        
    }

    componentDidMount() {
      
        PubSub.subscribe('getArtDetail', (msg, initdata) => {
            this.canSave = false
            this.setState({
                editorState: BraftEditor.createEditorState(initdata.content),
                currentArtData: initdata,
                mdContent: StorageManager.stripHTML(initdata.content),
                val: initdata.title,
                saveword:StorageManager.stripHTML(initdata.content).length,
                savetime:null
            })
        })
        PubSub.subscribe('addArticle', (msg, initdata) => {
            this.setState({
                editorState: BraftEditor.createEditorState(initdata.content),
                currentArtData: initdata,
                mdContent: StorageManager.stripHTML(initdata.content),
                val: initdata.title,
                saveword:StorageManager.stripHTML(initdata.content).length,
                savetime:null
            })
        })

    }
    modifyData() {
        let modifiData = this.state.currentArtData
        modifiData['id'] = this.state.currentArtData.id
        modifiData['lastmodifytime'] = new Date().getTime()
        modifiData['content'] = this.state.currentArtData.type == 'txt' ? this.state.editorState.toHTML() : this.state.mdContent
        modifiData['title'] = this.state.val
        return modifiData
    }
    saveArticle(data) {
        editorAction.saveArticle(data).then(res => {
            console.log(res)
        })
    }
    handleChange(e) {
        this.setState({
            val: e.target.value
        })

    }
    handleEditorChange(editorState) {
    
        this.submitContent()
    }

    handleThrottle(editorState) {
        this.setState({ editorState })
        if (this.canSave == true) {
            this.handleEditorChange(editorState);
        }
        this.canSave = true
    }

    handleMDChange(e) {
        // let mdData = this.state.currentArtData
        // mdData.data.content = e
        this.setState({
            mdContent: e
        })
    }
    static getDerivedStateFromProps(props, state) {
        if ((props.editorData.id !== state.currentArtData.id) && (props.editorData.id != undefined)) {
            return {
                currentArtData: props.editorData,
                currentArtId: props.editorData.id,
                editorState: BraftEditor.createEditorState(props.editorData.content)
            }

        }

        return null

    }
    updateArticleList() {
        let data = this.modifyData()
        PubSub.publish('updateTitle', data)
        //  this.saveArticle(data)
    }
    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        // const htmlContent = this.state.editorState.toHTML()
        // console.log(htmlContent)

        let data = this.modifyData()
        PubSub.publish('updateTitle', data)
        let savetime = moment().format('HH:mm:ss')
     this.setState({savetime})
    }
    render() {
        let { val, currentArtData, mdContent, editorState } = this.state
        let that = this
        return (

            <div className="Editor">
                <header className="header">

                </header>
                <AritcleInput handleChange={this.handleChange} title={val} />

                <Scrollbars>
                    <div id="Editor"  >
                        <BraftEditor
                        //onClick={this.submitContent}
                            value={editorState}
                            onChange={this.handleThrottle.bind(this)}
                            onSave={this.submitContent}
                        />
                        {/* {
                       currentArtData.type=='md'? 
                       <Editor  value={mdContent}  onClick = {this.updateArticleList} onChange={(ev) => this.handleMDChange(ev)} />
                        : 
                    
                      
                    } */}

                    </div>

                </Scrollbars>
                 <div className="statusZone">
                       <div className="savetime">
                       {
                           this.state.savetime?<span>自动保存于：</span> :null
                       }
                            <span>{this.state.savetime}</span>
                       </div>
                       <div  className="saveword">
                             字数：<span>{this.state.saveword}</span>    
                       </div>
                 </div>

            </div>
        )
    }
}
