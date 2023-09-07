import { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useForm from "../../hooks/useForm.js";
import { usePopupClose } from "../../hooks/usePopupClose";

export default function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {
  const {values, handleChange, setValues} = useForm(
    {
      name: "",
      link: "",
  }, (values) => console.dir(values)
  );

  const { name, link } = values;

  useEffect (() => {
    setValues({name: '', link: ''});
  },[isOpen])

  usePopupClose(isOpen, onClose)

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace (
      values
    );
  } 

  return(
    <PopupWithForm
        name='popup_cards'
        title='Новое место'
        buttonName='Создать'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          id="place-input"
          className="form__input"
          type="text"
          name="name"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required=""
          onChange={handleChange}
          value={name}
        />
        <span className="place-input-error form__error" />
        <input
          id="link-avatar"
          className="form__input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required=""
          onChange={handleChange}
          value={link}
        />
        <span className="link-avatar-error form__error" />
    </PopupWithForm>
  )
}