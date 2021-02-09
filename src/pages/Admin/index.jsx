import React, { Component } from 'react'
import { Redirect,Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';

import Header from '../../components/Header'
import LeftNav from '../../components/Left-nav'
import memoryUtils from '../../utils/memoryUtils'
import Home from '../../pages/Home'
import Category from '../../pages/Category'
import Product from '../../pages/Product'
import Role from '../../pages/Role'
import User from '../../pages/User'
import Bar from '../../pages/Chart/Bar'
import Line from '../../pages/Chart/Line'


/**
 * the Admin component displays all different components.
 */
const {  Footer, Sider, Content } = Layout;
export default class Admin extends Component {
    render() {
        //get the user in the memory
        const user = memoryUtils.user
        //check if the user still exists
        //if the user does not exist, go back to the login page
        if (!user.username) { 
        // Rendering a <Redirect> will navigate to a new location.
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{ height: '100%' }}>
                {/* load the LeftNav component */}
                <Sider>
                     <LeftNav/>   
                </Sider>
                <Layout >
                    {/* load the Header component */}
                    <Header/>
                    <Content >
                    <Switch>
                        <Route path='/home' component={Home}/>
                        <Route path='/category' component={Category}/>
                        <Route path='/product' component={Product}/>
                        <Route path='/role' component={Role}/>
                        <Route path='/user' component={User}/>
                        <Route path='/charts/bar' component={Bar}/>
                        <Route path='/charts/line' component={Line}/>
                        <Route path='/charts/pie' />
                        {/* if no matches, go the main page */}
                       <Redirect to='/home'/>
                    </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>Footer</Footer>
                </Layout>
             </Layout>
           
        )
    }
}
