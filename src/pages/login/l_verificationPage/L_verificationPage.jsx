import { useNavigate } from "react-router-dom";
import s from "./l_verificationPage.module.css";
import FormHeader from "../../../components/formHeader/FormHeader";
import useVerificationCode from "../../../customHooks/useVerificationCode";
import CodeInputBox from "../../../components/codeInputBox/CodeInputBox";

const L_verificationPage = () => {
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
      <FormHeader path="/register">Проверка телефона</FormHeader>
      <p className={s.enterCode}>
        Пожалуйста введите полученный Вами <br /> на указанный телефон код
      </p>
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
        <button className={s.button} type="submit" disabled={!isFormValid}>
          Подтвердить
        </button>
      </form>
    </div>
  );
};

export default L_verificationPage;
