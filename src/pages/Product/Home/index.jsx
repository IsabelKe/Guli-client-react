import React, { Component, Fragment } from 'react'
import { Card, Select, Table, Button, Input,message } from 'antd'
import { PlusOutlined} from '@ant-design/icons';
import  LinkButton from '../../../components/LinkButton'
import { reqProducts,reqSearchProducts} from '../../../api/apifunction'
import { PAGE_SIZE} from '../../../utils/constants'

/**
 * Home component for the product page
 */
const Option=Select.Option
export default class Home extends Component {
    state = {
        products: [],//products
        columns: '',
        loading: false,//mark if the page is loading
        searchParam: '',
        // the default value for searchType is productName,
        searchType: 'productName', //productName/desc
         total:0
    };

    //initialize the table columns
    initialColumns = () => { 
        const columns = [
            //first column
            {
                title: 'Product Name',
                dataIndex: 'productName'
            },
            //second column
            {
                title: 'Description',
                dataIndex: 'desc'
            },
             //third column
            {
                title: 'Price',
                dataIndex: 'price',
                render: (price) => <span>${price}</span>
            },
               //fourth column
            {
                title: 'Status',
                dataIndex: 'status',
                width:100,
                render: (status, product) => { 
                    var btnText = 'Off';
                    var statusText = 'On';

                    //status:// 1: 在售, 2: 已下架
                    if (status === 2) { 
                        btnText = 'On';
                        statusText = 'Off';  
                    }

                    status = status === 1 ? 2 : 1;

                    return (
                         <Fragment>
                            <Button type="primary">{btnText}</Button>
                            <span>{ statusText}</span>
                        </Fragment>
                    );
                }
            },

            //fifth column
            {
                title: 'Action',
                width: 100,
                dataIndex: '',
                key: 'x',
                render: (product) =>  
                    <Fragment>
                        <LinkButton
                            // go to the detail page and pass product to it
                            onClick={() => this.props.history.push("/product/detail",product)}>
                            Detail</LinkButton>
                        {/* pass the current product object to the addUpdate page */}
                        <LinkButton onClick={ ()=>this.props.history.push('/product/addupdate',product)}
                        >Update</LinkButton>
                    </Fragment>
            },
        ];
        this.setState({ columns });
    }

    //get all the products
    getProducts = async (pageNum) => { 
        this.pageNum = pageNum;
        //get the searchType and searchParam
        const { searchParam, searchType } = this.state;

        //mark the page is loading
        this.setState({ loading: true });
        let response;
        if (searchParam) {
            response = await reqSearchProducts({ pageNum, pageSize:PAGE_SIZE, searchType, searchParam });
        }
        else { 
             //call the api function to get all the products
            response = await reqProducts( pageNum, PAGE_SIZE);
        }
       
        const result = response.data;
         //after loading data
        this.setState({ loading: false });
        //check if the request is succees
        if (result.result === 'SUCCESS') {
            //get the products
            const data = result.data;
            const { total, categoryList } = data;
            this.setState({
                products: categoryList,
                total
            });

        }
        else { 
            //clear the table when no data returns
            this.setState({ products: [] });
            message.warn(result.message);
        }
    }

    //initialize the table columns and get the first page products
    componentDidMount() { 
        this.initialColumns();
        this.getProducts(1);
    }
    render() {
        const { loading, products,columns,total,searchType,searchParam } = this.state;
        //card title
        const title = (
            <Fragment>
                {/* 
                    display the selected value
                 */}
                <Select value={searchType}
                    //when the option has been changed, update the searchType
                    //in the state
                    onChange={(value) => this.setState({ searchType: value })}>
                    {/* the value has to be productName and desc here, because this matches the attributes name in the Product class */}
                    <Option  value='productName'>Search by Name</Option>
                    <Option  value='desc'>Search by Desc</Option>
                </Select>
                <Input placeholder='key word'
                    style={{ width: 150, marginLeft: 10, marginRight: 10 }}
                    //update the searchParam in the state
                    onChange={(event) =>
                    { this.setState({ searchParam: event.target.value }) }}
                />
                <Button type='primary' onClick={()=> this.getProducts(1)}>Search</Button>
            </Fragment>
        );

        //card right side
        const extra = (
            <Fragment>
                <Button type='primary'
                    onClick={() => this.props.history.push('/product/addupdate')}>
                    <PlusOutlined />
                     Add
                </Button>
                
            </Fragment>
        );
        return (
            <div>
                <Card title={title} extra={ extra}>
                    <Table
                        // loading={this.setState.loading}
                        bordered
                        loading={loading }
                        rowKey='productId'
                        pagination={{
                            defaultPageSize: PAGE_SIZE,
                            total:total,
                            showQuickJumper: true,
                            showSizeChanger: true,
                            onChange: this.getProducts 
                        }}
                        columns={columns}
                        dataSource={products}
                    > 
                    </Table>
                </Card>
            </div>
        )
    }
}
