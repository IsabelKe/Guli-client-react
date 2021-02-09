import React from 'react'
import ReactDOM from 'react-dom'


import App from './App'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils' 

/**
 * this is the application root component
 */

 // if the user already in the localstorate, store the user in the memory
const user = storageUtils.getUser()
if (user && user.id) {
    memoryUtils.user = user
}
ReactDOM.render(<App/>,document.getElementById('root'))