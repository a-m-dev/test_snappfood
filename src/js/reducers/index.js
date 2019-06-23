import { combineReducers } from 'redux'


// Reducers
import testReducer from './testReducer'
import testApiReducer from './testApiReducer'
import notesReducer from './notesReducer'
import notificationReducer from './notificationReducer'



const rootReducer = combineReducers({

  testData: testReducer,
  testApiData: testApiReducer,
  // more reducers here...
  notes: notesReducer,
  notif: notificationReducer,
})


export default rootReducer