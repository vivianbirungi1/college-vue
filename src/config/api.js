// importing axios from acios library and using hosted heroku app as base URL
import axios from 'axios'

export default axios.create({
  baseURL: 'https://college-api-viv.herokuapp.com/api'
})
