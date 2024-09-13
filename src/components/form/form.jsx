import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import s from "./form.module.css";
import plus from "../../assets/plus.svg"
import leftArrow from "../../assets/left-arrow.svg"

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
      <div className={s.formHeader}>
        <button className={s.formHeader_leftArrowBtn}><img src={leftArrow} alt="arrow to left side" /></button>
      <h2>Создать новый аккаунт</h2>
      </div>

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
            <span className={s.uploadPlaceholder}><img src={plus} alt="plus" /></span> // Плейсхолдер
          )}
        </label>
        <label htmlFor="fileInput" className={s.uploadLabel_addPhoto}> Добавить фото</label>
      </div>

      <form className={s.formBox} onSubmit={handleSubmit(onSubmit)}>
        <label style={{alignSelf: "start"}}>
          Имя <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <input
          className={s.input}
          {...register("name")}
          placeholder="Ваше имя"
          required
        />
        <label style={{alignSelf: "start"}}>
          Телефон <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <input
          className={s.input}
          {...register("phone")}
          placeholder="+"
          required
        />
        <h3 className={s.formBox_header}>Выберите Вашу роль в сервисе</h3>
        <div className={s.formBox_checkboxBox}>
          <span>
          <p>Кому Вы планируете помогать с FreeVet?</p>
          <div className={s.formBox_checkboxBox_pets}>
            <span><input type="checkbox" /> Бездомным животным</span>
            <span><input type="checkbox" /> Домашним животным</span>
          </div>
          </span>
          <span>
          <p>Расскажите о себе</p>
          <div className={s.formBox_checkboxBox_pets}>
            <span><input type="checkbox" /> Я - волонтер</span>
            <span style={{position: "relative", right: "5px"}}><input type="checkbox" /> Я - сотрудник приюта</span>
          </div>
          </span>
          <div className={s.formBox_checkboxBox_pets}>
            <span><input type="checkbox" /> Я - У меня есть домашнее животное</span>
            <button className={s.formBox_checkboxBox_petsBtn}>Пользователь</button>
          </div>
        </div>

        <div className={s.lineBox}>
          <div className={s.line}></div>
          <p>или</p>
          <div className={s.line}></div>
        </div>

        <div className={s.formBox_checkboxBox_last}>
          <span>
          <p>Вы хотите стать участником команды FreeVet?</p>
          <div className={s.formBox_checkboxBox_pets}>
            <span><input type="checkbox" /> Я - ветеринарный врач</span>
          </div>
          </span>
          <span>
          <div className={s.formBox_checkboxBox_pets}>
            <span><input type="checkbox" /> Я - кинолог</span>
          </div>
          </span>
          <div className={s.formBox_checkboxBox_pets}>
            <span><input type="checkbox" /> Я - зоопсихолог</span>
            <button className={s.formBox_checkboxBox_petsBtn}> Специалист</button>
          </div>
        </div>
        <button className={s.subBtn}>Отправить код</button> 
        <p className={s.privacyPolicy}>Нажимая на кнопку Отправить код, Вы соглашаетесь<br/>с Политикой конфиденциальности</p>
      </form>
    </div>
  );
};

export default Form;