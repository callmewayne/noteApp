import React, { Component } from 'react'
import { Input } from 'antd';
import AritcleInput from '../../../components/ArticleInput'
import { Scrollbars } from 'react-custom-scrollbars';
import { observer, inject } from 'mobx-react';
import { editorAction } from "../../../actions";
import BraftEditor from 'braft-editor'
import PubSub from 'pubsub-js'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.less'

@inject('editorStore')
@observer
export default class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentArtData: {},
            val:''
        }
        this.handleEditorChange = this.handleEditorChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        

    }

    componentDidMount() {

        PubSub.subscribe('getArtDetail', (msg, initdata) => {
            let reciveData = initdata.data
            this.setState({
                editorState: BraftEditor.createEditorState(reciveData.content),
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
                let modifiData = self.state.currentArtData.data
                modifiData['id'] = self.state.currentArtData.id
                modifiData['lastmodifytime'] = new Date().getTime()
                modifiData['content'] = self.state.editorState.toHTML()
                modifiData['title'] = self.state.val
                console.log(modifiData)
                editorAction.saveArticle(modifiData).then(res=>{
                   console.log(res)
               })
            }
        }
        document.onkeydown = keyDown


    }
    handleChange(e) {
        this.setState({
            val: e.target.value
        })

        console.log(e.target.value)
    }
    handleEditorChange(editorState) {
        this.setState({ editorState })
    }

    static getDerivedStateFromProps(props, state) {
        // if(props.editorStore.initData.id!==state.currentArtId){
        //     return {
        //         currentArtData:props.editorStore.initData,
        //         currentArtId:props.editorStore.initData.id,
        //         editorState:BraftEditor.createEditorState(props.editorStore.initData.description)
        //     }

        // }

        return null

    }
    updateArticleList(){
        console.log('click')
    }

    render() {
        let editorStore = this.state.editorStore
        let { val } = this.state
        return (

            <div className="Editor">
                <header className="header">

                </header>
                <AritcleInput handleChange={this.handleChange} title={val} />

                <Scrollbars>
                    <div id="wangEditor"  onClick = {this.updateArticleList}>
                        <BraftEditor
                            value={this.state.editorState}
                            onChange={this.handleEditorChange}
                           
                        // onSave={this.submitContent}
                        />
                    </div>

                </Scrollbars>


            </div>
        )
    }
}
