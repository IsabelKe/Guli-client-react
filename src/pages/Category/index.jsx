import React, { Component } from 'react'
import { Card,Button,Table, message,Modal } from 'antd';
import { PlusOutlined,ArrowRightOutlined} from '@ant-design/icons';

import './index.less'
import  LinkButton from '../../components/LinkButton'
import { reqCategories,reqUpdateCategory,reqAddCategory } from '../../api/apifunction'
import AddCategoryForm from './AddCategoryForm'
import UpdateCategory from './UpdateCategoryForm'



/**
 * Category component 
 * 1.displays all the categories
 * 2.update a category name
 * 3.displays sub-categorys for a category
 * 4.add a main category or a sub-category
 */
export default class Category extends Component {
    state = {
        categories: [],//main categories
        subCategories: [],//sub-categories
        parentId: 0,//main category id
        parentName: '',//main category name
        loading: false,//mark if the page is loading
        showStatus: 0//mark if the Add form or the Update form should be displayed
    };
    

    //get the subcategories for this category
    showSubcategories = (category) => {
        //1.update the parentId and parentName in the state
        this.setState({
            parentId: category.id,
            parentName: category.name
        },
            //setState is asynchronous
            //then call getCategories to get sub-categories
            () => {
            this.getCategories(this.state.parentId);
        })
    }
    //initialize the table columns and get the categories from the server
    componentDidMount() {
        this.initColumns();
        this.getCategories(0);
    }

    //initialize the table columns
    initColumns = () => {
        this.columns = [
            {
                title: 'Category Name',
                //the filed name of the category object returned from the server
                dataIndex: 'name'
            },
            {
                width: 350,
                title: 'Action',
                dataIndex: '',
                key: 'x',
                //pass the current category object
                render: (category) =>
                    <span>
                        <LinkButton onClick={()=> this.showUpdateForm(category)}>Update</LinkButton>

                        {/* only display Sub-categories for main category */}
                        {this.state.parentId === 0 ?
                            <LinkButton onClick={() => this.showSubcategories(category)}>Sub-Categories</LinkButton> : null} 
                    </span>   
            },
        ];
    }

    //get the categories
    getCategories = async (parentId) => {
        //before loading data
        this.setState({ loading: true });
        //call the api function to get all the categories
        //find the corresponding categories according to the parentId
       
        const response = await reqCategories(parentId);
        //get the returned data
        const result = response.data;
        //after loading data
        this.setState({ loading: false });
        if (result.result === 'SUCCESS') {
            //get the categories
            const categories = result.data;
            //main categories
            if (parentId === 0) {
                this.setState({ categories });
            }
            else {
                this.setState({ subCategories: categories });
            }  
        }
        else {
            message.warn(result.message);
        }
    }
   
    /**
     * when the suer clicks the Main Category link on the left upper corner, it will 
     * go to the main category page
     */
    showCategories = () => { 
        this.setState({
            parentId: 0,
            parentName: '',
            subCategories: []
        });
    }

    //mark the showStatus=1
    showAddForm = () => { 
        //1 means the Add form will be displayed
        this.setState({showStatus:1})
    }
    //add a new category
    addCategory = async () => {
        //get the data from the add form
        const { parentId, categoryName } = this.form.getFieldsValue();
        //validate the input
        if (categoryName !== "")
        {
        //call method to add the new category
            const response = await reqAddCategory(parentId, categoryName);
        //get the data
            const data = response.data;
            const result = data.result;
        if (result === "SUCCESS") {
            if (parentId === this.state.parentId) {
                this.getCategories(parentId);
            }
            else {
                this.getCategories(0);
            }
            }
            //after add a category, hide the Add form
            this.setState({ showStatus: 0 });
    }     
    }

    //display the update form and receive the category/subcategory on this row
    showUpdateForm = (category) => { 
        //1.store the category
        this.category = category;
        //2 means the Update form will be displayed
        this.setState({ showStatus: 2 });
    }
    //add a new category
    updateCategory =async () => { 
        //1.get the new category name and parentId
        const id = this.category.id;
        const parentId = this.state.parentId;
        const categoryName = this.form.getFieldValue("categoryName");
        //2.validate the input
        if (categoryName !== "") {
            //2.call method to update this category
            const response = await reqUpdateCategory(parentId, id, categoryName);
            //get the returned data
            const result = response.data;
            //if updated successfully,load the category again
            if (result.result === 'SUCCESS') {
                this.getCategories(parentId);
            }
        }
        //3.hide the update form
        this.setState({ showStatus: 0 });
        //this.form.resetFields()
    }
    render() {
        //get the all the data from state
        const { parentId, categories, subCategories, parentName, showStatus } = this.state;
        const category = this.category || {};
        var title = '';
        //the sub tile on the left upper corner
        const subTitle = (
            <span>
                <LinkButton onClick={this.showCategories }>Main Categories</LinkButton>
                <ArrowRightOutlined style={{marginRight:5}}/>
                <span>{ parentName}</span>
            </span>
        )
        parentId === 0 ? title = 'Main Categories' : title = subTitle;
        const extra = (
            <Button type='primary' onClick={this.showAddForm}>
                {/* the + icon */}
                <PlusOutlined />
                Add
            </Button>
        )
        return (
            <div className="site-card-border-less-wrapper">
            <Card title={title} extra={ extra} >
                <Table
                    loading={ this.setState.loading}
                    bordered
                    rowKey='id'
                    pagination={{pageSize: 5, showQuickJumper: true, showSizeChanger: true}}
                    //set the table column names
                    columns={this.columns}
                    //load the data
                    dataSource={parentId===0?categories:subCategories}
                    />
                    
                    {/* add a category */}
                    <Modal
                        //bodyStyle={{height:250,width:450}}
                        title="Add Category"
                        //displays the Add form only when the status is 1
                        visible={showStatus === 1}
                        onOk={this.addCategory}
                        onCancel={() => {
                            this.setState({ showStatus: 0 });
                            //clear the Add form input fields
                            this.form.resetFields();
                        }
                        } 
                    >
                        {/* displays the  AddCategoryForm component*/}
                        <AddCategoryForm
                            categories={categories}
                            parentId={parentId}
                            setForm={form => this.form = form}
                        /> 
                    </Modal>

                    {/* update a category */}
                    <Modal
                        title="Update Category"
                        //only show the Upate form when the status is 2
                        visible={showStatus === 2}
                        onOk={this.updateCategory}
                        onCancel={() => {
                        this.setState({showStatus: 0})
                         this.form.resetFields()
                        }}
                    >
                    {/* 1. pass the category name to the update form  */}
                        <UpdateCategory category={category.name}
                            setForm={form => this.form = form} />
                        </Modal>
            </Card>
        </div>
        )
    }
}
