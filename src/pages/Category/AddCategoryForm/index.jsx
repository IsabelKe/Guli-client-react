import React, { Component } from 'react'
import { Select,Form,Input } from 'antd';
import PropType from 'prop-types'


//get the Item and Option from the Form component and Select component
const { Item } = Form
const { Option } = Select

/**
 * AddCategoryForm components displays the add category form
 */
export default class AddCategoryForm extends Component {
    
    //define the constraint for the props received from the parent component
    static propTypes={ 
        categories: PropType.array.isRequired,
        parentId: PropType.number.isRequired,
        setForm:PropType.func.isRequired
    }
    //create a ref for the Form component
    formRef = React.createRef();

    componentDidMount() {
        //pass this form.current back to the parent component
        this.props.setForm(this.formRef.current)
    }
    render() {
          //get the data from the parent component
        const { categories } = this.props
        return (
            <Form ref={this.formRef}>
                <Item label="Belongs to:"
                    rules={[{ required: true }]}
                    name="parentId"
                    initialValue="0"
                >
                 {/*  ask the user to choose a main category */}
                    <Select
                        placeholder="Select the main category"
                    >
                        <Option value="0" key="0">Main Categories</Option>
                        {
                            categories.map(c =>
                            <Option key={c.id} value={c.id}>{c.name}</Option>)
                        }
                        </Select>
                </Item>
                {/* fill in a new cateogry name */}
                <Item label="New Category Name"
                    name="categoryName"
                     rules={[{ required: true,message:"Please enter the category name" }]}
                >
                    <Input placeholder="Please enter the category name" ></Input>
                </Item>
            </Form>
        )
    }
}
