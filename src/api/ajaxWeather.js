import axios from 'axios';

/**
 * this function fetchs weather information from a weather API
 * @param {*} data 
 */
export default function ajaxWeather(data) {
    return new Promise(function (resolve, reject) {
        const options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
            params: {
            q: data
        },
        headers: {
            'x-rapidapi-key': '02a10b3832msh6229f6d6da640cbp12c259jsn64f7aac12d40',
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
        }
        };
        
        let promise = axios.request(options)
       
         promise.then(response => {
            // if the request succeed, call resolve(response.data)
             const  weather  = response.data.weather[0]
             const { main, icon } = weather
             resolve({ main, icon } )
         }).catch(error => { 
            //if the request fails, display the error message
            console.log('Request fail: ' + error.message)
          })
    })
}
