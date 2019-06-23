import React from 'react'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux';
import { addNote } from '../../../actions/noteActions'
import { notif } from '../../../actions/notificationActions'
import { Spring, animated, config } from 'react-spring/renderprops.cjs.js'

import randomString from '../../../../utils/RandomStringGenerator'



class AddNoteForm extends React.Component {

  constructor() {
    super()

    this.state = {
      note: ''
    }
  }

  handleFormSubmition = e => {

    const { note } = this.state
    const { addNoteAction, notifAction } = this.props

    e.preventDefault()
    
    if(note.trim().length === 0) {
      notifAction({
        shouldShow: true,
        msg: 'note should not be empty...'
      })
      return;
    }

    const getCurrentDate = new Date(Date.now())
    const payload = {
      _id: randomString(25),
      note: note,
      created_at: getCurrentDate.toISOString()
    }

    addNoteAction(payload)
    

    // clear the controllef form
    this.setState({ note: '' })
    notifAction({
      shouldShow: true,
      msg: 'DONE!!!!'
    })

  }

  handleNoteChange = e => {
    const { name, value } = e.target
    this.setState({[name]: value })
  }


  render() {

    const { note } = this.state
    const { shouldShowAddNoteForm } = this.props

    return(
      <Spring
        native
        to={{
          top: shouldShowAddNoteForm ? '40%' : '150%'
        }}
        config={config.default}
      >
        { _s => (
          <animated.form style={_s} className="notelist__submitForm" onSubmit={this.handleFormSubmition}>

            <h3 className="notelist__submitForm__head">Add Note...</h3>

            <textarea 
              name='note' 
              cols="83" rows="7" 
              value={note}
              onChange={this.handleNoteChange}/>
              <br />
            <input type="submit" className="btn" />
          </animated.form>
        )}
      </Spring>
    )
  }
}



const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNoteAction: bindActionCreators(addNote, dispatch),
    notifAction: bindActionCreators(notif, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteForm)