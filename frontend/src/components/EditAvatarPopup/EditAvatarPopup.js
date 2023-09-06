import { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { usePopupClose } from "../../hooks/usePopupClose";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

const input = useRef()

usePopupClose(isOpen, onClose)

function handleSubmit(e) {
  e.preventDefault();
  onUpdateAvatar({
    avatar: input.current.value,
  });
} 

return (
<PopupWithForm
  name='popup_avatar'
  title='Обновить аватар'

  isOpen={isOpen}
  onClose={onClose}
  onSubmit={handleSubmit}

>
  <input
    ref={input}
    id="link-input"
    className="form__input"
    type="url"
    name="avatar"
    placeholder="Ссылка на фотографию"
    required=""
  />
  <span className="link-input-error form__error" />
</PopupWithForm> 
)

}