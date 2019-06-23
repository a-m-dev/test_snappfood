import * as types from '../actions/actionTypes'
import initialState from './initialState'


export default function testApiReducer( state = initialState.testApiData, action ) {

  switch(action.type) {
    case (types.FETCH_FROM_API_TEST):
      return [...action.payload]

    default: 
      return state
  }
}
