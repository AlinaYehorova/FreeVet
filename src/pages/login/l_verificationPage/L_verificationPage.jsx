import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import CustomButton from "../../../components/customButton/CustomButton";
import FormHeader from "../../../components/formHeader/FormHeader";
import s from "./l_verificationPage.module.css";

const L_verificationPage = () => {
  const { handleSubmit, control, setValue } = useForm();
  const inputRefs = Array.from({ length: 6 }, () => useRef(null));

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

  const onSubmit = (data) => {
    const code = Object.values(data).join("");
    console.log(code); // Здесь будет логика отправки на сервер
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
            Код <span>&lowast;</span>
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
          <div className={s.requestCodeBox}>
            <p>Не пришел код? Запросить код повторно можно через 90 секунд</p>
          </div>
        </div>
        <CustomButton
          customStyle={{ marginBottom: "50px" }}
          link="/verification/role"
          type="submit"
          text="Подтвердить"
          padding="16px 85px"
        />
      </form>
    </div>
  );
};

export default L_verificationPage;
