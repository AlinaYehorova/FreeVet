import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import s from "./form.module.css";
import plus from "../../assets/plus.svg";
import leftArrow from "../../assets/left-arrow.svg";
import CustomButton from "../CustomButton/CustomButton";

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

  return (
    <div className={s.form}>
      <div className={s.formHeader}>
        <button className={s.formHeader_leftArrowBtn}>
          <img src={leftArrow} alt="arrow to left side" />
        </button>
        <h2>Создать новый аккаунт</h2>
      </div>

      {/* Бокс для загрузки изображения */}
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
          Добавить фото
        </label>
      </div>

      <form className={s.formBox} onSubmit={handleSubmit(onSubmit)}>
        <label style={{ alignSelf: "start" }}>
          Имя <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <input
          className={s.input}
          {...register("name")}
          placeholder="Ваше имя"
          required
        />
        <label style={{ alignSelf: "start" }}>
          Телефон <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <input
          className={s.input}
          {...register("phone")}
          placeholder="+"
          required
        />

        <h3 className={s.formBox_header}>Выберите Вашу роль в сервисе</h3>

        {/* Блок для пользователя */}
        <div className={s.formBox_checkboxBox_user}>
          <span>
            <p>Кому Вы планируете помогать с FreeVet?</p>
            <div className={s.formBox_checkboxBox_pets}>
              <span>
                <input
                  type="checkbox"
                  name="homelessAnimals"
                  onChange={handleUserRoleChange}
                  checked={userRoles.homelessAnimals}
                  disabled={isVetRoleSelected}
                />{" "}
                Бездомным животным
              </span>
              <span>
                <input
                  type="checkbox"
                  name="pets"
                  onChange={handleUserRoleChange}
                  checked={userRoles.pets}
                  disabled={isVetRoleSelected}
                />{" "}
                Домашним животным
              </span>
            </div>
          </span>
          <span>
            <p>Расскажите о себе</p>
            <div className={s.formBox_checkboxBox_pets}>
              <span>
                <input
                  type="checkbox"
                  name="volunteer"
                  onChange={handleUserRoleChange}
                  checked={userRoles.volunteer}
                  disabled={isVetRoleSelected}
                />{" "}
                Я - волонтер
              </span>
              <span style={{ position: "relative", right: "5px" }}>
                <input
                  type="checkbox"
                  name="shelterWorker"
                  onChange={handleUserRoleChange}
                  checked={userRoles.shelterWorker}
                  disabled={isVetRoleSelected}
                />{" "}
                Я - сотрудник приюта
              </span>
            </div>
          </span>
          <span>
            <div className={s.formBox_checkboxBox_pets}>
              <span>
                <input
                  type="checkbox"
                  name="petOwner"
                  onChange={handleUserRoleChange}
                  checked={userRoles.petOwner}
                  disabled={isVetRoleSelected}
                />{" "}
                У меня есть домашнее животное
              </span>
            </div>
            <div className={s.formBox_checkboxBox_petsRole}>Пользователь</div>
          </span>
        </div>

        <div className={s.lineBox}>
          <div className={s.line}></div>
          <p>или</p>
          <div className={s.line}></div>
        </div>

        {/* Блок для специалиста */}
        <div className={s.formBox_checkboxBox_specialist}>
          <span>
            <p>Вы хотите стать участником команды FreeVet?</p>
            <div className={s.formBox_checkboxBox_pets}>
              <span>
                <input
                  type="checkbox"
                  name="vetDoctor"
                  onChange={handleVetRoleChange}
                  checked={vetRoles.vetDoctor}
                  disabled={isUserRoleSelected}
                />{" "}
                Я - ветеринарный врач
              </span>
            </div>
          </span>
          <span>
            <div className={s.formBox_checkboxBox_pets}>
              <span>
                <input
                  type="checkbox"
                  name="cynologist"
                  onChange={handleVetRoleChange}
                  checked={vetRoles.cynologist}
                  disabled={isUserRoleSelected}
                />{" "}
                Я - кинолог
              </span>
            </div>
          </span>
          <div className={s.formBox_checkboxBox_pets}>
            <span>
              <input
                type="checkbox"
                name="zooPsychologist"
                onChange={handleVetRoleChange}
                checked={vetRoles.zooPsychologist}
                disabled={isUserRoleSelected}
              />{" "}
              Я - зоопсихолог
            </span>
            <div className={s.formBox_checkboxBox_petsRole}>Специалист</div>
          </div>
        </div>

        <CustomButton text="Отправить код" padding="16px 78px"/>
        <p className={s.privacyPolicy}>
          Нажимая на кнопку Отправить код, Вы соглашаетесь
          <br />с Политикой конфиденциальности
        </p>
      </form>
    </div>
  );
};

export default Form;
