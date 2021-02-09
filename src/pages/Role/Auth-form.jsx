import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Tree } from 'antd'

import menuList from '../../config/menuConfig'

const Item = Form.Item
const { TreeNode } = Tree


export default class AuthForm extends PureComponent {
    static propTypes = {
        //the parent component will pass a role object to this form component
        role: PropTypes.object
    };


    //the parent component passes a role object to this child component
    constructor(props) { 
        super(props);
        this.state = {
            myRef: React.createRef(),
            role: {},//the passed role
            checkedKeys:this.props.role.menus,//initialize the default checked menus
            //treeNodes: this.generateTreeNodes(menuList),
            treeData:this.generateTreeData(menuList)
        };
    }
    //generates the tree data
    generateTreeData = (menuList) => {
       return menuList.map(item => { 
            return ({
                title: item.title,
                key: item.key,
                children: item.children ? this.generateTreeData(item.children) : null
            });
        });
        
    }

    
    //generates the tree nodes
    generateTreeNodes = (menuList) => { 
        return menuList.reduce((pre, item)=> { 
            pre.push(
                <TreeNode title={item.title} key={ item.key}>
                    { item.children ? this.generateTreeNodes(item.children):null}
                </TreeNode>
            )
            return pre
        },[]);
    }

    onCheck = (checkedKeys) => { 
        this.setState({ checkedKeys });
    }

    //return the selected menus to the parent component
    getMenus = () => this.state.checkedKeys
    

    static getDerivedStateFromProps(props, state) { 
       
        if (state.myRef.current !== null)
        {
            //only update the default selected menus when the role is changed
            if (state.myRef.current.props.value !== props.role.roleName) { 
                state.checkedKeys = props.role.menus;
            }
        }
        return null;
    }

   
  
    render() {
        const { role} = this.props;
        //get the permissions of the current role
        //this.setState({checkedKeys:role.menus});
        const { treeData,checkedKeys } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 }, // 左侧label 的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
            }
        return (
            <div>
                <Item label='Role Permissions' {...formItemLayout}>
                    <Input value={role.roleName} disabled ref={ this.state.myRef}/>
                </Item>
                <Tree
                    checkable//Add a Checkbox before the treeNodes
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                    treeData={ treeData}
                  >
                </Tree> 
            </div>
        )
    }
}
