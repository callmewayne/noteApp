import React, { Component } from 'react';
import moment from 'moment'
import { Icon ,Menu,Dropdown } from 'antd';
import './index.less';
class ArticleItem extends Component {
    constructor(props){
        super(props)
    }
   
    render() {
        const menu = (munuid)=> {
            return (
                <Menu>
                <Menu.Item key={munuid}  onClick={(ev)=>{this.props.removeArticle(ev)}}>删除</Menu.Item>
              </Menu>
            )
        }
           
          
         
        return (
            <Dropdown overlay={menu(this.props.data.id)} id={this.props.data.id} trigger={['contextMenu']}>
            <div className="ArticleItem" onClick={ev=>{this.props.getDetail(this.props.data)}}>
                 <p className="title" >
                 <Icon style={{"color":'#4491cd'}}  type={this.props.data.type=='txt'?'form':'medium'} /><span> {this.props.data.title}</span>
            
                 </p>
                 <p className="description multi-ellipsis">
                   {
                       this.props.data.description==null? this.props.data.content.substring(0,20):''
                   }
                 </p>
                 <img  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>
                 <p className="createtime">
                    <span className="time">
                       {moment(this.props.data.lastmodifytime).format('YYYY-MM-DD')}
                    </span>
                    <span className="size">
                        {
                            // this.props.data.size
                        }
                    </span>
                 </p>
            </div>
            </Dropdown>
        )
    }
}

export default ArticleItem ;