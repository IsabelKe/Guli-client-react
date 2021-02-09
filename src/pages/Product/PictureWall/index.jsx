import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload,Modal,message} from 'antd'
import { PlusOutlined} from '@ant-design/icons'


/*
for manage product picture
*/
import {BASE_IMG_PATH, UPLOAD_IMG_NAME} from '../../../utils/constants'


/**
 * defines a PictureWall component that uploades product pictures
 */
export default class PictureWall extends Component {

    //define the propTypes rule 
    static propTypes = {
        //it is not required because some products may not have images
        imgs:PropTypes.array
    };

    constructor(props) { 
        super(props);
        let fileList = [];
        //if imgs has been passed here
       // get the imgs that passed from the parent component
        const imgs = this.props.imgs;
        if (imgs) { 
            fileList =[{
                uid: -1,
                name: imgs,
                status: 'done',
                url:BASE_IMG_PATH+imgs
            }];
        }

    this.state = {
        previewVisible: false,//do not display preview big picture
        previewImage: '',//big image url
        fileList:fileList
    } 
  };

    /**
     * close the preview image window
     */
  handleCancel = () => this.setState({ previewVisible: false });

    /**
     * preview the image
     * @param {*} file will be displayed
     */
    handlePreview = async file => {
    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    // }
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

    /***
     * file: the current file
     * fileList: the file array
     */
    handleChange = ({ file, fileList }) => {
        console.log("handle change", file, fileList);
        console.log(file.status)
        this.setState({ fileList })
    };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
      );
      
 const URL="http://localhost:8080/api/v1/picture/"
    return (
      <>
        <Upload
        //Uploading URL
       
        action={URL}
         //File types that can be accepted.
        accept="image/*"  
        //The name of uploading file
        name={UPLOAD_IMG_NAME}
        //picture display format        
        listType="picture-card"
        //List of files that have been uploaded
        fileList={fileList}
        //A callback function, 
        // will be executed when file link or preview icon is clicked
        onPreview={this.handlePreview}
        //A callback function, can be executed when uploading state is changing,       
        onChange={this.handleChange}
            >
            {/* can only upload 3 pictures */}
          {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            
        {/*use Modal to display preview image  */}
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }

}
