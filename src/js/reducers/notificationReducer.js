import * as types from '../actions/actionTypes'
import initialState from './initialState'


export default function notificationReducer( state = initialState.notif, action ) {

  switch(action.type){
    case types.SHOW_NOTIF:
      const { shouldShow, msg } = action.payload
      return Object.assign({}, { state }, { shouldShow, msg })

    default:
      return state
  }

}