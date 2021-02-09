import React, { Component } from 'react'

import { BrowserRouter,Switch,Route} from 'react-router-dom'
import 'antd/dist/antd.less'

import Admin from './pages/Admin/index'
import Login from './pages/Login/index'

export default class App extends Component {

   /**
    * @description
    * @author (Set the text for this tag by adding docthis.authorName to your settings file.)
    * @date 2021-01-03
    * @returns
    * @memberof App
    */
   render() {
        return (
            <BrowserRouter>
                <Switch>{/*only match one route */ }
                <Route path='/login' component={Login}></Route>
                <Route path='/' component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
