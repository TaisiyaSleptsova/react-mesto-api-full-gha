import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import FormBlackTheme from "../FormBlackTheme/FormBlackTheme";
// import Header from "../Header/Header";
import * as auth from '../../utils/auth.js';
import { useNavigate } from "react-router-dom";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import popupImageRed from "../../images/stop-login.svg"

export default function Login ({ handleLogin, handleLoggedIn } ) {
    const {values, handleChange, setValues} = useForm(
        {
          email: "",
          password: "",
      }, (values) => console.dir(values)
      );

      const { email, password } = values;
      
      const navigate = useNavigate();

      const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false)

      function handleInfoPopup() {
        setIsInfoPopupOpen(true)
      }

      function closePopup() {
        setIsInfoPopupOpen(false)
      }

      useEffect (() => {
        setValues({email: '', password: ''})
      },[])  
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.email || !values.password){
          return;
        }
        auth.authorize(values.password, values.email)
          .then((data) => {
            if (data.token) {
              localStorage.setItem('jwt', data.token);
              setValues({email: '', password: ''});
              handleLogin(email);              
              navigate ('/', {replace:true});
              handleLoggedIn();
            } 
          })
          .catch(err => {console.log(err)
            handleInfoPopup()
          });
      }

  return (
    <>
    <FormBlackTheme
      title='Вход'
      buttonName='Войти'
      handleSubmit={handleSubmit}
      email={email}
      password={password}
      handleChange={handleChange}
    />
    <InfoTooltip
      onClose={closePopup}
      isOpen={isInfoPopupOpen}
      img={popupImageRed}
      title='Что-то пошло не так! Попробуйте ещё раз.'
    />
    </>
  )
} 