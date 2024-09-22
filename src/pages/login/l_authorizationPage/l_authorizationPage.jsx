import s from "./l_authorizationPage.module.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthOptions from '../../../components/authOptions/AuthOptions';
import LanguageSwitcher from "../../../components/languageSwitcher/LanguageSwitcher";

const L_authorizationPage = () => {
  return (
    <div className={s.l_authorizationPage}>
      <LanguageSwitcher/>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <AuthOptions />
      </GoogleOAuthProvider>
    </div>
  );
};

export default L_authorizationPage;
