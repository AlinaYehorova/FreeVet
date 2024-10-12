import s from './authOptions.module.css';
import React from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';  
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useNavigate } from 'react-router-dom'; 
import phone from '../../assets/loginIcons/phone.svg';
import facebook from '../../assets/loginIcons/facebook.svg';
import google from '../../assets/loginIcons/google.svg';
import apple from '../../assets/loginIcons/apple.svg';
import texts from '../../utils/ru_text';

const AuthOptions = () => {
  const navigate = useNavigate(); 

  const responseFacebook = (response) => {
    console.log('Facebook login response:', response);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => console.log('Google login response:', response),
    onError: (error) => console.log('Google login error:', error),
  });

  const handleAppleLogin = () => {
    alert('Apple login not implemented yet!');
  };

  const handlePhoneLogin = () => {
    navigate('/register');
  };

  return (
    <GoogleOAuthProvider clientId="ВАШ_GOOGLE_CLIENT_ID">
      <div className={s.container}>
        <p className={s.title}>{texts.authOptions.register}</p>
        <div className={s.buttonGroup}>
          <button onClick={handlePhoneLogin} className={s.button}>
            <img src={phone} alt="Phone Login" className={s.icon} />
          </button>

          <FacebookLogin
            appId="YOUR_FACEBOOK_APP_ID"
            onSuccess={responseFacebook}
            onFail={(error) => console.log('Login Failed!', error)}
            render={({ onClick }) => (
              <button onClick={onClick} className={s.button}>
                <img src={facebook} alt="Facebook Login" className={s.icon} />
              </button>
            )}
          />

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
          <button onClick={handlePhoneLogin} className={s.button}>
            <img src={phone} alt="Phone Login" className={s.icon} />
          </button>

          <FacebookLogin
            appId="YOUR_FACEBOOK_APP_ID"
            onSuccess={responseFacebook}
            onFail={(error) => console.log('Login Failed!', error)}
            render={({ onClick }) => (
              <button onClick={onClick} className={s.button}>
                <img src={facebook} alt="Facebook Login" className={s.icon} />
              </button>
            )}
          />

          <button onClick={handleGoogleLogin} className={s.button}>
            <img src={google} alt="Google Login" className={s.icon} />
          </button>

          <button onClick={handleAppleLogin} className={s.button}>
            <img src={apple} alt="Apple Login" className={s.icon} />
          </button>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthOptions;
