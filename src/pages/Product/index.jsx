import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'


//import the children components
import Home from './Home'
import AddUpdate from './AddUpdate'
import Detail from './Detail'

/**
 * the Product component 
 * 1.displays all the product
 * 2.searchs products by name or description
 * 3.adds a new product
 * 4.checks product details
 * 5.updates a product
 * 6,change the product status
 * 
 */
export default class Product extends Component {
    render() {
        return (
            <Switch>
                {/* exact=true  will only match if the path matches the 
                location.pathname exactly.*/}
                <Route path="/product" component={Home} exact/>
                <Route path="/product/addupdate" component={AddUpdate} exact/>
                <Route path="/product/detail" component={Detail} exact/>
                {/* if no path matches, go to the product page */}
                <Redirect to='/product'/>
           </Switch>
        )
    }
}
