import React, { Component } from 'react';
import axios from 'axios'
import {  Form, Icon, Input, Button, Checkbox,message  } from 'antd';
import {userAction}  from '../../actions'
import './index.less';
const error = () => {
    message.error('登陆失败!');
  };
class LoginForm extends Component {
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            userAction.login('/api/user/login',{
                username:values.username,
                password:values.password
            }).then(res=>{
                console.log(res)
                if(res.code==200){
                    this.props.handleOk()
                }else{
                    error()
                }
            })
            console.log('Received values of form: ', values);
          }
        });
      };
    
      render() {
        const { getFieldDecorator } = this.props.form;
       
          
        return (
            <div className="login-form">

           
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
             
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
          
            </Form.Item>
          </Form>
          </div>
        );
      }
    }
    
    

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default WrappedNormalLoginForm ;