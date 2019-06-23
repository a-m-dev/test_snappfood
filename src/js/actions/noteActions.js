import * as types from './actionTypes'



export const addNote = payload => ({ type: types.ADD_NOTE, payload })
export const editNote = payload => ({ type: types.EDIT_NOTE, payload })
export const removeNote = _id => ({ type: types.DELETE_NOTE, _id })