import s from "./l_userRolePage.module.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import CustomButton from "../../../components/customButton/CustomButton";
import CustomCheckbox from "../../../components/customCheckbox/CustomCheckbox";
import CustomStickTitle from '../../../components/customStickTitle/CustomStickTitle';
import FormHeader from "../../../components/formHeader/FormHeader";
import texts from "../../../utils/ru_text.js"; // Импортируем текстовый файл

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
      <FormHeader path="/" fontSize={36} titleKey={texts.userRolePage.header}/>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.formBox}>
          <h5 className={s.formBox_header}>{texts.userRolePage.role}</h5>

          {/* Блок для пользователя */}
          <div
            className={`${s.formBox_checkboxBox_user} ${
              isVetRoleSelected ? s.disabledBox : ""
            }`}
          >
            <span>
              <p className={isVetRoleSelected ? s.disabledText : ""}>
              {texts.userRolePage.helpWithFreeVet}
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
                  {texts.userRolePage.helpHomelessAnimals}
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
                  {texts.userRolePage.helpPets}
                  </span>
                </span>
              </div>
            </span>
            <span>
              <p className={isVetRoleSelected ? s.disabledText : ""}>
              {texts.userRolePage.tellAboutYourself}
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
                  {texts.userRolePage.volunteer}
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
                  {texts.userRolePage.shelterWorker}
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
                  {texts.userRolePage.havePet}
                  </span>
                </span>
              </div>
              <span className={isVetRoleSelected ? s.disabledText : ""} style={{position: 'absolute', bottom: '-1px', right: '-1px'}}><CustomStickTitle backgroundColor={'white'} text={texts.userRolePage.userStick}/></span>
            </span>
          </div>

          <div className={s.lineBox}>
            <div className={s.line}></div>
            <p>{texts.userRolePage.or}</p>
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
              {texts.userRolePage.wantToJoin}
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
                  {texts.userRolePage.vetDoctor}
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
                  {texts.userRolePage.cynologist}
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
                {texts.userRolePage.zooPsychologist}
                </span>
              </span>
              <span className={isUserRoleSelected ? s.disabledText : ""} style={{position: 'absolute', bottom: '-1px', right: '-1px'}}><CustomStickTitle text={texts.userRolePage.vetStick} backgroundColor={'white'} /></span>
            </div>
          </div>
        </div>
        <div className={s.buttonBox}>
          <CustomButton
            onClick={handleSubmit}
            text={texts.userRolePage.saveBtn}
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