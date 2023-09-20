import { useContext } from "react";
import Card from "../Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Navigate } from "react-router-dom";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, loggedIn, handleLoggedIn, email, token, onCurrentUser }) {
  const currentUser = useContext(CurrentUserContext)

  return (
    loggedIn ? 
    <>
    <Header
      linkName='Выход'
      linkTo="/sign-in"
      token={token}
      email={email}
      // cards={cards}
      // currentUser={currentUser}
      loggedIn={loggedIn}
      // setLoggedIn={setLoggedIn}
      handleLoggedIn={handleLoggedIn}
      onCurrentUser={onCurrentUser}
    >
      <p className="header__email">{email}</p>  
    </Header>
    <main className="content">
      <section className="profile">
        <div className="profile__edit">
          <button
            className="profile__edit-avatar-button"
            aria-label="Редактировать аватар"
            type="button"
            onClick={onEditAvatar}
          />
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            aria-label="Редактировать профиль"
            type="button"
            onClick={onEditProfile}
          />
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          aria-label="Добавить новую фотографию"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map(item => { 
            return (
              <Card 
                key={item._id} 
                card={item} 
                onCardClick={onCardClick} 
                onCardLike={onCardLike} 
                onCardDelete={onCardDelete} 
              />
            ) 
          })}
        </ul>
      </section>
    </main>
    <Footer/>
    </>
    : <Navigate to={'/sing-in'} replace />
  )
}