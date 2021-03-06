import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { set_open, set_login, set_profile, } from '../reducers/Action'
import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'
import Popup from './Popup'
import './Header.sass';



function HeaderFunction(props) {
  const [isLogIn, setIsLogIn] = useState(false);

  return (
    <>
      <Popup
        // isOpen = {if you need another control variable } 
        // setOpen = {if you need another control function ()=>setOpen(!isOpen)} 
        // submit = {()=>setOpen(!isOpen)} 

        isOpen={props.storeState.isOpen}
        body={isLogIn ? <RegistrationForm setIsLogIn={() => setIsLogIn(!isLogIn)} /> : <LoginForm setIsLogIn={() => setIsLogIn(!isLogIn)} />}
        logo={"WARM"}
        close={"Close"}
        onClose={() => props.dispatch(set_open())}
        isWhite={true}
        // otherBody={true(for hide) or object}
        otherFooter={true} //{true(for hide) or object}
      // footer = {true(for hide) or object}
      />
      <div className="header">
        <div className="header-wrapper">
          <div className="header-block">
            <Link className="header-block-logo" to="/home">WARM</Link>
            <div className="header-block-links">
              <Link to='/profile'>Profile</Link>
            </div>
            <div className="header-block-login" onClick={() => { !props.storeState.isLogIn && props.dispatch(set_open()) }}>
              {props.storeState.isLogIn ?
                <>
                  <Link to='/profile' className="logout" />
                  <div className="header-block-login-dropDown">
                    <span onClick={() => { localStorage.removeItem('profile'); props.dispatch(set_login()); props.dispatch(set_profile({})); window.location.href = '/' }}>Logout</span>
                  </div>
                </>
                :
                <i className="login" />
              }
              {/* <i className="logout-girl" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Header = connect(
  (state) => ({
    storeState: state.AppReduser,
  }),
)(HeaderFunction);

export default Header;
