import React, { useState } from "react";
import CustomCheckbox from "../../../components/customCheckbox/CustomCheckbox";
import s from "./q_closeQuestionPage.module.css";
import CustomButton from "../../../components/customButton/CustomButton";
import CustomTextarea from "../../../components/customTextarea/CustomTextarea";

const Q_closeQuestionPage = () => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [textareaValue, setTextareaValue] = useState("");

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    setSelectedRating(parseInt(name));
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  return (
    <div className={s.closeQuestionPage}>
      <h2>Закрыть вопрос</h2>
      <h5>Вы уверены, что хотите закрыть вопрос?</h5>
      <p className={s.closeQuestionText}>
        Пожалуйста, оцените ответы ветеринарного врача <br /> по шкале от 1 до 10, <br /> где 1 - совсем не понравилось, <br /> 10 -
        все супер! &#42;
      </p>
      <form className={s.form}>
        <div className={s.checkboxContainer}>
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index + 1} className={s.checkboxWrapper}>
              <CustomCheckbox checked={selectedRating === index + 1} onChange={handleCheckboxChange} name={(index + 1).toString()} />
              <span>{index + 1}</span>
            </div>
          ))}
        </div>
        <div className={s.areaContainer}>
          <p>Вы можете оставить свой отзыв</p>
          <CustomTextarea backgroundColor="#2A9D8F16" value={textareaValue} onChange={handleTextareaChange} />
        </div>
        <CustomButton text={"Закрыть вопрос"} customStyle={{ marginTop: "80px" }} disabled={!selectedRating} />
      </form>
    </div>
  );
};

export default Q_closeQuestionPage;
