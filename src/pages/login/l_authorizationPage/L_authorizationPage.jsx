import s from "./l_authorizationPage.module.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthOptions from '../../../components/authOptions/AuthOptions.jsx';
import LanguageSwitcher from  "../../../components/languageSwitcher/LanguageSwitcher.jsx";
import logo from "../../../assets/TailBook_ecosystem.png";
import banner from "../../../assets/banner.png";
import texts from "../../../utils/ru_text.js";

const L_authorizationPage = () => {
  return (
    <div className={s.l_authorizationPage}>

      <div className={s.header}>
        <img src={logo} alt="" />
       <LanguageSwitcher/> 
      </div>
      <div className={s.banner}>
        <img src={banner} alt="" />
        <p>{texts.authorizationPage.bannerText}</p> 
      </div>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <AuthOptions />
      </GoogleOAuthProvider>
    </div>
  );
};

export default L_authorizationPage;
