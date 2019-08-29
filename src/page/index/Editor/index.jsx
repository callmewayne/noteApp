import React, { Component } from 'react'
import { Input } from 'antd';
import AritcleInput from '../../../components/ArticleInput'
import { Scrollbars } from 'react-custom-scrollbars';
import { observer, inject } from 'mobx-react';
import { editorAction } from "../../../actions";
import { StorageManager } from '../../../modules/db/index'
import BraftEditor from 'braft-editor'
import Editor from 'for-editor'
import PubSub from 'pubsub-js'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.less'

@inject('editorStore')
@observer
export default class EditorContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentArtData: {},
            mdContent:'',
            val:this.props.editorData.title,
            editorState:this.props.editorData==undefined?null: BraftEditor.createEditorState(this.props.editorData.content),
        }
        
        this.handleEditorChange = this.handleEditorChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateArticleList = this.updateArticleList.bind(this)
        this.saveArticle = this.saveArticle.bind(this)

    }

    componentDidMount() {
        PubSub.subscribe('getArtDetail', (msg, initdata) => {
            this.setState({
                editorState: BraftEditor.createEditorState(initdata.content),
                currentArtData: initdata,
                mdContent:StorageManager.stripHTML(initdata.content) ,
                val: initdata.title
            })
        })
        PubSub.subscribe('addArticle', (msg, initdata) => {
            let reciveData = initdata.data
            this.setState({
                editorState: BraftEditor.createEditorState(reciveData.content),
                mdContent:StorageManager.stripHTML(reciveData.content) ,
                currentArtData: initdata,
                val: reciveData.title
            })
        })
        let self = this
        function keyDown(e) {
            var currKey = 0;
            currKey = e.keyCode || e.which || e.charCode;
            if (currKey == 83 && (e.ctrlKey || e.metaKey)) {
                e.preventDefault()
                let data = self.modifyData()
                //   self.saveArticle(data)
            }
        }
        document.onkeydown = keyDown


    }
    modifyData(){
        let modifiData = this.state.currentArtData
        modifiData['id'] = this.state.currentArtData.id
        modifiData['lastmodifytime'] = new Date().getTime()
        modifiData['content'] =this.state.currentArtData.type=='txt'? this.state.editorState.toHTML():this.state.mdContent
        modifiData['title'] = this.state.val
        return modifiData
    }
    saveArticle(data){
        editorAction.saveArticle(data).then(res=>{
            console.log(res)
       })
    }
    handleChange(e) {
        this.setState({
            val: e.target.value
        })

    }
    handleEditorChange(editorState) {
        this.setState({ editorState })
    }
    handleMDChange(e){
        // let mdData = this.state.currentArtData
        // mdData.data.content = e
        this.setState({
            mdContent: e
        })   
    }
    static getDerivedStateFromProps(props, state) {
        if((props.editorData.id!==state.currentArtData.id) && (props.editorData.id!=undefined) ){
            return {
                currentArtData:props.editorData,
                currentArtId:props.editorData.id,
                editorState:BraftEditor.createEditorState(props.editorData.content)
            }

        }

        return null

    }
    updateArticleList(){
        let data = this.modifyData()
       PubSub.publish('updateTitle',data)
     //  this.saveArticle(data)
    }
  submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        // const htmlContent = this.state.editorState.toHTML()
        // console.log(htmlContent)

        let data = this.modifyData()
       PubSub.publish('updateTitle',data)
        // const result = await saveEditorContent(htmlContent)
    }
    render() {
        let { val,currentArtData,mdContent,editorState} = this.state
        return (

            <div className="Editor">
                <header className="header">

                </header>
                <AritcleInput handleChange={this.handleChange}  title={val} />

                <Scrollbars>
                <div id="Editor" onClick={this.submitContent}>
                <BraftEditor
                            value={editorState}
                            onChange={this.handleEditorChange}
                            onSave={this.submitContent}
                        />
                    {/* {
                       currentArtData.type=='md'? 
                       <Editor  value={mdContent}  onClick = {this.updateArticleList} onChange={(ev) => this.handleMDChange(ev)} />
                        : 
                    
                      
                    } */}
                    
                    </div>

                </Scrollbars>


            </div>
        )
    }
}
