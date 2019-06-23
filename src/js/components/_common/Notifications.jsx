import React from 'react'
import { connect } from 'react-redux'
import { notif } from '../../actions/notificationActions'
import { bindActionCreators } from 'redux'
import { Spring, animated, config } from 'react-spring/renderprops.cjs.js'

class Notification extends React.PureComponent {

  componentDidUpdate(prevProps) {
    if(prevProps.shouldShowNotif !== this.props.shouldShowNotif) {
      const { notifAction, notifMsg } = this.props
      setTimeout(() => {
        notifAction({
          shouldShow: false,
          msg: notifMsg
        })
      }, 3*1000);
    }
  }

  render() {

    const { shouldShowNotif, notifMsg } = this.props

    return(
      <Spring
        native
        to={{
          bottom: shouldShowNotif ? 25 : -180
        }}
        config={config.default}
      >
        {_s => (
          <animated.div style={_s} className="notif">
            <p className="notif__text">{notifMsg}</p>
          </animated.div>
        )}
      </Spring>
    )
  }
}

const mapStateToProps = state => {
  return {
    shouldShowNotif: state.notif.shouldShow,
    notifMsg: state.notif.msg
  }
}


const mapDispatchToProps = dispatch => {
  return {
    notifAction: bindActionCreators(notif, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)