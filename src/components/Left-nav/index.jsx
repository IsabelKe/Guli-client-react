import React, { Component } from 'react'
import { Menu } from 'antd';

import { Link, withRouter} from 'react-router-dom'
import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'


/**
 * LeftNav component displays the left navigation menus
 */
const { SubMenu } = Menu;
class LeftNav extends Component {

  /**
   * generate an array of Menu components
   * @param {*} menuList values,keys,icons for the navigation menus
   */
  getMenuNodes = (menuList) => { 
    // get the current path
    const path = this.props.location.pathname
    return menuList.map(item => { 
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            {/* link to the path */}
            <Link to={item.key}>
              {item.title}
            </Link>
          </Menu.Item>
        )
      }
      //if this menu has submenus, callback itself to generate submenus
      else {
        //
        if(item.children.find(cItem => path.indexOf(cItem.key) === 0)) {
          this.openKey = item.key
        }
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
  
  componentDidMount(){
    //display the left navigation menus after the first rendering
    this.menuNodes = this.getMenuNodes(menuList)
}
  
  render() {
    //get the current path
    let selectedKey = this.props.location.pathname
    //the Product menu should be highlighted for /product/detail, /product/addupdate
    if (selectedKey.indexOf("/product") === 0) { 
      selectedKey = '/product';
    }
    const openKey = this.openKey
        return (
        <div className='left-nav'>
        
        {/* click the Logo will be directed to the home page */}
         <Link className='left-nav-header' to='/'>
                <img src={logo} alt="logo" /> 
                <h1>Guli Server Management</h1>    
        </Link>
                
        <Menu
              selectedKeys={[selectedKey]}
              defaultOpenKeys={ [openKey]}
              mode="inline"
              theme="dark">
              {/* display the left menus */}
              {this.getMenuNodes(menuList)}
        </Menu> 
      </div>
        )
    }
}

//withRouter(LeftNav) gives LeftNav access to this.props.location
export default withRouter(LeftNav)


