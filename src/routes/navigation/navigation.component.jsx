import { Outlet, Link} from "react-router-dom";
import { Fragment, useContext } from "react";
// img
import logo from '../../assets/logo.svg';
import { NavigationContainer, NavLink, 
        NavLinksContainer, LogoContainer} from './navigation.styles.jsx';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils"; 
import { signOut } from "firebase/auth";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser} = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
    //   <Fragment>
    //     <NavigationContainer>
    //         <LogoContainer to="/">
    //             <Toplogo className="logo" />
    //         </LogoContainer>           
    //         <NavLinksContainer>
    //             <NavLink to='/shop'>
    //                 SHOP
    //             </NavLink>
    //             {
    //                 currentUser ? (
    //                     <NavLink as='span' onClick={signOutUser}>
    //                         SIGN OUT</NavLink>
    //                 )
    //                     : (<NavLink to="/auth">
    //                         SIGN IN
    //                     </NavLink>
    //                     )
    //             }
    //             <CartIcon />
    //         </NavLinksContainer>
    //         {isCartOpen && <CartDropdown />}
    //     </NavigationContainer>
    //     <Outlet />
    //   </Fragment>
    <>
    <div className="navigation">
        <Link className="logo-container" to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <>
              <span className="nav-link" style={{ cursor: 'inherit' }}>
                Hello,{currentUser.displayName}.
              </span>
              <span className="nav-link" onClick={signOutUser}>
                SIGN OUT
              </span>
            </>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}

          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
    <Outlet />
    </>
    );
  };

  export default Navigation;