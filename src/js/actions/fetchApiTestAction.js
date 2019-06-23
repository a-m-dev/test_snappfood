import * as types from './actionTypes'
import Service from '../service'



export const fetchFromApi = payload => {
  return { type: types.FETCH_FROM_API_TEST, payload }
}


export const fetchApiTestAction = dispatch => {
  return Service.GetUsers().then( _data => {
    dispatch(fetchFromApi( _data.data )) // you can even distructure taht like fetchFromApi(({ data }))
  }).catch ( err => {
    // error catching here 
    // you can even call an failure action here...
    // but sorry about it , i have no time for that , im sorry :(
    throw (err)
  })
}


