import axios from 'axios';
import { message } from 'antd';


/**
 * this is a base function that uses axios to send requests to the server
 * @param {*} url to the server API
 * @param {*} data data that has been sent to the server
 * @param {*} method using which request method
 */
export default function ajax(url, data = {}, method = 'GET') {
    return new Promise(function (resolve, reject) {
        let promise;

        //request data from the server
        if (method === 'GET') {
            // params：configure query parameter
            promise = axios.get(url, { params: data })
        }
        //create new data to the database
        else if (method === 'POST') {
            promise = axios.post(url, data)
        }
        //update
        else if (method === 'PUT') {
            console.log("come here")
            promise = axios.put(url, data)
        }
            //delete
        else if(method === 'DELETE'){
            promise = axios.delete(url, data)
        }
        promise.then(response => {
            //if the request is success, call resolve(response.data)
            resolve(response)
        }).catch(error => { 
            // if the request fails, display the error message that comes from the server
            message.error('Request fail: ' + error.message)
        })
    })
}


