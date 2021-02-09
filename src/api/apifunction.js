import ajax from './ajax'
import ajaxWeather from './ajaxWeather'

//declare the base path
const BASE = 'http://localhost:8001/api/v1/'

//for user login
export const userLogin = (username, password) => ajax(BASE+'/users/login', { username, password },'POST') 

export const findAdmin = () => ajax(BASE+'/users', {}) 

//get the current weather information
export const reqWeather = (city) => ajaxWeather(city)

//get all the categories or subcategories
export const reqCategories = (parentId) =>
    ajax(BASE + 'categories', { parentId })
//update a category
export const reqUpdateCategory = (parentId,id, name) =>
    ajax(BASE  + 'categories', { parentId, id,name }, 'PUT')
//update a category
export const reqAddCategory = (parentId, name) =>
    ajax(BASE + 'categories', { parentId, name }, 'POST')
    
//get all the products
export const reqProducts = (pageNum,pageSize) =>
    ajax(BASE + 'products', {pageNum,pageSize })
//search all the products
export const reqSearchProducts = ({ pageNum, pageSize, searchType, searchParam }) =>
    ajax(BASE + 'products/search',
        {
            pageNum,
            pageSize,
            //productName/desc
            [searchType]:searchParam
        })

//get all the roles
export const reqRoles = () => ajax(BASE + 'roles/')
//add a new role
export const reqAddRole = (roleName) => ajax(BASE + 'roles', { roleName }, 'POST')
//update role permissions
export const reqUpdateRole = (roleId,authName,menus) => ajax(BASE + 'roles', { roleId,authName,menus }, 'PUT')