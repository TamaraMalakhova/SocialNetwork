import Navbar from './Navbar';
import { connect } from 'react-redux';

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