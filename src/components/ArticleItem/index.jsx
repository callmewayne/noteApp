import React, { Component } from 'react';
import moment from 'moment'
import { Icon } from 'antd';
import './index.less';
class ArticleItem extends Component {
    constructor(props){
        super(props)
    }
   
    render() {
       
        return (
            <div className="ArticleItem" onClick={ev=>{this.props.getDetail(this.props.data.id)}}>
                 <p className="title" >
                 <Icon style={{"color":'#4491cd'}}  type={this.props.data.type=='txt'?'form':'medium'} /><span> {this.props.data.title}</span>
                 </p>
                 <p className="description multi-ellipsis">
                   {
                       this.props.data.description
                   }
                 </p>
                 <img  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>
                 <p className="createtime">
                    <span className="time">
                       {moment(this.props.data.createtime).format('YYYY-MM-DD')}
                    </span>
                    <span className="size">
                        {
                            this.props.data.size
                        }
                    </span>
                 </p>
            </div>
        )
    }
}

export default ArticleItem ;