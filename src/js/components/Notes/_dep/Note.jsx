import React from 'react'
import { connect } from 'react-redux'
import { editNote, removeNote } from '../../../actions/noteActions'
import { notif } from '../../../actions/notificationActions'
import { bindActionCreators } from 'redux'


import TimeStamp from '../../../../utils/TimeStamp'


class Note extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      editMode: false,
      note: props.data.note
    }
  }

  toggleEditMode = () => this.setState( prevState => ({ editMode: !prevState.editMode }))

  handleNoteChange = e => {
    const { value, name } = e.target
    this.setState({ [name]: value })
  }


  handleEdit = ({e, data}) => {

    const { editNoteAction, notifAction } = this.props

    e.preventDefault()
    const { note } = this.state
    const refreshData = Object.assign({}, {...data}, { note })

    editNoteAction(refreshData)

    this.setState({ editMode: false })

    notifAction({
      shouldShow: true,
      msg: 'updated...'
    })
  }

  handleRemove = _id => {
    const { notifAction } = this.props

    this.props.removeNoteAction(_id)
    notifAction({
      shouldShow: true,
      msg: 'removed...'
    })
  }


  render() {

    const { editMode, note } = this.state
    const { data } = this.props

    return(
      <>
        { 
          editMode ? (
            <form onSubmit={(e) => this.handleEdit({e, data})}>
              <textarea 
                className="editmode"
                name="note" 
                cols="83" 
                rows="4" 
                value={editMode ? note : data.note} 
                onChange={e => this.handleNoteChange(e)}/>
              <input className="btn--dark" type="submit"/>
            </form>
          ) : (
            <div className="note">
              <h3 className="note__text">{data.note}</h3>
              <span className="note__time">{TimeStamp.showTime(data.created_at)}</span>

              <div className='note__action-btns'>
                <button className="btn--dark" onClick={this.toggleEditMode}>edit</button>
                <button className="btn--dark" onClick={() => this.handleRemove(data._id)}>remove</button>
              </div>
            </div>
          )
          
        }
      </>
    )
  }
}


const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    editNoteAction: bindActionCreators(editNote, dispatch),
    removeNoteAction: bindActionCreators(removeNote, dispatch),
    notifAction: bindActionCreators(notif, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)