import React, { Component } from 'react'
import { Form, Input } from 'antd';
import PropTypes from 'prop-types'

//get the Item and Option from the Form component and Select component
const { Item } = Form

/**
 * UpdateCategory handles the category updating
 */
export default class UpdateCategory extends Component {
    //define the props constraints passed from the Category component
        static propTypes = {
            categoryName: PropTypes.string,
            setForm: PropTypes.func.isRequired
    }
    //create a ref for the Form
     formRef = React.createRef();
    
    
    componentDidMount() { 
        //pass this form.current back to the parent component
        this.props.setForm(this.formRef.current);
    }

    render() {
         //get the categoryName from the parent component and display it here
        const categoryName=this.props.category
        return (
            <Form ref={this.formRef}>
                {/* ask the user to fill in a new category or sub-category name */}
                <Item label="New Category Name"
                    name="categoryName"
                    initialValue={categoryName}
                    rules={
                        [{
                            required: true,
                            message: "Please enter the category name"
                        }]}
                >
                    <Input placeholder="Please enter the category name" ></Input>
                </Item>
            </Form>
        )
    }
}
