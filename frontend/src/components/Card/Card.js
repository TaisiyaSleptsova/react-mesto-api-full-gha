import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"

export default function Card ({card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__like ${isLiked && 'element__like_active'}` 
  );

  function handleLikeClick() {
    onCardLike (card)
  }

  function handleDeleteClick() {
    onCardDelete (card)
  }

  return (
    <li className="element__container">
      {isOwn && <button className="element__delete" aria-label="Удалить фотографию" onClick={() => handleDeleteClick()} />}
      <img className="element__mask-group" src={card.link} alt={`загруженная картинка ${card.name}`} onClick={() => onCardClick(card)}/>
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2> 
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            aria-label="Поставить на фотографию лайк"
            type="button"
            onClick={() => handleLikeClick()}
          />
          <p className="element__like-count">{card.likes.length || '0'}</p>
        </div>
      </div>
    </li>
  )
}