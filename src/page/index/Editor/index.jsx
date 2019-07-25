import React, { Component } from 'react'
import { Input } from 'antd';
import WangEditor from 'wangeditor';
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
        this.editor = new WangEditor('.toolbar', '#wangEditor')

    }

    componentDidMount() {
        let { editorStore } = this.props
        console.log(this.props.editorStore.ArticleData)
     

        //  var editor = new WangEditor('.toolbar', '#wangEditor')
        this.editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
        this.editor.customConfig.lang = {
            '设置标题': 'head',
            '正文': 'p',
            '链接文字': 'link text',
            '链接': 'link',
            '上传图片': 'upload image',
            '上传': 'upload',
            '创建': 'init'
            // 还可自定添加更多
        }
        this.editor.customConfig.colors = [
            '#000000',
            '#eeece0',
            '#1c487f',
            '#4d80bf',
            '#c24f4a',
            '#8baa4a',
            '#7b5ba1',
            '#46acc8',
            '#f9963b',
            '#ffffff'
        ]
        // 字号
        this.editor.customConfig.fontsizes = {
            // 格式：'value': 'title'
            1: '10px',
            2: '13px',
            3: '16px',
            4: '19px',
            5: '22px',
            6: '25px',
            7: '28px'
        };
        this.editor.create()
        this.editor.txt.html(this.props.editorStore.ArticleData.description)

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
