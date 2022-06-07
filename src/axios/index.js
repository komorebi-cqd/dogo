import axios from 'axios'
import { ElMessage } from 'element-plus' 

const instance = axios.create({
  baseURL: '/api.php/demo/index'
})

instance.interceptors.response.use(response => {
  if (response.data.code === 1) {
    return response.data.data
  }
  ElMessage({ type: 'error', message: response.data.msg })
  return Promise.reject()
}, error => {
  return error
})

export default instance