import React, { Component } from 'react';
import { Icon } from 'antd';
import './index.less';
class ArticleItem extends Component {
    constructor(props){
        super(props)
        
    }
    render() {
        console.log(this.props.data)
        return (
            <div className="ArticleItem" >
                 <p className="title">
                 <Icon style={{"color":'#4491cd'}}  type={this.props.data.type=='txt'?'form':'medium'} /><span> {this.props.data.title}</span>
                 </p>
                 <p className="description multi-ellipsis">
                   {
                       this.props.data.description
                   }
                 </p>
                 <img  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>
                 <p className="createtime">

                 </p>
              
            </div>
        )
    }
}

export default ArticleItem ;