import React from "react";
import { Controller } from "react-hook-form";
import s from "./CodeInputBox.module.css";

const CodeInputBox = ({
  control,
  setValue,
  inputRefs,
  handleInputChange,
  handleKeyDown,
  errorVisible,
  codeError,
  resendAvailable,
  handleResendCode,
  seconds,
}) => {
  return (
    <div className={s.inputBox}>
      <p className={s.codeText}>
        Код <span>&#42;</span>
      </p>
      <div className={s.codeInputs}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Controller
            key={index}
            name={`digit${index}`}
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                ref={inputRefs[index]}
                type="text"
                maxLength="1"
                className={s.codeInput}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onInput={(e) => {
                  const value = e.target.value.replace(/\D/, "");
                  setValue(`digit${index}`, value);
                }}
              />
            )}
          />
        ))}
      </div>
      {errorVisible && codeError ? (
        <p className={s.requestCodeError}>Вы ввели неправильный код! Попробуйте еще раз</p>
      ) : resendAvailable ? (
        <div className={s.requestCodeBox}>
          <p onClick={handleResendCode} className={s.resendCode}>
            Не пришел код?
          </p>
          <button type="button" onClick={handleResendCode}>
            Отправить код повторно
          </button>
        </div>
      ) : (
        <div className={s.requestCodeBox}>
          <p>Не пришел код? Запросить код повторно можно через {seconds} секунд</p>
        </div>
      )}
    </div>
  );
};

export default CodeInputBox;
