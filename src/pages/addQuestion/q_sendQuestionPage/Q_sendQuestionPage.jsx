import React from "react";
import { Link, useLocation } from "react-router-dom";
import s from "./q_sendQuestionPage.module.css";
import FormHeader from "../../../components/formHeader/FormHeader";
import LineHeader from "../../../components/lineHeader/LineHeader";
import close from "../../../assets/close.svg";
import CustomTextarea from '../../../components/customTextarea/CustomTextarea';
import CustomButtonSubmit from "../../../components/customButtonSubmit/CustomButtonSubmit";

const Q_sendQuestionPage = () => {
  const location = useLocation();
  const { petArt, petWeight, petGender, isHomeless, files } =
    location.state || {};

  return (
    <div className={s.q_sendQuestionPage}>
      <div className={s.q_sendQuestionPage_header}>
        <FormHeader path="/main/question/choice" fontSize={36}>
          Задать вопрос
        </FormHeader>
        <Link to={"/main"}>
          <img className={s.closeBtn} src={close} alt="close" />
        </Link>
      </div>
      <LineHeader middle={"var(--color-main)"} right={"var(--color-main)"} />
      <p className={s.q_sendQuestionPage_file_p}>
        Добавленные фото и (или) видео
      </p>
      <div className={s.q_sendQuestionPage_fileBox}>
        {files && files.length > 0 ? (
          <div className={s.filesContainer}>
            {files.map((file, index) => (
              <div key={index} className={s.fileBox}>
                {/* Проверка типа файла */}
                {file.type.startsWith("image") ? (
                  <img src={file.data} alt={`uploaded-file-${index}`} />
                ) : file.type.startsWith("video") ? (
                  <video controls src={file.data} />
                ) : (
                  <p>Неподдерживаемый формат файла</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Фото отсутствует</p>
        )}
      </div>
      <div className={s.q_sendQuestionPage_description}>
        <p>{petArt}</p>
        <p>{petWeight}</p>
        <p>{petGender}</p>
        <p style={{ display: "none" }}>
          Животное бездомное: {isHomeless ? "Да" : "Нет"}
        </p>
      </div>
      <p className={s.q_sendQuestionPage_p}>Напишите Ваш вопрос</p>
      <CustomTextarea 
                // value={text}
                // onChange={handleChange}
                rows={8}
                cols={50}
                placeholder="Введите текст"
                style={{borderColor: 'var(--color-input-bg-grey)', backgroundColor: 'var(--color-text-white)', height: '310px'}}
      />
              <div className={s.btnBox}>
          <CustomButtonSubmit
            text="Отправить вопрос"
            padding={"16px 99.5px"}
            // disabled={!isFormValid}
          />
        </div>
    </div>
  );
};

export default Q_sendQuestionPage;
