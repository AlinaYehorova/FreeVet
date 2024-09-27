import CustomButton from "../../../components/customButton/CustomButton";
import s from "./l_verificationPage.module.css";

const L_verificationPage = () => {
  return (
    <div className={s.l_verificationPage}>
      Verification Page
      <CustomButton link="/verification/role" />
    </div>
  );
};

export default L_verificationPage;
