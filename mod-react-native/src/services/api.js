import axios from 'axios'

const api = axios.create({
  baseURL: ' 192.168.100.18'//ip da maquina se estiver a usar o phisical device
})

export default api