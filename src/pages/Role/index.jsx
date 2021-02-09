import React, { Component } from 'react'
import { Card, Button, Table,Modal,message } from 'antd'



import { reqRoles,reqAddRole,reqUpdateRole } from '../../api/apifunction'
import AddForm from './Add-form'
import AuthForm from './Auth-form'
import memoryUtils from '../../utils/memoryUtils'


/**
 * Role component
 * 1.displays all roles
 * 2.add a new role
 * 3.manages permissions for a role
 */
export default class Role extends Component {
    state = {
        roles: [],//all roles
        role: {},//the selected role
        columns: '',//table columns
        showAddForm: false,//mark the status of the add-form
        showAuthForm:false//mark the status of the auth-form
    }


    constructor(props) { 
        super(props);
        this.auth = React.createRef();
    }
/**
 * initialize the table columns
 */
    initialColumns = () => {
        const columns = [
            {
                title: 'Role Name',
                dataIndex: 'roleName'
            },
            {
                title: 'Create Time',
                dataIndex: 'createTime'
            },
            {
                title: 'Auth Time',
                dataIndex: 'authTime'
            },
            {
                title: 'Authorizer ',
                dataIndex: 'authName'
            },
        ]
        this.setState({ columns })
    };

    /**
     * get the roles
     */
    getRoles = async () => { 
        //get server response
        const response = await reqRoles();
        //get the result status
        const data = response.data;
        const result =data.result;
        const roles = data.data;
        if (result === 'SUCCESS') {
            this.setState({ roles });
        }
        else { 
            message.error(data.message);
        }
    }

    onRow = (role) => { 
        return {
            onClick: event => { 
                //store the selected role in the state
                this.setState({ role });
                console.log(role.roleId);
            }
        }
    }

    //add a new role
    addRole = async() => { 
        //hide the add form
        this.setState({ showAddForm: false });
        //get the new role name
        const { roleName } = this.form.getFieldsValue();
        //add this role name
        const response = await reqAddRole(roleName);
        //get the response data
        const responseData = response.data;
        //get the result status
        const result = responseData.result;
        //check if the add action is succeed
        if (result === 'SUCCESS') {
            this.setState({ roles: responseData.data })
            message.success('New Role Added!')
        }
        else { 
            //display the returned message from server
            message.error(responseData.message)
        }
        //clear the form input value
        this.form.resetFields();
    }

    //reset the role's permissions
    setPermission = async() => { 
        //hide the auth-form
        this.setState({ showAuthForm: false });
        //get the current role
        const role = this.state.role;
        //get the newest selected role permissions
        const menus = this.auth.current.getMenus();
       //get the current logged user
        const userName = memoryUtils.user.userName;
        //send request to update this role
        const response = await reqUpdateRole(role.roleId, userName, menus);
        const responseData = response.data;
        if (responseData.result === 'success') {
            this.setState({ roles: responseData.data });
            message.success("Permissions updated!");
        }
        else { 
            message.error(responseData.message);
        }
    }

    //initialize the table columns and load all roles
    componentDidMount() { 
        this.initialColumns();
        this.getRoles();
    }

    render() {
        //get the data inside the state
        const { columns, roles, role,showAddForm,showAuthForm } = this.state;
        const title = (
            <span>
                {/* click Add New Role will show the add role form */}
                <Button type='primary' onClick={()=>this.setState({showAddForm:true})}>Add New Role</Button>&nbsp;&nbsp;
                 {/* show the auth-form */}
                <Button type='primary' disabled={!role.roleId}
                    onClick={() => this.setState({showAuthForm:true}) }>Set Permissions</Button>
            </span>
        );

        
        return (
            <Card title={title} >
                <Table
                    bordered
                    rowKey='roleId'
                    columns={columns}
                    dataSource={roles}
                    rowSelection={{ type: 'radio', selectedRowKeys:[role.roleId] }}
                    onRow={ this.onRow}
                >

                </Table>
            {/* display AddForm component */}
                <Modal 
                    title='Add New Role'
                    visible={showAddForm}
                    onCancel={() => {
                        this.setState({ showAddForm: false })
                         this.form.resetFields()
                    }}
                    onOk={ this.addRole}
                >
                    {/*  passs function setForm with a parameter to  AddForm component*/}
                    <AddForm setForm={ (form)=>this.form=form}/>
            </Modal>
            
                 {/* display AuthForm component */}
                <Modal
                    title="Set Permissions"
                    visible={showAuthForm}
                    onCancel={() => {
                        this.setState({ showAuthForm: false })
                    }}
                    onOk={ this.setPermission}
                >
                    {/* displays the auth-form, and passes the current role to the auth-form */}
                    <AuthForm role={role} ref={this.auth}/>
                </Modal>
            </Card>
        )
    }
}
