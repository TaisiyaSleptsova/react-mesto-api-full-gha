
import { Link, useNavigate } from "react-router-dom";
import FormBlackTheme from "../FormBlackTheme/FormBlackTheme";
// import Header from "../Header/Header";
import * as auth from '../../utils/auth.js';
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";
import popupImageBlack from "../../images/successful-registration.svg"
import popupImageRed from "../../images/stop-login.svg"
import InfoTooltip from "../InfoTooltip/InfoTooltip";


export default function Register () {
    const {values, handleChange, setValues} = useForm(
        {
          email: "",
          password: "",
      }, (values) => console.dir(values)
      );
    
      const navigate = useNavigate();

      const { email, password } = values;

      const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false)
      const [isInfoPopupOpenError, setIsInfoPopupOpenError] = useState(false)

      function handleInfoPopupError() {
        setIsInfoPopupOpenError(true)
      }

      function handleInfoPopup() {
        setIsInfoPopupOpen(true)
      }

      function closePopup() {
        setIsInfoPopupOpen(false)
        navigate('/sign-in', {replace: true})  
      }

      function closePopupError() {
        setIsInfoPopupOpenError(false)
      }
    
      useEffect (() => {
        setValues({email: '', password: ''});
      },[])  
    
    const handleSubmit = (e) => {
        e.preventDefault();
        auth.register(values.password, values.email)
        .then((res) => {
            if (res._id) {
              handleInfoPopup()
            }             
        }) 
        .catch(err => {
          // console.log(err);
          handleInfoPopupError()
          
        });
      }

  return (
    <>
    <FormBlackTheme
      title='Регистрация'
      buttonName='Зарегистрироваться'
      handleSubmit={handleSubmit}
      email={email}
      password={password}
      handleChange={handleChange}
    >
        <div className="register__signin">
          <p className="register__subtitle">Уже зарегистрированы? </p>
          <Link to="/sign-in" className="register__login-link">&nbsp;Войти</Link>
        </div>
    </FormBlackTheme>

    <InfoTooltip
      onClose={closePopup}
      isOpen={isInfoPopupOpen}
      img={popupImageBlack}
      title={'Вы успешно зарегистрировались!'}
    />
    
    <InfoTooltip
      onClose={closePopupError}
      isOpen={isInfoPopupOpenError}
      img={popupImageRed}
      title={'Что-то пошло не так! Попробуйте ещё раз.'}
    />

    </>
  )
}