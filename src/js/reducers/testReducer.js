import * as types from '../actions/actionTypes'
import initialState from './initialState'



export default function testReducer(state = initialState.testData, action) {
  if(action.type === types.HANDLE_TEST_DATA) return action.payload
  return state
}