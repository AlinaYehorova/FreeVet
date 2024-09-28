import s from "./l_userRolePage.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import leftArrow from "../../../assets/left-arrow.svg";
import CustomButton from "../../../components/customButton/CustomButton";
import CustomCheckbox from "../../../components/customCheckbox/CustomCheckbox";
import CustomStickTitle from '../../../components/customStickTitle/CustomStickTitle';

const L_userRolePage = () => {
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

  // Проверка на выбор хотя бы одного поля
  const isAnyRoleSelected = isUserRoleSelected || isVetRoleSelected;

  // Определяем ссылку для перехода на основе выбранной роли
  const roleBasedLink = isUserRoleSelected 
    ? "/verification/role/user/create-vetbook"  // Ссылка для пользователя
    : isVetRoleSelected 
      ? "/verification/role/vet/vet-verification" // Ссылка для ветеринара
      : "/"; // Дефолтная ссылка

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

      await axios.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      reset();
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    }
  };

  return (
    <div className={s.l_userRolePage}>
      <div className={s.formHeader}>
        <Link to="/register" className={s.formHeader_leftArrowBtn}>
          <img src={leftArrow} alt="arrow to left side" />
        </Link>
        <h2>Статус участника</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.formBox}>
          <h5 className={s.formBox_header}>Выберите Вашу роль в сервисе</h5>

          {/* Блок для пользователя */}
          <div
            className={`${s.formBox_checkboxBox_user} ${
              isVetRoleSelected ? s.disabledBox : ""
            }`}
          >
            <span>
              <p className={isVetRoleSelected ? s.disabledText : ""}>
                Кому Вы планируете помогать с FreeVet?
              </p>
              <div className={s.formBox_checkboxBox_pets}>
                <span>
                  <CustomCheckbox
                    {...register("homelessAnimals")}
                    name="homelessAnimals"
                    onChange={handleUserRoleChange}
                    checked={userRoles.homelessAnimals}
                    disabled={isVetRoleSelected}
                  />{" "}
                  <span className={isVetRoleSelected ? s.disabledText : ""}>
                    Бездомным животным
                  </span>
                </span>
                <span>
                  <CustomCheckbox
                    {...register("pets")}
                    name="pets"
                    onChange={handleUserRoleChange}
                    checked={userRoles.pets}
                    disabled={isVetRoleSelected}
                  />{" "}
                  <span className={isVetRoleSelected ? s.disabledText : ""}>
                    Домашним животным
                  </span>
                </span>
              </div>
            </span>
            <span>
              <p className={isVetRoleSelected ? s.disabledText : ""}>
                Расскажите о себе
              </p>
              <div className={s.formBox_checkboxBox_pets}>
                <span>
                  <CustomCheckbox
                    {...register("volunteer")}
                    name="volunteer"
                    onChange={handleUserRoleChange}
                    checked={userRoles.volunteer}
                    disabled={isVetRoleSelected}
                  />{" "}
                  <span className={isVetRoleSelected ? s.disabledText : ""}>
                    Я - волонтер
                  </span>
                </span>
                <span style={{ position: "relative", right: "5px" }}>
                  <CustomCheckbox
                    {...register("shelterWorker")}
                    name="shelterWorker"
                    onChange={handleUserRoleChange}
                    checked={userRoles.shelterWorker}
                    disabled={isVetRoleSelected}
                  />{" "}
                  <span className={isVetRoleSelected ? s.disabledText : ""}>
                    Я - сотрудник приюта
                  </span>
                </span>
              </div>
            </span>
            <span>
              <div className={s.formBox_checkboxBox_pets}>
                <span>
                  <CustomCheckbox
                    {...register("petOwner")}
                    name="petOwner"
                    onChange={handleUserRoleChange}
                    checked={userRoles.petOwner}
                    disabled={isVetRoleSelected}
                  />{" "}
                  <span className={isVetRoleSelected ? s.disabledText : ""}>
                    У меня есть домашнее животное
                  </span>
                </span>
              </div>
              <span className={isVetRoleSelected ? s.disabledText : ""} style={{position: 'absolute', bottom: '-1px', right: '-1px'}}><CustomStickTitle backgroundColor={'white'}/></span>
              <span className={isVetRoleSelected ? s.disabledText : ""} style={{position: 'absolute', bottom: '-1px', right: '-1px'}}><CustomStickTitle backgroundColor={'white'}/></span>
            </span>
          </div>

          <div className={s.lineBox}>
            <div className={s.line}></div>
            <p>или</p>
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
                Вы хотите стать участником команды FreeVet?
              </p>
              <div className={s.formBox_checkboxBox_pets}>
                <span>
                  <CustomCheckbox
                    {...register("vetDoctor")}
                    name="vetDoctor"
                    onChange={handleVetRoleChange}
                    checked={vetRoles.vetDoctor}
                    disabled={isUserRoleSelected}
                  />{" "}
                  <span className={isUserRoleSelected ? s.disabledText : ""}>
                    Я - ветеринарный врач
                  </span>
                </span>
              </div>
            </span>
            <span>
              <div className={s.formBox_checkboxBox_pets}>
                <span>
                  <CustomCheckbox
                    {...register("cynologist")}
                    name="cynologist"
                    onChange={handleVetRoleChange}
                    checked={vetRoles.cynologist}
                    disabled={isUserRoleSelected}
                  />{" "}
                  <span className={isUserRoleSelected ? s.disabledText : ""}>
                    Я - кинолог
                  </span>
                </span>
              </div>
            </span>
            <div className={s.formBox_checkboxBox_pets}>
              <span>
                <CustomCheckbox
                  {...register("zooPsychologist")}
                  name="zooPsychologist"
                  onChange={handleVetRoleChange}
                  checked={vetRoles.zooPsychologist}
                  disabled={isUserRoleSelected}
                />{" "}
                <span className={isUserRoleSelected ? s.disabledText : ""}>
                  Я - зоопсихолог
                </span>
              </span>
              <span className={isUserRoleSelected ? s.disabledText : ""} style={{position: 'absolute', bottom: '-1px', right: '-1px'}}><CustomStickTitle text="Специалист" backgroundColor={'white'}/></span>
            </div>
          </div>
        </div>
        <div className={s.buttonBox}>
          <CustomButton
            onClick={handleSubmit}
            text="Сохранить"
            padding="16px 78px"
            link={roleBasedLink} // Используем динамическую ссылку
            disabled={!isAnyRoleSelected}  
          />
        </div>
      </form>
    </div>
  );
};

export default L_userRolePage;
