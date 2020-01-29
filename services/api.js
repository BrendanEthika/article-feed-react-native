import axios from 'axios'
import { YellowBox} from 'react-native'

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket'
])

const api = axios.create({
    // baseURL: 'https://api.etk-dev.com/app-api/'
  baseURL: 'http://api.ethika.node:3010/app-api/'
})

export default api;