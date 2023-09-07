import ImagePopup from "./ImagePopup/ImagePopup";
import Main from "./Main/Main";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import { useEffect, useState } from "react";
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

  const [loggedIn, setloggedIn] = useState(false)

  const [userEmail, setUserEmail] = useState(undefined)

  const [userToken, setUserToken] = useState({})

  const navigate = useNavigate()

  const token = localStorage.getItem('token');

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
    setloggedIn(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.putLikes(card._id, token)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(`Ошибка при проставлении лайка: ${err}`))
    } else {
      api.deleteLikes(card._id, token)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(`Ошибка при снятии лайка: ${err}`))
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id, token)
      .then(() => {
        setCards((cards) => cards.filter((deleteCardId) => card._id !== deleteCardId._id));
      })
      .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
  }

  function handleUpdateUser(data) {
    api.getProfileInfo(data, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при редактировании информации о пользователе: ${err}`))
  }

  function handleUpdateAvatar(data) {
    api.getProfileAvatar(data, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при загрузке аватарки: ${err}`))
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при добавлении карточки: ${err}`))
  }

  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      // const token = localStorage.getItem('token');
      setUserToken(token)
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            handleUserEmail(res.email)
            // setloggedIn(true);
            navigate("/", { replace: true })
          }
        })
        .catch(err => console.log(`Ошибка при получении токена: ${err}`))
    }
  }

  useEffect(() => {
    handleTokenCheck();
    // const token = localStorage.getItem('token');
    Promise.all([api.getUserInfo(token), api.getListCards(token)])
      .then(([profileData, cardsDate]) => {
        setCurrentUser(profileData)
        setCards(cardsDate)
      })
      .catch(err => console.log(`Ошибка при получении данных с сервера: ${err}`))
  }, [])

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
                email={userEmail}
                token={userToken}
              />
            }
          />

          <Route path="/sign-up"
            element={
              <>
                <Header
                  linkName='Войти'
                  linkTo="/sign-in"
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
                />
                <Login
                  handleLogin={handleUserEmail}
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
