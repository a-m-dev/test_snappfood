import fetch from 'node-fetch'

global.Headers = fetch.Headers



class Service {

  constructor() {
    this.serverAddress = `${BASE_API_URL}`


    this.authernticateHeader = new Headers()
    this.authernticateHeader.set('Content-Type', 'application/json')

    this.urls = {

      // you can even pass params to url...
      // https://reqres.in/api/users?page=2

      GET_USERS: '/api/users'
    }
  }


  // Basic fetch
  async basicFetch(url, options, headers = this.authernticateHeader) {
    let fetchOptions = {}
    if(options.headers) {
      fetchOptions = {
        mode: 'cors',
        cache: 'default',
        ...options
      }
    } else {
      fetchOptions = {
        mode: 'cors',
        cache: 'default',
        ...options,
        headers
      }
    }


    // log before sending the request...
    // console.log(url, fetchOptions, fetchOptions.headers.get('Content-Type') )

    try {
      const response = await fetch(
        `${this.serverAddress}${url}`,
        { ...fetchOptions }
      )

      if(!response.ok) {
        throw {
          message: response.statusText,
          api: `${options.method} ${this.serverAddress}`
        }
      }

      const responseJson = await response.json()
      console.log('----------------------------')
      console.log(responseJson)
      console.log('----------------------------')
      return responseJson
    } catch(err) {
      throw { ...err }
    }
  }


  GetUsers = () => {
    return this.basicFetch(this.urls.GET_USERS, {
      method: 'GET'
    })
  }

}


export default new Service()