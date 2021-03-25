import axios from 'axios'

export default axios.create({
  baseURL: 'https://college.api:8000/api'
})
