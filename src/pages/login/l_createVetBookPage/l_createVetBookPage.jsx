import s from "./l_createVetBookPage.module.css";
import { Link } from "react-router-dom";
import close from "../../../assets/close.svg";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import CustomInput from "../../../components/customInput/CustomInput";
import FileUploader from "../../../components/fileUploader/FileUploader";
import CustomButton from "../../../components/customButton/CustomButton";

const L_createVetBookPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange", // Включаем проверку на каждом изменении
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("petName", data.name);
      formData.append("petArt", data.phone);
      formData.append("petWeight", data.phone);
      formData.append("petGender", data.phone);
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
    <div className={s.l_createVetBookPage}>
      <div className={s.formHeader}>
        <h2>Ветеринарная книжка</h2>
        <Link to="/main" className={s.formHeader_closeBtn}>
          <img src={close} alt="arrow to left side" />
        </Link>
      </div>
      <h5>
        Похоже, что у Вашего любимца <br /> еще нет цифровой ветеринарной книжки
        :(
      </h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label style={{ alignSelf: "start" }}>
          Имя любимца <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("petName", {
            required: "Имя обязательно",
            minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          placeholder="Имя любимца"
          borderColor="var(--color-main)"
          width={328}
        />
        {/* Ошибка имени */}
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        <p className={s.addPhoto_p} style={{ marginTop: "8px", textAlign: "left" }}>
          Добавить фото<span style={{ color: "#2A9D8F" }}>*</span>
        </p>
        <span style={{ alignSelf: "self-start" }}>
          <FileUploader maxFiles={3} boxSize={104} borderRadius={20} />
        </span>
        <label style={{ alignSelf: "start" }}>
          Вид животного <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("petArt", {
            required: "Вид животного обязательно",
            minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          placeholder="Вид животного"
          borderColor="var(--color-main)"
          width={328}
        />
        {/* Ошибка имени */}
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        <label style={{ alignSelf: "start" }}>
          Примерный вес животного <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("petWeight", {
            required: "Вec животного обязательно",
            minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          placeholder="Вес животного"
          borderColor="var(--color-main)"
          width={153}
        />
        {/* Ошибка имени */}
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        <label style={{ alignSelf: "start" }}>
          Пол животного <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("petGender", {
            required: "Пол животного обязательно",
            minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          placeholder="Пол животного"
          borderColor="var(--color-main)"
          width={153}
        />
        {/* Ошибка имени */}
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        <p className={s.vetBook_description}>
          Ветеринарная книжка -<br></br>это цифровая версия паспорта животного <br></br>с полезными
          функциями,<br></br>упрощающими процесс заботы
        </p>
        <div className={s.btnBox}>
          <CustomButton text="Не создавать"/>
          <CustomButton text="Создать"/>
        </div>
      </form>
    </div>
  );
};

export default L_createVetBookPage;
