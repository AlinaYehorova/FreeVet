import React, { useRef, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormHeader from "../../../components/formHeader/FormHeader";
import s from "./l_verificationPage.module.css";

const L_verificationPage = () => {
  const { handleSubmit, control, setValue, watch, reset } = useForm();
  const inputRefs = Array.from({ length: 6 }, () => useRef(null));
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [seconds, setSeconds] = useState(90);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorTimer, setErrorTimer] = useState(null);
  const watchAllFields = watch();

  // Обновление состояния валидности формы при каждом изменении поля
  useEffect(() => {
    const allFieldsFilled = Object.values(watchAllFields).every((val) => val && val.length === 1);
    setIsFormValid(allFieldsFilled);
  }, [watchAllFields]);

  // Установка фокуса на первый инпут при загрузке страницы
  useEffect(() => {
    if (inputRefs[0] && inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  // Таймер
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendAvailable(true);
    }
  }, [seconds]);

  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Убираем нецифровые символы
    // Устанавливаем значение, если введена цифра
    if (value.length === 1) {
      setValue(`digit${index}`, value);
      // Перемещаем фокус на следующий инпут, если текущий заполнен
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    } else if (value === "") {
      // Если значение пустое (удаление), возвращаем фокус на предыдущий инпут
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (e.target.value === "") {
        if (index > 0) {
          inputRefs[index - 1].current.focus();
        }
      } else {
        setValue(`digit${index}`, "");
      }
    }
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    const code = Object.values(data).join("");
    if (code !== "123456") {
      setCodeError(true);
      setErrorVisible(true);
      if (errorTimer) {
        clearTimeout(errorTimer);
      }
      const newTimer = setTimeout(() => setErrorVisible(false), 5000);
      setErrorTimer(newTimer);
      reset();
      inputRefs[0].current.focus();
    } else {
      setCodeError(false);
      navigate("/verification/role");
    }
  };

  const handleResendCode = () => {
    setSeconds(90);
    setResendAvailable(false);
  };

  return (
    <div className={s.l_verificationPage}>
      <FormHeader path="/register">Проверка телефона</FormHeader>
      <p className={s.enterCode}>
        Пожалуйста введите полученный Вами <br /> на указанный телефон код
      </p>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength="1"
                    className={s.codeInput}
                    onChange={(e) => {
                      handleInputChange(e, index);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onInput={(e) => {
                      const value = e.target.value.replace(/\D/, ""); // Разрешаем только цифры
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
        <button className={s.button} type="submit" disabled={!isFormValid}>
          Подтвердить
        </button>
      </form>
    </div>
  );
};

export default L_verificationPage;
