import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Импортируем useNavigate
import { useForm } from "react-hook-form";
import axios from "axios";
import s from "./q_sendQuestionPage.module.css";
import FormHeader from "../../../components/formHeader/FormHeader";
import LineHeader from "../../../components/lineHeader/LineHeader";
import close from "../../../assets/close.svg";
import CustomTextarea from '../../../components/customTextarea/CustomTextarea';
import CustomButtonSubmit from "../../../components/customButtonSubmit/CustomButtonSubmit";
import texts from "../../../utils/ru_text"; // Импортируйте текстовый файл

const Q_sendQuestionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { petArt, petWeight, petGender, isHomeless, files } = location.state || {};

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: "onChange"
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Добавляем текстовые поля формы в formData
      formData.append("question", data.question);
      formData.append("petArt", petArt);
      formData.append("petWeight", petWeight);
      formData.append("petGender", petGender);
      formData.append("isHomeless", isHomeless);

      // Добавляем файлы в formData
      if (files && files.length > 0) {
        files.forEach((file, index) => {
          formData.append(`file_${index}`, file.data);
        });
      }

      // Отправка данных через axios с правильными заголовками для formData
      await axios.post("/api/submit-question", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // После успешной отправки формы перенаправляем пользователя
      navigate("/main/question/confirm");
    } catch (error) {
      console.error("Ошибка при отправке вопроса", error);
      alert("Ошибка при отправке вопроса");
    }
  };

  return (
    <div className={s.q_sendQuestionPage}>
      <div className={s.q_sendQuestionPage_header}>
        <FormHeader path="/main/question/choice" fontSize={36}>
          {texts.sendQuestionPage.header} {/* Заголовок страницы */}
        </FormHeader>
        <Link to={"/main"}>
          <img className={s.closeBtn} src={close} alt="close" />
        </Link>
      </div>
      <LineHeader middle={"var(--color-main)"} right={"var(--color-main)"} />
      <p className={s.q_sendQuestionPage_file_p}>{texts.sendQuestionPage.addedMedia}</p> {/* Текст добавленных медиа */}
      <div className={s.q_sendQuestionPage_fileBox}>
        {files && files.length > 0 ? (
          <div className={s.filesContainer}>
            {files.map((file, index) => (
              <div key={index} className={s.fileBox}>
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
          <p>{texts.sendQuestionPage.noPhotos}</p>
        )}
      </div>
      <div className={s.q_sendQuestionPage_description}>
        <p>{texts.sendQuestionPage.petArt}: {petArt}</p> {/* Вид животного */}
        <p>{texts.sendQuestionPage.petWeight}: {petWeight}</p> {/* Вес животного */}
        <p>{texts.sendQuestionPage.petGender}: {petGender}</p> {/* Пол животного */}
        <p style={{ display: "none" }}>
          {texts.sendQuestionPage.homeless} {isHomeless ? "Да" : "Нет"} {/* Безопасность животного */}
        </p>
      </div>
      <p className={s.q_sendQuestionPage_p}>Напишите Ваш вопрос</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomTextarea
          {...register("question", { required: texts.sendQuestionPage.requiredField })} 
          rows={8}
          cols={50}
          placeholder={texts.sendQuestionPage.questionPlaceholder} // Текстовое поле
          style={{borderColor: 'var(--color-input-bg-grey)', backgroundColor: 'var(--color-text-white)', height: '310px'}}
        />
        {errors.question && <p className={s.errorText}>{errors.question.message}</p>}

        <div className={s.btnBox}>
          <CustomButtonSubmit
            text={texts.sendQuestionPage.submitButton} // Текст кнопки
            padding={"16px 99.5px"}
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
};

export default Q_sendQuestionPage;
