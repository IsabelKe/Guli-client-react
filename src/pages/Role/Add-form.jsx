import React, { Component } from 'react'
import { Form,Input } from 'antd';
import PropType from 'prop-types'


const { Item } = Form
export default class AddForm extends Component {
     //define the constraint for the params
    static propTypes={ 
        setForm:PropType.func.isRequired
    }

    formRef = React.createRef();
    componentDidMount() {
        //pass this form.current back to the parent component
        this.props.setForm(this.formRef.current)
    }
    render() {
        //define the column format
        const formItemLayout = {
                labelCol: {span: 5},
                wrapperCol: {span: 16}
                }
        return (
            <Form ref={this.formRef} {...formItemLayout}>
                <Item label="Role Name"
                    name="roleName"
                     rules={[{ required: true,message:"Please enter the role name" }]}
                >
                    <Input placeholder="Please enter the role name" ></Input>
                </Item>
            </Form>
        )
    }
}
