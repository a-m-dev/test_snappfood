import  React from 'react'
import { NavLink } from 'react-router-dom'




const Navbar = () => {

  return(
    <div className='nav'>
      <NavLink activeStyle={{ fontWeight: 'bold' }} exact={true} to='/'>Notes</NavLink>
      {/* <span>{`  ||  `}</span>
      <NavLink activeStyle={{ fontWeight: 'bold' }} to='/about'>About</NavLink>
      <span>{`  ||  `}</span>
      <NavLink activeStyle={{ fontWeight: 'bold' }} to='/contact'>Contact</NavLink>
      <span>{`  ||  `}</span>
      <NavLink activeStyle={{ fontWeight: 'bold' }} to='/notes'>Notes</NavLink> */}
    </div>
  )
}


export default Navbar

