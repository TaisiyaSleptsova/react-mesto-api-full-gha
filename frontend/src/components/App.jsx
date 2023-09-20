import ImagePopup from "./ImagePopup/ImagePopup";
import Main from "./Main/Main";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import Register from "./Register/Register";
import Login from "./Login/Login ";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import * as auth from '../utils/auth.js';
import Header from "./Header/Header";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

  const [currentUser, setCurrentUser] = useState({})

  const [cards, setCards] = useState([])

  // const [userData, setUserData] = useState([])

  const [loggedIn, setloggedIn] = useState(false)

  const [userEmail, setUserEmail] = useState(undefined)

  const [userToken, setUserToken] = useState({})

  const navigate = useNavigate()

  //открытие попапа
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  //закрытие попапа
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  function handleUserEmail(email) {
    setUserEmail(email);
  }

  function handleInLoggedin () {
    setloggedIn(false)
  }

  function handleLoggedin () {
    setloggedIn(true)
  }

  function handleCurrentUser () {
    setCurrentUser({})
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.putLikes(card._id, localStorage.jwt)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(`Ошибка при проставлении лайка: ${err}`))
    } else {
      api.deleteLikes(card._id, localStorage.jwt)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(`Ошибка при снятии лайка: ${err}`))
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id, localStorage.jwt)
      .then(() => {
        setCards((cards) => cards.filter((deleteCardId) => card._id !== deleteCardId._id));
      })
      .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
  }

  function handleUpdateUser(data) {
    api.getProfileInfo(data, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при редактировании информации о пользователе: ${err}`))
  }

  function handleUpdateAvatar(data) {
    api.getProfileAvatar(data, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при загрузке аватарки: ${err}`))
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data, localStorage.jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при добавлении карточки: ${err}`))
  }

 function handleTokenCheck() {
  if (localStorage.jwt) {
    // const token = localStorage.getItem('jwt');
      // setUserToken(localStorage.jwt);
    auth.checkToken(localStorage.jwt)
      .then((res) => {
        // if (res) {
          // const { _id, email } = res;
          // const userData = {res};
          setCurrentUser(res);
          setUserEmail(res.email);
          handleUserEmail(res.email)
          // setloggedIn(true);
          // navigate("/", { replace: true })
          // getUserData()
        // }
      })
      .catch(err => console.log(`Ошибка при получении токена: ${err}`))

}}

  useEffect(() => {
    if (loggedIn) {
      handleTokenCheck();
      // setloggedIn(true);
      // const token = localStorage.getItem('token');
      Promise.all([api.getUserInfo(localStorage.jwt), api.getListCards(localStorage.jwt)])
        .then(([profileData, cardsDate]) => {
          setCurrentUser(profileData)
          setCards(cardsDate)
          setUserEmail(profileData.email)
          // setUserToken('')
        })
        .catch(err => console.log(`Ошибка при получении данных с сервера: ${err}`))
    }
  }, [loggedIn])

  // useEffect(() => {
  //   function getUserData() {
  //   console.log(localStorage.jwt)
  //   if (localStorage.jwt) {
  //     api.getUserInfo(localStorage.jwt)
  //     .then(res => {
  //       console.log(res)
  //       setUserEmail(res.email)
  //       // setloggedIn(true)
  //       // setUserToken('')
  //     })
  //     .catch(err => console.error(`Ошибка повторного входа: ${err}`))
  //   } else {
  //     setloggedIn(false)
  //     setUserToken('')
  //   }
  // }
  // , [])

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Routes>

          <Route path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
                handleLoggedIn={handleInLoggedin}
                // setloggedIn={setloggedIn}
                email={userEmail}
                token={userToken}
                // onLoggedIn={handleInLoggedin}
                // setCurrentUser={setCurrentUser}
                onCurrentUser={handleCurrentUser}
              />
            }
          />

          <Route path="/sign-up"
            element={
              <>
                <Header
                  linkName='Войти'
                  linkTo="/sign-in"
                  setCurrentUser={setCurrentUser}
                  handleLoggedIn={handleInLoggedin}
                />
                <Register/>
              </>
            }
          />

          <Route path="/sign-in"
            element={
              <>
                <Header
                  linkName='Регистрация'
                  linkTo="/sign-up"
                  handleLoggedIn={handleInLoggedin}
                />
                <Login
                  handleLogin={handleUserEmail}
                  handleLoggedIn={handleLoggedin}
                  // setloggedIn={setloggedIn}
                />
              </>
            }
          />

          <Route path="/*"
            element={
              <>
                <Header
                  linkName='Регистрация'
                  linkTo="/sign-up"
                />
                <Login
                  handleLogin={handleUserEmail}
                />
              </>
            }
          />

        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name='popup_delete'
          title='Вы уверены?'
          buttonName='Да'
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

      </div>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
