import * as types from '../actions/actionTypes'
import initialState from './initialState'



export default function notesReducer( state = initialState.notes, action ) {

  switch(action.type) {
    case types.ADD_NOTE:
      return [
        ...state,
        Object.assign({}, action.payload)
      ]

    case types.EDIT_NOTE:

      const _index = findTarget(state, action.payload._id)

      return [
        ...state.slice(0, _index),
        {...action.payload},
        ...state.slice(_index + 1)
      ]

    
    case types.DELETE_NOTE:
      const target = findTarget(state, action._id)
      return [
        ...state.slice(0, target),
        ...state.slice(target + 1)
      ]

    default: 
      return state
  }
}




function findTarget(state, targetId) {
  return state.findIndex( s => s._id === targetId)
}