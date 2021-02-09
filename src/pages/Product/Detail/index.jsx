import React, { Component } from 'react'
import { Card, List, } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

import  LinkButton from '../../../components/LinkButton'


const Item = List.Item;

export default class Detail extends Component
{
    render() {
        const { productName, detail, desc, price, pID } = this.props.location.state;
        this.pID = pID;
        const title = (
            <span>
            <LinkButton >
                    <ArrowLeftOutlined onClick={() => this.props.history.goBack()}/>
                </LinkButton>
                <span>Product Detail</span>
            </span>  
        );
        return (
            <Card className='product-detail' title={ title}>
                <List>
                    <Item>
                        <span className='left'>Product Name:</span>
                        <span>{ productName}</span>
                    </Item>
                     <Item>
                       <span className='left'>Product Description:</span>
                        <span>{ desc}</span>
                    </Item>

                    <Item>
                       <span className='left'>Price:</span>
                        <span>${ price}</span>
                    </Item>

                     <Item>
                       <span className='left'>Category:</span>
                        <span>Category</span>
                    </Item>

                    <Item>
                       <span className='left'>Image:</span>
                        <span>Image</span>
                    </Item>
                    <Item>
                       <span className='left'>Detail:</span>
                        <span>{ detail}</span>
                    </Item>
                </List>
            </Card>
        )
    }
}
