import { useContext, useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { usePopupClose } from "../../hooks/usePopupClose";

export default function EditProfilePopup ({ isOpen, onClose, onUpdateUser }) {

  const [name, setName] = useState("")
  const [description, setDescription] = useState('')
  const currentUser = useContext(CurrentUserContext)

  usePopupClose(isOpen, onClose)

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function changeName(evt) {
    setName(evt.target.value);
  }

  function changeDescription(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
      name='popup_profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
        <input
          id="name-input"
          className="form__input form__input_type_name"
          type="text"
          name="name"
          minLength={2}
          maxLength={40}
          required=""
          onChange={changeName}
          value={`${name}`}
        />
        <span className="name-input-error form__error" />
        <input
          id="job-input"
          className="form__input form__input_type_job"
          type="text"
          name="about"
          minLength={2}
          maxLength={200}
          required=""
          onChange={changeDescription}
          value={`${description}`}
        />
        <span className="job-input-error form__error" />
      </PopupWithForm>
  )
}