import axios from 'axios'

export const http = axios.create({
  baseURL: process.env.VUE_APP_SERVER,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

})

export async function loginPost(url, params) {
  return await http.post(url, params)
}

// export async function sendForPost(url, params) {
//   const api = process.env.VUE_APP_SERVER + url
//   axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1NGUwZDMyLTljZGYtMTFlYS1iYjM3LTAyNDJhYzEzMDAwMiIsImlhdCI6MTU5MDI1MDMwN30.6Yrh_uRWQUq4h82b-VsnW9eWUaGLI5-Z44YpBWJbq4Y'
//   const response = await axios.post(api, params)

//   return response
// }

// export async function sendForGet(url, params) {
//   const api = process.env.VUE_APP_SERVER + url
//   axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMSIsImlhdCI6MTU5MDgxMzA2OH0.US5wDVpisVQfV-x_ltsOaNM_WmGlfBYj9OGn7ZjOraw'
//   const response = await axios.get(api,
//     {
//       params: params
//     })
//   console.log('api', api)

//   return response
// }

// http.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'
// http.defaults.headers.post['Content-Type'] = 'application/json'
