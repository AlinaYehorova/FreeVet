import s from "./l_vetCodePage.module.css";
import { useNavigate } from "react-router-dom";
import LineHeader from "../../../components/lineHeader/LineHeader";
import useVerificationCode from "../../../customHooks/useVerificationCode";
import CodeInputBox from "../../../components/codeInputBox/CodeInputBox";
import { useState } from "react";
import CustomButton from "../../../components/customButton/CustomButton";

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
      <h2>Верификация</h2>
      <LineHeader showMiddleLine={false} background={{ left: "var(--color-main)", right: "var(--color-main)" }} />
      <h5>
        Похоже, что Вы еще не авторизованы <br />в сервисе в качестве специалиста :(
      </h5>
      <p className={s.l_verificationCode}>
        Пожалуйста, введите полученный Вами <br /> код авторизации
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
        <div className={s.buttonLine}>
          <CustomButton
            link="/main"
            customStyle={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            padding={"16px 54px"}
            text="Отмена"
            disabled={isFormValid}
          />
          <button className={s.button} type="submit" disabled={!isFormValid}>
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};
export default L_vetCodePage;
