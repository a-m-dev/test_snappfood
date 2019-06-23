import React from 'react'
import { connect } from 'react-redux'

import AddNoteForm from './_dep/AddNoteForm'
import Note from './_dep/Note'
import Notification from '../_common/Notifications'
import Carousel from '../_common/Carousel'

import Logo from '../../../images/logo.png'

import { Spring , animated, config } from 'react-spring/renderprops.cjs.js'


class Notes extends React.Component {

  constructor() {
    super()


    this.state = {
      shouldShowAddNoteForm: false
    }
  }


  toggleNoteForm = () => this.setState( prevState => ({ shouldShowAddNoteForm: !prevState.shouldShowAddNoteForm }) )


  

  render() {

    const { shouldShowAddNoteForm } = this.state
    const { notes } = this.props 

    const setting = {
      dragSpeed: 1.25,
      itemWidth: 240,
      itemHeight: 180,
      itemSideOffsets: 15,
    }

    const itemStyle = {
      width: `${setting.itemWidth}px`,
      height: `${setting.itemHeight}px`,
      margin: `0px ${setting.itemSideOffsets}px`
    }

    return(
      <div className='notelist'>

        <Notification />

        {/* LOGO */}
        <Spring
          native
          to={{
            top: shouldShowAddNoteForm ? '7%' : '40%',
            height: shouldShowAddNoteForm ? '50px' : '100px',
            opacity: shouldShowAddNoteForm ? '0.7' : '1',
            left: shouldShowAddNoteForm ? '0%' : '50%',
            transform: shouldShowAddNoteForm ? 'translate(0%, -50%)' : 'translate(-50%, -50%)'
          }}
          config={config.default}>
          {_s => (
            <animated.div style={_s} className='notelist__logo' >  
              <img src={Logo} alt="this is ap logo"/>
            </animated.div>
          )}
        </Spring> 

          
        {/* HEADING */}
        <Spring
          native
          to={{
            opacity: shouldShowAddNoteForm ? 0 : 1,
            top: shouldShowAddNoteForm ? 'calc(3% + 80px)' : `calc(40% + 80px)`
          }}
          config={config.default}>
          {_s => (
            <animated.h3 style={_s} className='notelist__heading'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </animated.h3>
          )}
        </Spring>
          
        {/* Button */}
        <Spring
          native
          to={{
            top: shouldShowAddNoteForm ? 'calc(0% + 0px + 20px)' : `calc(40% + 80px + 100px)`,
            right: shouldShowAddNoteForm ? '0%' : '50%',
            transform: shouldShowAddNoteForm ? 'translate(0%, 0)' : 'translate(50%, 0)'
          }}
          config={config.default}
        >
          {_s => (
            <animated.div style={_s} className="notelist__addNoteBtn">
              <button onClick={this.toggleNoteForm} className="btn">Start with new Note</button>
            </animated.div>
          )}
        </Spring>

        
        <AddNoteForm shouldShowAddNoteForm={shouldShowAddNoteForm} />

        <Spring
          native 
          to={{
            bottom: notes.length >= 1 ? 110 : -200,
            opacity: 1
          }}
          config={config.default}
        >
          { _s => (
            <animated.div style={_s} className="notelist__carousel"> 
              <Carousel _data={notes} {...setting}>
                {
                  notes.map( el => (
                    <div 
                      key={el._id}
                      className="c_item"
                      style={{ ...itemStyle }}>
                      <Note data={el} />
                    </div>
                  ) 
                )}
              </Carousel>
            </animated.div>
          )

          }  
        </Spring>

      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    notes: state.notes
  }
}

export default connect(mapStateToProps, null)(Notes)