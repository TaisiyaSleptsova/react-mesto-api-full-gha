import { usePopupClose } from "../../hooks/usePopupClose"

export default function ImagePopup({ card, onClose }) {

  usePopupClose(card?.link, onClose)

  return (
    <section className={`popup popup_zoom ${Object.keys(card).length > 0 ? "popup_opened" : ""}`}>
      <div className="popup__zoom-container">
        <button
          className="popup__close"
          aria-label="Закрыть форму увеличения картинки"
          type="button"
          onClick={onClose}
        />
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </section>
  )
}