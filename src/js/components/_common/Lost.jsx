import React from 'react'
import { Link } from 'react-router-dom'


const Lost = () => {

  return(
    
    <div className='wrapper'>
      <div className='lost'>
        you lost...
        
        <Link to='/'>Go to Home</Link>
      </div>
    </div>
  )
}

export default Lost