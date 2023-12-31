import axios from 'axios'

interface Params {
  baseUrl: string
  headers: any
  method: string
}

//config for get request note that the method as changed to get this is very important
const getConfig: Params = {
  baseUrl: 'https://api.github.com',
  headers: {
    Authorization: import.meta.env.REACT_APP_GITHUB_TOKEN
  },
  method: 'get'
}

export const getAPI = async (url: string, data: any): Promise<any> => {
  return await axios({
    ...getConfig,
    url: `${getConfig.baseUrl}/${url}${data}`
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data
      }
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response
      }
    })
}
