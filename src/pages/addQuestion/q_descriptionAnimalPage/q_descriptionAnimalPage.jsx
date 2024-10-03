import FormHeader from '../../../components/formHeader/FormHeader'
import LineHeader from '../../../components/lineHeader/LineHeader'
import React, { useState } from "react";
import { Link } from "react-router-dom";
import close from '../../../assets/close.svg'
import s from './q_descriptionAnimalPage.module.css'
import FileUploader from '../../../components/fileUploader/FileUploader';
import { useForm } from "react-hook-form";
import CustomInput from '../../../components/customInput/CustomInput';
import CustomButton from '../../../components/customButton/CustomButton';
import CustomCheckbox from '../../../components/customCheckbox/CustomCheckbox';

const Q_descriptionAnimalPage = () => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,  // для наблюдения за состоянием полей
  } = useForm({
    mode: "onChange", // Проверка на каждом изменении
  });

    // Обработчик изменения текста
    const handleChange = (e) => setText(e.target.value);

    // Обработчик загрузки файлов
    const onUpload = (uploadedFiles) => {
      setFiles(uploadedFiles);
    };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("petArt", data.petArt);
      formData.append("petWeight", data.petWeight);
      formData.append("petGender", data.petGender);
      files.forEach(file => formData.append("images", file));

      await axios.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Сброс полей формы после успешной отправки
      reset();
      setFiles([]);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    }
  };

  // Обработчик изменений чекбокса
  const handleHomelessChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  // Слежение за полями формы
  const petArt = watch("petArt");
  const petWeight = watch("petWeight");
  const petGender = watch("petGender");

  // Логика активации кнопки
  const isFormValid = isValid && files.length > 0 && petArt && petWeight && petGender;

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
          <CustomButton
            text="Продолжить"
            padding={"16px 120.5px"}
            disabled={!isFormValid} // Деактивация кнопки, если форма не валидна
          />
        </div>
      </form>
    </div>
  );
};

export default Q_descriptionAnimalPage;
