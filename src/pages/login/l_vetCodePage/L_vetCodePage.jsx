import s from "./l_vetCodePage.module.css";
import { useNavigate } from "react-router-dom";
import LineHeader from "../../../components/lineHeader/LineHeader";
import useVerificationCode from "../../../customHooks/useVerificationCode";
import CodeInputBox from "../../../components/codeInputBox/CodeInputBox";
import CustomButton from "../../../components/customButton/CustomButton";
import texts from '../../../utils/ru_text';  // Импорт текстов

const L_vetCodePage = () => {
  const navigate = useNavigate();
  const {
    control,
    setValue,
    handleSubmit,
    inputRefs,
    isFormValid,
    seconds,
    resendAvailable,
    codeError,
    errorVisible,
    handleInputChange,
    handleKeyDown,
    handleResendCode,
    validateCode,
  } = useVerificationCode();

  const onSubmit = (data) => {
    const code = Object.values(data).join("");
    if (validateCode(code)) {
      navigate("/verification/role");
    }
  };

  return (
    <div className={s.l_verificationPage}>
      <h2>{texts.vetCodePage.header}</h2>
      <LineHeader showMiddleLine={false} right={"var(--color-main)"} />
      <h5
        dangerouslySetInnerHTML={{__html:texts.vetCodePage.notAuthorized}}
      />
      <p className={s.l_verificationCode}
        dangerouslySetInnerHTML={{__html:texts.vetCodePage.enterCode}}
      />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <CodeInputBox
          control={control}
          setValue={setValue}
          inputRefs={inputRefs}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          errorVisible={errorVisible}
          codeError={codeError}
          resendAvailable={resendAvailable}
          handleResendCode={handleResendCode}
          seconds={seconds}
        />
        <div className={s.buttonLine}>
          <CustomButton
            link="/main"
            customStyle={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            padding={"16px 54px"}
            text={texts.vetCodePage.cancel}
            disabled={isFormValid}
          />
          <button className={s.button} type="submit" disabled={!isFormValid}>
            {texts.vetCodePage.submit}
          </button>
        </div>
      </form>
    </div>
  );
};

export default L_vetCodePage;
