import Navbar from './Navbar';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';

const mapStateToProps =(state: AppStateType) =>{
  return {
    friends: state.sidebar.friends
  }
}

const NavbarContainer = connect(mapStateToProps, {}) (Navbar);

export default NavbarContainer;