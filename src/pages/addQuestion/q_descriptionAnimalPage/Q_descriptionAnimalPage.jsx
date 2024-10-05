import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormHeader from '../../../components/formHeader/FormHeader';
import LineHeader from '../../../components/lineHeader/LineHeader';
import s from './q_descriptionAnimalPage.module.css';
import FileUploader from '../../../components/fileUploader/FileUploader';
import { useForm } from "react-hook-form";
import CustomInput from '../../../components/customInput/CustomInput';
import CustomCheckbox from '../../../components/customCheckbox/CustomCheckbox';
import close from '../../../assets/close.svg';
import CustomButtonSubmit from "../../../components/customButtonSubmit/CustomButtonSubmit";

const Q_descriptionAnimalPage = () => {
  const [files, setFiles] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  });

  // Обработчик загрузки файлов
  const onUpload = (uploadedFiles) => {
    // Сохраняем файлы в стейт как URL с использованием createObjectURL
    const fileData = uploadedFiles.map((file) => ({
      data: URL.createObjectURL(file),
      type: file.type
    }));
    setFiles(fileData);
  };

  const onSubmit = (data) => {
    const formData = {
      petArt: data.petArt,
      petWeight: data.petWeight,
      petGender: data.petGender,
      isHomeless: isCheckboxChecked,
      files: files // Передаем файлы как они есть
    };

    // Переход на страницу с передачей данных
    navigate("/main/question/description-animal/send", { state: formData });
  };

  const handleHomelessChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const petArt = watch("petArt");
  const petWeight = watch("petWeight");
  const petGender = watch("petGender");

  const isFormValid = isValid && petArt && petWeight && petGender;

  return (
    <div className={s.q_descriptionAnimalPage}>
      <div className={s.q_descriptionAnimalPage_header}>
        <FormHeader path="/main/question/choice" fontSize={36}>
          Задать вопрос
        </FormHeader>
        <Link to={"/main"}>
          <img className={s.closeBtn} src={close} alt="close" />
        </Link>
      </div>
      <LineHeader middle={"var(--color-main)"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Добавьте фото и (или) видео</p>
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
        {errors.petGender && <p style={{ color: "red" }}>{errors.petGender.message}</p>}

        <span className={s.checkboxBox}>
          <CustomCheckbox
            {...register("confirmation")}
            name="confirmation"
            onChange={handleHomelessChange}
            checked={isCheckboxChecked}
          />{" "}
          <span>Животное является бездомным</span>
        </span>
        
        <div className={s.btnBox}>
          <CustomButtonSubmit
            text="Продолжить"
            padding={"16px 120.5px"}
            disabled={!isFormValid}
          />
        </div>
      </form>
    </div>
  );
};

export default Q_descriptionAnimalPage;
