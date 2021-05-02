import axios from 'axios'
import { toObject } from '../utils'

const URL = process.env.VUE_APP_URL + '/'

export default {
  get: path => {
    return new Promise ((resolve, reject) => axios
      .get(URL + path)
      .then(response => resolve( 
        toObject(
          response.data, 
          'uid'
        )
      ))
      .catch(error => reject(
        error
      ))
    )
  },
}