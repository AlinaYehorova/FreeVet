import s from "./l_authorizationPage.module.css";
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
        <AuthOptions />
    </div>
  );
};

export default L_authorizationPage;
