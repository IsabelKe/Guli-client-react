import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


import './index.less'
import { reqWeather } from '../../api/apifunction'
import memoryUtils from '../../utils/memoryUtils'
import  storageUtils from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import LinkButton from '../../components/LinkButton'

/**
 * The Header component displays 
 *              the logged user, 
 *              the current time,
 *              the current weather in Calgary,
 *              handles logout
 */
const { confirm } = Modal;
 class Header extends Component {
     state = {
        //the current time
        currentTime: (new Date()).toLocaleString(),
        weatherText: '',
        weatherUrl: ''
    }

    //get the current time
    getCurrentTime = () => { 
      this.timerId= setInterval(() => { 
          this.setState({ currentTime:(new Date()).toLocaleString()})
        },1000)
    }

    //get the current weather information
    /**
     *  "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04n"
        }
     */
    getCurrentWeather = async () => { 
       //fetch weather information from the Open Weather Map API 
        const { main, icon } = await reqWeather('Calgary')
        this.setState({weatherText:main})
        const weatherUrl="http://openweathermap.org/img/w/" + icon + ".png";
        this.setState({ weatherUrl})
    }

    /**
     * get the current menu name
     */
    getCurrentMenu = () => { 
        var path = this.props.location.pathname
        var title;
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            }
            else if (item.children) {
                var cItem = item.children.find(cItem => path.indexOf(cItem.key)===0 )
                //check if the cItem exists
                if (cItem) {
                    title = cItem.title
                }
            }
        });
        return title;
    }
    
     //handle logout
     logout = () => { 
        confirm({
            title: 'Do you Want to logout?',
            icon: <ExclamationCircleOutlined />,
            onOk:()=> {
                //1. clear the local storage and the memory storage
                storageUtils.deleteUser()
                memoryUtils.user = {}
                //2.go back to login page
                this.props.history.replace('/login')
                }
            });
     }
    
    /**
     * this method will be executed onece after the first render()
     */
    componentDidMount() { 
        this.getCurrentTime();
        this.getCurrentWeather();
    }

    componentWillUnmount() { 
        //clear the time id
        clearInterval(this.timerId)
     }
     
    render() {
        //get the current user
        const currentUser=memoryUtils.user
        const { currentTime, weatherText, weatherUrl } = this.state
        //get the current title
        const title = this.getCurrentMenu();
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>Welcome,{currentUser.username}</span>
                    {/* click logout will delete the user in the local storage */}
                    <LinkButton onClick={this.logout}>Logout</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{ title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime }</span>
                        <img src={ weatherUrl} alt="weather" />
                        <span>{weatherText }</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
