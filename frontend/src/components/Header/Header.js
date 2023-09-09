import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Header({ linkName, linkTo, children, cards, currentUser }) {
  const history = useNavigate();

  function signOut() {
    localStorage.removeItem('jwt');
    history('/sign-in');
    cards=([]);
    currentUser=({});
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
        <Link to={linkTo} onClick={signOut} className="header__link">{linkName}</Link>
      </div>
    </header>
  )
}