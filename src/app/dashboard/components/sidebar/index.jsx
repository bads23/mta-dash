import React, {useState, useEffect} from 'react'
import Logo from '../../../common/assets/svg/MTA.svg'
import Notify from '../../../common/popups'
import Logout from '../../../auth/logout'

const MenuItem = ({name, link}) =>{
  return(
    <>    
      <a href={link}>
        <li>{name}</li>
      </a>
    </>
  )
}

const index = () => {

  return (
    <>
    <div className="sidebar">

      <div className="logo-wrapper align-center pd-v-20">
        <div className="logo-img">
          <a href="/">
            <img src={Logo} alt="mta-logo" />
          </a>
          
        </div>
        <div className="logo-text letter-spacing-5">
          <span className="playfair-xxlg">MOTION</span>
          <span className="lato-sm">TALENT AFRICA</span>
        </div>
      </div>

      <nav className="nav">
        <ul>
          <MenuItem name="Dashboard" link="/" />
          <MenuItem name="Products" link="/products" />
          <MenuItem name="Orders" link="/orders/" />
          <MenuItem name="Users" link="/users/" />
          <MenuItem name="Clients" link="/clients/" />
          <MenuItem name="News" link="/posts/" />
          <MenuItem name="Events" link="/events/" />

          <a href='' onClick={Logout}>
            <li>Logout</li>
          </a>

        </ul>
      </nav>
      
    </div>
    <Notify />
    </>
  )
}

export default index
