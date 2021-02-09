import React, { Component } from 'react'
import { Form, Input, Button,Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect} from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import './login.less'
import { userLogin } from '../../api/apifunction'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'   

/**
 * Login component handels user login
 */
export default class Login extends Component {
    //defines the admin variable
    state = { admin: '' };
    

    /**
     * this function handles user login
     * @param {} values 
     */
    onFinish = async (values) => { 
        console.log('Received values of form: ', values);
        //get the username and password from the the form
        const { username, password } = values;

        //call the userLogin method 
        const response = await userLogin(username, password);
        const data = response.data;
      //check if the user exists or not
        console.log(data.result)
        if (data.result === 'FAILED') {
            message.error(data.message);
        }
        else { 
            const user = data.data;
            storageUtils.saveUser(user)
            //store the user in the memory and go to the main page
            memoryUtils.user = user
            //go to the main page
            this.props.history.replace("/")
        }
    }
   
    // onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
    // };
    
    render() {
            //check if the user already login
        if (memoryUtils.user.username) { 
            //exists, go to the home page
            return <Redirect to='/'/>
        }
            return (
                <div className='login'>
                    <header className='login-header'>
                        {/* must import the image logo first, then use it here */}
                        <img src={logo} alt="logo" />
                        <h1>React Project: Backend Management System</h1>
                    </header>
                    {/* Login form */}
                    <section className='login-content'>
                        <h3>User Login</h3>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                            >
                        <Form.Item
                            name="username"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                            ]}
                        > 
                     <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password"/>
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                             <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="www.baidu.com">
                            Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                            </Button>
                            Or <a href="www.baidu.com">register now!</a>
                        </Form.Item>
                        </Form>
                    </section>
                </div>
            )
        }
    }

