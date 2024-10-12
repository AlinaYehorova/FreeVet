import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import texts from "../../utils/ru_text"; // Импортируем текстовый файл
import s from "./form.module.css";
import plus from "../../assets/plus.svg";
import leftArrow from "../../assets/left-arrow.svg";
import CustomCheckbox from "../customCheckbox/CustomCheckbox";
import CustomButton from "../customButton/CustomButton";

const Form = () => {
  const [image, setImage] = useState(null);

  const [userRoles, setUserRoles] = useState({
    homelessAnimals: false,
    pets: false,
    volunteer: false,
    shelterWorker: false,
    petOwner: false,
  });

  const [vetRoles, setVetRoles] = useState({
    vetDoctor: false,
    cynologist: false,
    zooPsychologist: false,
  });

  const isUserRoleSelected = Object.values(userRoles).some((value) => value);
  const isVetRoleSelected = Object.values(vetRoles).some((value) => value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserRoleChange = (e) => {
    const { name, checked } = e.target;
    setUserRoles((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    if (checked) {
      setVetRoles({
        vetDoctor: false,
        cynologist: false,
        zooPsychologist: false,
      });
    }
  };

  const handleVetRoleChange = (e) => {
    const { name, checked } = e.target;
    setVetRoles((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    if (checked) {
      setUserRoles({
        homelessAnimals: false,
        pets: false,
        volunteer: false,
        shelterWorker: false,
        petOwner: false,
      });
    }
  };

  const { register, handleSubmit, reset } = useForm();

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

      reset();
      setImage(null);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    }
  };

  const handlePhoneLogin = () => {
    alert(texts.form.phoneLoginNotImplemented); // Используйте текст из файла
  };

  return (
    <div className={s.form}>
      <div className={s.formHeader}>
        <Link to="/" className={s.formHeader_leftArrowBtn}>
          <img src={leftArrow} alt="arrow to left side" />
        </Link>
        <h2>{texts.form.createAccount}</h2> {/* Замените заголовок */}
      </div>

      <div className={s.imageBox}>
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <label htmlFor="fileInput" className={s.customFileBox}>
          {image ? (
            <img src={image} alt="Uploaded" className={s.uploadedImage} />
          ) : (
            <span className={s.uploadPlaceholder}>
              <img src={plus} alt="plus" />
            </span>
          )}
        </label>
        <label htmlFor="fileInput" className={s.uploadLabel_addPhoto}>
          {texts.form.addPhoto} {/* Замените текст */}
        </label>
      </div>

      <form className={s.formBox} onSubmit={handleSubmit(onSubmit)}>
        <label style={{ alignSelf: "start" }}>
          {texts.form.name} <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <input
          className={s.input}
          {...register("name")}
          placeholder={texts.form.namePlaceholder} // Замените плейсхолдер
          required
        />
        <label style={{ alignSelf: "start" }}>
          {texts.form.phone} <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <input
          className={s.input}
          {...register("phone")}
          placeholder="+" // Здесь можно оставить, если это стандартный формат
          required
        />

        <h3 className={s.formBox_header}>{texts.form.selectRole}</h3> {/* Заголовок выбора роли */}

        {/* Блок для пользователя */}
        <div
          className={`${s.formBox_checkboxBox_user} ${
            isVetRoleSelected ? s.disabledBox : ""
          }`}
        >
          <span>
            <p className={isVetRoleSelected ? s.disabledText : ""}>
              {texts.form.helpWithFreeVet} {/* Замените текст */}
            </p>
            <div className={s.formBox_checkboxBox_pets}>
              <span>
                <CustomCheckbox
                  name="homelessAnimals"
                  onChange={handleUserRoleChange}
                  checked={userRoles.homelessAnimals}
                  disabled={isVetRoleSelected}
                />{" "}
                <span className={isVetRoleSelected ? s.disabledText : ""}>
                  {texts.form.helpHomelessAnimals} {/* Замените текст */}
                </span>
              </span>
              <span>
                <CustomCheckbox
                  name="pets"
                  onChange={handleUserRoleChange}
                  checked={userRoles.pets}
                  disabled={isVetRoleSelected}
                />{" "}
                <span className={isVetRoleSelected ? s.disabledText : ""}>
                  {texts.form.helpPets} {/* Замените текст */}
                </span>
              </span>
            </div>
          </span>
          <span>
            <p className={isVetRoleSelected ? s.disabledText : ""}>
              {texts.form.tellAboutYourself} {/* Замените текст */}
            </p>
            <div className={s.formBox_checkboxBox_pets}>
              <span>
                <CustomCheckbox
                  name="volunteer"
                  onChange={handleUserRoleChange}
                  checked={userRoles.volunteer}
                  disabled={isVetRoleSelected}
                />{" "}
                <span className={isVetRoleSelected ? s.disabledText : ""}>
                  {texts.form.volunteer} {/* Замените текст */}
                </span>
              </span>
              <span style={{ position: "relative", right: "5px" }}>
                <CustomCheckbox
                  name="shelterWorker"
                  onChange={handleUserRoleChange}
                  checked={userRoles.shelterWorker}
                  disabled={isVetRoleSelected}
                />{" "}
                <span className={isVetRoleSelected ? s.disabledText : ""}>
                  {texts.form.shelterWorker} {/* Замените текст */}
                </span>
              </span>
            </div>
          </span>
          <span>
            <div className={s.formBox_checkboxBox_pets}>
              <span>
                <CustomCheckbox
                  name="petOwner"
                  onChange={handleUserRoleChange}
                  checked={userRoles.petOwner}
                  disabled={isVetRoleSelected}
                />{" "}
                <span className={isVetRoleSelected ? s.disabledText : ""}>
                  {texts.form.havePet} {/* Замените текст */}
                </span>
              </span>
            </div>
            <div className={s.formBox_checkboxBox_petsRole}>Пользователь</div>
          </span>
        </div>

        <div className={s.lineBox}>
          <div className={s.line}></div>
          <p>{texts.form.or}</p> {/* Замените текст */}
          <div className={s.line}></div>
        </div>

        {/* Блок для специалиста */}
        <div
          className={`${s.formBox_checkboxBox_specialist} ${
            isUserRoleSelected ? s.disabledBox : ""
          }`}
        >
          <span>
            <p className={isUserRoleSelected ? s.disabledText : ""}>
              {texts.form.wantToJoin} {/* Замените текст */}
            </p>
            <div className={s.formBox_checkboxBox_pets}>
              <span>
                <CustomCheckbox
                  name="vetDoctor"
                  onChange={handleVetRoleChange}
                  checked={vetRoles.vetDoctor}
                  disabled={isUserRoleSelected}
                />{" "}
                <span className={isUserRoleSelected ? s.disabledText : ""}>
                  {texts.form.vetDoctor} {/* Замените текст */}
                </span>
              </span>
              <span>
                <CustomCheckbox
                  name="cynologist"
                  onChange={handleVetRoleChange}
                  checked={vetRoles.cynologist}
                  disabled={isUserRoleSelected}
                />{" "}
                <span className={isUserRoleSelected ? s.disabledText : ""}>
                  {texts.form.cynologist} {/* Замените текст */}
                </span>
              </span>
              <span>
                <CustomCheckbox
                  name="zooPsychologist"
                  onChange={handleVetRoleChange}
                  checked={vetRoles.zooPsychologist}
                  disabled={isUserRoleSelected}
                />{" "}
                <span className={isUserRoleSelected ? s.disabledText : ""}>
                  {texts.form.zooPsychologist} {/* Замените текст */}
                </span>
              </span>
            </div>
            <div className={s.formBox_checkboxBox_petsRole}>Специалист</div>
          </span>
        </div>

        <div className={s.buttonBox}>
          <CustomButton
            text={texts.form.createAccount} // Замените текст кнопки
            disabled={!(isUserRoleSelected || isVetRoleSelected)}
          />
          <button type="button" onClick={handlePhoneLogin} className={s.phoneLogin}>
            {texts.form.phoneLogin} {/* Замените текст кнопки входа */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
