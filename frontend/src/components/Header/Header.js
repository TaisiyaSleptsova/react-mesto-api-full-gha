import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Header({ linkName, linkTo, children, onCurrentUser, handleLoggedIn }) {
  const history = useNavigate();

  function signOut() {
    localStorage.removeItem('jwt');
    history('/sign-in');
    handleLoggedIn();
    // onLoggedIn();
    // cards=([]);
    onCurrentUser();
  }

  return (
    <header className="header">
      <div className='header__logo'>
        <img
          className="logo"
          src={logo}
          alt="Логотип проекта Место"
        />
        <button className='header__menu'></button>
      </div>
      <div className="header__container header__container_opened">
        {children}
        <NavLink to={linkTo} onClick={signOut} className="header__link">{linkName}</NavLink>
      </div>
    </header>
  )
}