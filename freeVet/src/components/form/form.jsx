import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import s from "./form.module.css";
import plus from "../../assets/plus.svg"

const Form = () => {
  const [image, setImage] = useState(null); // Состояние для изображения

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Устанавливаем изображение
      };
      reader.readAsDataURL(file);
    }
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Отправляем данные вместе с изображением
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

      reset(); // Сбрасываем форму после успешной отправки
      setImage(null); // Сбрасываем изображение
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    }
  };

  return (
    <div className={s.form}>
      <h2>Создать новый аккаунт</h2>

      {/* Бокс для загрузки изображения */}
      <div className={s.imageBox}>
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          onChange={handleImageChange}
          style={{ display: "none" }} // Скрываем стандартный input
        />
        {/* Блок для изображения */}
        <label htmlFor="fileInput" className={s.customFileBox}>
          {image ? (
            <img src={image} alt="Uploaded" className={s.uploadedImage} />
          ) : (
            <span className={s.uploadPlaceholder}><img src={plus} alt="" /></span> // Плейсхолдер
          )}
        </label>
      </div>

      <form className={s.formBox} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Имя <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <input
          className={s.input}
          {...register("name")}
          placeholder="Ваше имя"
          required
        />
        <label>
          Телефон <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <input
          className={s.input}
          {...register("phone")}
          placeholder="+"
          required
        />
        <button className={s.subBtn}>Получить скидку</button>
      </form>
    </div>
  );
};

export default Form;