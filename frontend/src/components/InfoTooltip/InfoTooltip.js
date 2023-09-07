import { usePopupClose } from "../../hooks/usePopupClose"

export default function InfoTooltip ({isOpen, img, title, onClose}) {
  usePopupClose(isOpen, onClose)

  return (
    <section className={`popup popup__resporense ${isOpen && 'popup_opened'}`}>
    <div className="popup__container">
      <button
        className="popup__close"
        aria-label={`Закрыть форму ${title}`}
        type="button"
        onClick={onClose}
      />
      <img className="popup__img" src={img}/>
      <h2 className="popup__title popup__title_info">{title}</h2>  
    </div>
  </section>
  )
}