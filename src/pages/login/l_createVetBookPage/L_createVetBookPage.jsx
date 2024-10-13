import s from "./l_createVetBookPage.module.css";
import { Link } from "react-router-dom";
import close from "../../../assets/close.svg";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import CustomInput from "../../../components/customInput/CustomInput";
import FileUploader from "../../../components/fileUploader/FileUploader";
import CustomButton from "../../../components/customButton/CustomButton";
import texts from "../../../utils/ru_text"; // Импортируем тексты

const L_createVetBookPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

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
      reset();
      setUploadedFiles([]);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    }
  };

  const isCreateButtonDisabled = uploadedFiles.length === 0 || !isValid;
  const isCancelButtonDisabled = uploadedFiles.length > 0 || isValid;

  return (
    <div className={s.l_createVetBookPage}>
      <div className={s.formHeader}>
        <h2>{texts.l_createVetBookPage.header}</h2> {/* Заголовок */}
        <Link to="/main" className={s.formHeader_closeBtn}>
          <img src={close} alt="arrow to left side" />
        </Link>
      </div>
      <h5
        dangerouslySetInnerHTML={{ __html:texts.l_createVetBookPage.noBook}} />{/* Текст о том, что у любимца еще нет книжки */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label style={{ alignSelf: "start" }}>
          {texts.l_createVetBookPage.petName} <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("petName", {
            required: texts.customInput.defaultErrorMessage,
            minLength: { value: 2, message: texts.registrationPage.nameErrorMinLength },
          })}
          color={'var(--color-text-dark)'}
          placeholder={texts.l_createVetBookPage.namePlaceholder}
          borderColor="var(--color-main)"
          width={328}
        />
        {errors.petName && <p style={{ color: "red" }}>{errors.petName.message}</p>}

        <p className={s.addPhoto_p} style={{ marginTop: "8px", textAlign: "left" }}>
          {texts.l_createVetBookPage.addPhoto}<span style={{ color: "#2A9D8F" }}>*</span>
        </p>
        <FileUploader maxFiles={3} boxSize={104} borderRadius={20} onUpload={onUpload} />

        <label style={{ alignSelf: "start" }}>
          {texts.l_createVetBookPage.petArt} <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("petArt", {
            required: texts.descriptionAnimalPage.requiredSymbol,
            minLength: { value: 2, message: texts.registrationPage.nameErrorMinLength },
          })}
          color={'var(--color-text-dark)'}
          placeholder={texts.l_createVetBookPage.petArt}
          borderColor="var(--color-main)"
          width={328}
        />
        {errors.petArt && <p style={{ color: "red" }}>{errors.petArt.message}</p>}

        <label style={{ alignSelf: "start" }}>
          {texts.l_createVetBookPage.petWeight} <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("petWeight", {
            required: texts.customInput.defaultErrorMessage,
            minLength: { value: 2, message: texts.registrationPage.nameErrorMinLength },
          })}
          color={'var(--color-text-dark)'}
          placeholder={texts.l_createVetBookPage.petWeight}
          borderColor="var(--color-main)"
          width={153}
        />
        {errors.petWeight && <p style={{ color: "red" }}>{errors.petWeight.message}</p>}

        <label style={{ alignSelf: "start" }}>
          {texts.l_createVetBookPage.petGender} <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("petGender", {
            required: texts.customInput.defaultErrorMessage,
            minLength: { value: 2, message: texts.registrationPage.nameErrorMinLength },
          })}
          color={'var(--color-text-dark)'}
          placeholder={texts.l_createVetBookPage.petGender}
          borderColor="var(--color-main)"
          width={153}
        />
        {errors.petGender && <p style={{ color: "red" }}>{errors.petGender.message}</p>}

        <p className={s.vetBook_description}
          dangerouslySetInnerHTML={{__html:texts.l_createVetBookPage.vetBook_description}}
        />
        <div className={s.btnBox}>
          <CustomButton 
            link="/main" 
            customStyle={{ whiteSpace: 'nowrap' }} 
            padding={'16px 34px'} 
            text={texts.l_createVetBookPage.noCreateBtn} 
            disabled={isCancelButtonDisabled} 
          />
          <CustomButton 
            type="submit" 
            customStyle={{ whiteSpace: 'nowrap' }} 
            padding={'16px 34px'} 
            text={texts.l_createVetBookPage.createBtn} 
            disabled={isCreateButtonDisabled} 
          />
        </div>
      </form>
    </div>
  );
};

export default L_createVetBookPage;
