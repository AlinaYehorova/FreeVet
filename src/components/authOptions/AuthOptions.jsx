import s from './authOptions.module.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import phone from '../../assets/loginIcons/phone.svg';
import facebook from '../../assets/loginIcons/facebook.svg';
import google from '../../assets/loginIcons/google.svg';
import apple from '../../assets/loginIcons/apple.svg';
import texts from '../../utils/ru_text';
import { loginUserGoogle, loginUserFacebook } from '../../utils/api.js'; // импортируем API-функции

const AuthOptions = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const response = await loginUserGoogle(); // отправляем запрос на сервер
      console.log('Google API response:', response);
    } catch (error) {
      console.error('Ошибка при входе через Google:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const response = await loginUserFacebook(); // отправляем запрос на сервер
      console.log('Facebook API response:', response);
    } catch (error) {
      console.error('Ошибка при входе через Facebook:', error);
    }
  };

  const handleAppleLogin = () => {
    alert('Apple login не реализован');
  };

  const handlePhoneLogin = () => {
    navigate('/register');
  };

  return (
    <div className={s.container}>
      <p className={s.title}>{texts.authOptions.register}</p>
      <div className={s.buttonGroup}>
        <button onClick={handlePhoneLogin} className={s.button}>
          <img src={phone} alt="Phone Login" className={s.icon} />
        </button>

        <button onClick={handleFacebookLogin} className={s.button}>
          <img src={facebook} alt="Facebook Login" className={s.icon} />
        </button>

        <button onClick={handleGoogleLogin} className={s.button}>
          <img src={google} alt="Google Login" className={s.icon} />
        </button>

        <button onClick={handleAppleLogin} className={s.button}>
          <img src={apple} alt="Apple Login" className={s.icon} />
        </button>
      </div>

      <div className={s.lineBox}>
        <div className={s.line}></div>
        <p>{texts.authOptions.or}</p>
        <div className={s.line}></div>
      </div>

      <p className={s.title}>{texts.authOptions.login}</p>
      <div className={s.buttonGroup}>
        <Link to={'/login'} className={s.button}>
          <img src={phone} alt="Phone Login" className={s.icon} />
        </Link>

        <button onClick={handleFacebookLogin} className={s.button}>
          <img src={facebook} alt="Facebook Login" className={s.icon} />
        </button>

        <button onClick={handleGoogleLogin} className={s.button}>
          <img src={google} alt="Google Login" className={s.icon} />
        </button>

        <button onClick={handleAppleLogin} className={s.button}>
          <img src={apple} alt="Apple Login" className={s.icon} />
        </button>
      </div>
    </div>
  );
};

export default AuthOptions;
