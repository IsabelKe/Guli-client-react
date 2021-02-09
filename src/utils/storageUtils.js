/* eslint-disable import/no-anonymous-default-export */
import store from 'store'

/**
 * a utility funciton to handle local storage
 */
const USER_KEY='user_key'
export default {

    //save user
    saveUser(user)
    {
        store.set(USER_KEY,user)
    },
    //get user
    getUser() { 
        //if the user does not exist, then return an empty object
        return store.get(USER_KEY) || {}
    },

    //delete user
    deleteUser() { 
        store.remove(USER_KEY)
    }
}