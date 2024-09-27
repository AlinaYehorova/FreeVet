import s from "./l_registrationPage.module.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import leftArrow from "../../../assets/left-arrow.svg";
import CustomInput from "../../../components/customInput/CustomInput";
import CustomButton from "../../../components/customButton/CustomButton";
import FileUploader from "../../../components/fileUploader/FileUploader";

const L_registrationPage = () => {
  const [image, setImage] = useState(null);


  // Подключаем useForm с режимом "onChange", чтобы отслеживать каждое изменение
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange", // Включаем проверку на каждом изменении
  });

  // Функция отправки данных на сервер
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      if (image) {
        formData.append("image", image);
      }

      await axios.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Сброс полей формы после успешной отправки
      reset();
      setImage(null);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    }
  };

  return (
    <form className={s.l_registrationPage} onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className={s.formHeader}>
          <Link to="/" className={s.formHeader_leftArrowBtn}>
            <img src={leftArrow} alt="arrow to left side" />
          </Link>
          <h2>Создать новый аккаунт</h2>
        </div>

        {/* Компонент загрузки изображения */}
        <FileUploader maxFiles={1} boxSize={72} borderRadius={15} />
        <p style={{ marginTop: "8px", textAlign: "center" }}>Добавить фото</p>

        {/* Поле для имени */}
        <label style={{ alignSelf: "start" }}>
          Имя <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("name", { 
            required: "Имя обязательно",
            minLength: { value: 2, message: "Минимум 2 символа" }
          })}
          placeholder="Ваше имя"
          width={335}
        />
        {/* Ошибка имени */}
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        {/* Поле для телефона */}
        <label style={{ alignSelf: "start" }}>
          Телефон <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("phone", { 
            required: "Телефон обязателен", 
            pattern: { value: /^\+?[0-9]{10,}$/, message: "Введите корректный номер телефона" } 
          })}
          placeholder="+"
          width={335}
        />
        {/* Ошибка телефона */}
        {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}
      </div>

      {/* Кнопка отправки */}
      <div>
        <CustomButton
        link = '/verification'
          type="submit" // Убедитесь, что это submit-кнопка
          text="Отправить код"
          padding="16px 78px"
          disabled={!isValid} // Деактивируем кнопку, если форма не валидна
        />
        <p className={s.privacyPolicy}>
          Нажимая на кнопку Отправить код, Вы соглашаетесь
          <br />с Политикой конфиденциальности
        </p>
      </div>
    </form>
  );
};

export default L_registrationPage;
