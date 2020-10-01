import { API, http } from '#/Config/api';

export default {
  list() {
    return new Promise((resolve, reject) =>{
      http.get(API.operation)
      .then(response => {
        resolve(response.data)
      })
      .catch(({response}) => {
        reject(response.data.error)
      })
    })    
  },
}