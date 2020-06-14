import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
//import StoreContext from '../../StoreContext';

/*const NavbarContainer = () => {
  return <StoreContext.Consumer>{
   (store) => { 
    let state = store.getState().sidebar;
     return <Navbar sidebar={state}/> }
     }
   </StoreContext.Consumer>
  ;
}*/

const mapStateToProps =(state) =>{
  return {
    friends: state.sidebar.friends
  }
}

let mapDispatchToProps = (dispatch) =>{
  return {}
}

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps) (Navbar);

export default NavbarContainer;