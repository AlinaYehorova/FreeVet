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
    mode: "onChange", // Проверка на каждом изменении
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Функция для обновления состояния загруженных файлов
  const onUpload = (files) => {
    setUploadedFiles(files);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("petName", data.petName);
      formData.append("petArt", data.petArt);
      formData.append("petWeight", data.petWeight);
      formData.append("petGender", data.petGender);
      uploadedFiles.forEach(file => formData.append("images", file));

      await axios.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Сброс полей формы после успешной отправки
      reset();
      setUploadedFiles([]);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    }
  };

  // Проверяем, активна ли кнопка "Создать"
  const isCreateButtonDisabled = uploadedFiles.length === 0 || !isValid;

  // Проверяем, активна ли кнопка "Не создавать"
  const isCancelButtonDisabled = uploadedFiles.length > 0 || isValid;

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
          color={'var(--color-text-dark)'}
          placeholder="Имя любимца"
          borderColor="var(--color-main)"
          width={328}
        />
        {/* Ошибка имени */}
        {errors.petName && <p style={{ color: "red" }}>{errors.petName.message}</p>}
        
        <p className={s.addPhoto_p} style={{ marginTop: "8px", textAlign: "left" }}>
          Добавить фото<span style={{ color: "#2A9D8F" }}>*</span>
        </p>
        <FileUploader maxFiles={3} boxSize={104} borderRadius={20} onUpload={onUpload} />
        
        <label style={{ alignSelf: "start" }}>
          Вид животного <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("petArt", {
            required: "Вид животного обязательно",
            minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          color={'var(--color-text-dark)'}
          placeholder="Вид животного"
          borderColor="var(--color-main)"
          width={328}
        />
        {/* Ошибка имени */}
        {errors.petArt && <p style={{ color: "red" }}>{errors.petArt.message}</p>}
        
        <label style={{ alignSelf: "start" }}>
          Примерный вес животного <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("petWeight", {
            required: "Вес животного обязательно",
            minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          color={'var(--color-text-dark)'}
          placeholder="Вес животного"
          borderColor="var(--color-main)"
          width={153}
        />
        {/* Ошибка имени */}
        {errors.petWeight && <p style={{ color: "red" }}>{errors.petWeight.message}</p>}

        <label style={{ alignSelf: "start" }}>
          Пол животного <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("petGender", {
            required: "Пол животного обязательно",
            minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          color={'var(--color-text-dark)'}
          placeholder="Пол животного"
          borderColor="var(--color-main)"
          width={153}
        />
        {/* Ошибка имени */}
        {errors.petGender && <p style={{ color: "red" }}>{errors.petGender.message}</p>}

        <p className={s.vetBook_description}>
          Ветеринарная книжка -<br></br>это цифровая версия паспорта животного <br></br>с полезными
          функциями,<br></br>упрощающими процесс заботы
        </p>
        <div className={s.btnBox}>
          <CustomButton 
            link="/main" 
            customStyle={{ whiteSpace: 'nowrap' }} 
            padding={'16px 34px'} 
            text="Не создавать" 
            disabled={isCancelButtonDisabled} // Изменено условие
          />
          <CustomButton 
            type="submit" 
            disabled={isCreateButtonDisabled} 
            customStyle={{ whiteSpace: 'nowrap' }} 
            padding={'16px 53px'} 
            text="Создать" 
          />
        </div>
      </form>
    </div>
  );
};

export default L_createVetBookPage;
