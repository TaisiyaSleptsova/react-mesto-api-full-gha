export default function PopupWithForm ({name, title, buttonName, children, isOpen, onClose, onSubmit }) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          aria-label={`Закрыть форму ${title}`}
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form className="form form_profile" name={name} onSubmit={onSubmit}>
          <fieldset className="form__input-conteiner">
            {children}
            <button
              className="form__submit-button"
              aria-label={`Сохранить форму ${title}`}
              type="submit"
            >
              {buttonName ||'Сохранить'}
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  )
}