import { API, http } from '#/Config/api';


export default {
  login(payload) {
    Object.assign(http.defaults, {
      headers: {},
    });
    return new Promise((resolve, reject) =>{
      http.post(API.user_login,payload)
      .then(response => {
        Object.assign(http.defaults, {
          headers: {Authorization: 'Bearer '.concat(response.data.jwt)},
        });
        resolve(response.data)
      })
      .catch(({response}) => {
        reject(response.data.error)
      })
    })    
  },
  
  register(payload) {
    Object.assign(http.defaults, {
      headers: {},
    });
    return new Promise((resolve, reject) =>{
      http.post(API.user_register,payload)
      .then(response => {
        resolve(response.data)
      })
      .catch(({response}) => {
        reject(response)
      })
    })
  }
}
