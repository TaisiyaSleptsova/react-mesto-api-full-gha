
export default function FormBlackTheme ({ title, buttonName, children, handleSubmit, email, password, handleChange }) {
  
  return (
      <div className="register">
          <p className="register__title">
              {title}
          </p>
          <form className="register__form" onSubmit={handleSubmit}>
            <input 
              className="register__form_input" 
              id="email" 
              name="email" 
              type="email" 
              placeholder="Email"
              onChange={handleChange}
              value={email}
            />
            <input 
              className="register__form_input" 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Пароль"
              onChange={handleChange}
              value={password}
            />
            <div className="register__button-container">
              <button type="submit" className="register__link">{buttonName}</button>
            </div>
          </form>
          {children}
          </div>
    )
  }