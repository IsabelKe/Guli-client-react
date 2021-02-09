import React, { Component } from 'react'
import { Card,Button, Input,Form,Cascader} from 'antd'

import { ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from '../../../components/LinkButton'
import { reqCategories } from '../../../api/apifunction'
import PictureWall from '../PictureWall'
import './index.less'

const { TextArea } = Input;
const { Item } = Form;

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 5 },
};

export default class AddUpdate extends Component {

    //the constructor will be called 
    //before the first time rendering this component
    constructor(props) { 
        super(props)
        this.state = {
        categories:[],//store categories
        //options for the Cascader 
        options: [],
        product: props.location.state||{},//receive the product passed from the main list page
        isUpdate: !!props.location.state//!! converts props.location.state to a boolean value
        }
    }
   

    /**
     * generate select options after getting the categories
     */
    generateOptions = () => {
        const { categories } = this.state;
        var options = categories.map(category => {
            var option = (
                {
                    value: category.id,
                    label: category.name,
                    isLeaf: true
                }
            );
            //check if this category has subcategories
            var subOptions;
            if (category.subCategories.length !== 0) {
                subOptions = category.subCategories.map(sub => ({
                    value: sub.id,
                    label: sub.name,
                    isLeaf: true
                }));
                option.isLeaf = false;
                option.children = subOptions;
            }
            return option;
        });
            
       
        this.setState({ options });
    }
    //initalize the options
    // initOptions = async(categories) => { 
    //     //generate the options for main categories
    //     const options = categories.map(c => (
    //         {
    //         value: c.id,
    //         label: c.name,
    //         isLeaf: true
    //         }));
        
    //     // categories.map(c => { 

    //     // });
    //     /*when this page acts as a updating page,
    //     *a product object is passed to this page
    //     */
    //     const { isUpdate, product } = this.state;
    //     //if this product has a sub-category
    //     const { categoryId } = product;
    //     if (isUpdate && categoryId !== 0) { 
    //         //find the sub-categories of this main category
    //         const subCategories = await this.getCategories(categoryId);
    //         //if subcategories exist
    //         if (subCategories && subCategories.length > 0) { 
    //             //generate options for sub-categories
    //             const cOptions = subCategories.map(sub =>( { 
    //                  value: sub.id,
    //                 label: sub.name,
    //                 isLeaf: true
    //             }));
    //             //find the main category
    //         const targetOption = options.find(option=>option.value===categoryId);
    //         //connect the subcategories to this main category
    //         targetOption.children = cOptions;
    //         }
            
    //     }
    //     this.setState({
    //         options
    //     })
    // }


    //get all categories
    getCategories =async (pId) => { 
        const response = await reqCategories(pId)
        const result = response.data;
       
        if (result.result === 'SUCCESS') { 
            const categories = result.data;
            this.setState({ categories }, () => {
                this.generateOptions();
             });
            //request main categories
            // if (pId === 0) {
            //     this.initOptions(categories);
            // }
            // //request sub-categories
            // else { 
            //     return categories;
            // }
           
        }
    }

    //add a ref to the form
    formRef = React.createRef();

    onFinish = (values) => { 
       
       console.log("values")
    }

     onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    }

    addProduct = () => { 
        this.formRef.current.validateFields().then(values => {
            //validate the fields successfully
            console.log("values:" + { values })
        })
            .catch(errorInfo => { 
                //fields has errors
        console.log("errorInfo:"+errorInfo)
            })
        
    }

    //load the sub-categories
    // loadData = async (selectedOptions) => {
    //     //debugger
    //     const targetOption = selectedOptions[selectedOptions.length - 1];
    //     //reset the option status to loading
    //     console.log(targetOption+"==============="+selectedOptions)
    //    // targetOption.loading = true;
    //     const id = targetOption.value;//get the id of this selected category/sub-category
    //     //call method to get sub-categories for the selected category
    //     const subCategories = await this.getCategories(id);
    //      //reset the option status to false
    //     //targetOption.loading = false;
    //     //check if there is any sub-categories under this category
    //     if (subCategories && subCategories.length > 0) {
    //         //generate the sub-category option
    //         const cOptions = subCategories.map(c => ({
    //             value: c.id,
    //             label: c.name,
    //             isLeaf: true,
    //         }));

    //         //add this sub-categories to the selected category
    //         targetOption.children = cOptions;
    //     }
    //     else { 
    //         //if no sub-categories for this category, then change the isLeaf=true
    //         targetOption.isLeaf = true;
    //     }
    //     //update the options state
    //     this.setState({
    //         options:[...this.state.options]
    //     })
    // };


    /*
    Callback when finishing cascader select
    get the value of updated category and sub-category id
     */
    onChange = (selectedOptions) => {
        if (selectedOptions.length > 0) { 
            if (selectedOptions.length > 1) {
                //has a main category and subcategory
                this.newParentId = selectedOptions[0];
                this.newSubId = selectedOptions[1];
            }
            else { 
               this.newParentId = selectedOptions[0];  
            }
        }
    };


    componentDidMount() { 
        this.getCategories(0);
    }
    render() {
        const { options, isUpdate, product } = this.state;
        //get this two from the product object
        const { categoryId, subId } = product;
        //store categoryId and subId for the updating product
        const categoryIds = [];
        if (isUpdate) { 
            //this product belongs to a main category
            if (categoryId === 0) {
                categoryIds.push(subId);
            }
            else { 
                categoryIds.push(categoryId);
                 categoryIds.push(subId);
            }
        }
    const title = (
        <span>
            <LinkButton>
                <ArrowLeftOutlined onClick={ ()=>this.props.history.goBack()}/>
            </LinkButton>
            <span>{ isUpdate?'Update Product':'Add Product'}</span>
        </span>
    );
        return (
            <Card title={title }>
                <Form {...formItemLayout} className='form'  ref={this.formRef}>
                    <Item label='Product Name'
                        name='productName'
                       initialValue={product.productName}
                        rules={
                            [
                                {
                                    required: true,
                                    message: 'Please enter the product name'
                                }
                            ]
                        }
                        
                    >
                       <Input placeholder='Please enter the product name'  />
                    </Item>

                    <Item label='Description'
                        name='desc'
                        initialValue={product.desc}
                        rules={ 
                            [
                                {
                                    required: true,
                                    message: 'Please enter the product description'
                                }
                            ]
                        }
                    >
                       <TextArea placeholder='Please enter the product description'  autoSize />
                    </Item>

                    <Item label='Price'
                        name='price'
                        initialValue={product.price}
                        rules={ 
                            [
                                {
                                    required: true
                                }
                            ]
                        }
                    >
                       <Input type='number'   addonBefore='$' min='0'/>
                    </Item>

                     <Item label='Category'
                        name='category'
                        rules={ 
                            [
                                {
                                    required: true,
                                    message:"Please select a category"
                                }
                            ]
                        }
                    >
                        <Cascader
                            defaultValue={[categoryIds]}
                            options={options}
                            onChange={this.onChange}
                            placeholder="Please select" />,
         </Item>
                    
                    <Item label='Picture'
                        name='imgs'
                        className='form-label'
                    >
                        {/* pass imgs to the  PictureWall component*/}
                        {/* <PictureWall imgs={ product.imgs}/> */}
                    </Item>
                    
           <Item label='Detail'
                        name='detail'
                        initialValue={product.detail}
                        rules={ 
                            [{required: true}]}
                    >
                    <Input placeholder='Please enter the detail'/>
                    </Item> 
                    <Item>
                        <Button type="primary" htmlType="submit" onClick={ this.addProduct}>
                       Add
                         </Button>      
                    </Item>
                      
        </Form>
            </Card>
        )
    }
}
