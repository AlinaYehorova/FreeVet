import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomCheckbox from "../../../components/customCheckbox/CustomCheckbox";
import CustomTextarea from "../../../components/customTextarea/CustomTextarea";
import CustomButton from "../../../components/customButtonSubmit/CustomButtonSubmit";
import s from "./q_closeQuestionPage.module.css";

const Q_closeQuestionPage = () => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    setSelectedRating(parseInt(name));
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Нужно добавить URL-адрес");
    if (!selectedRating) return;

    // Обработка отправки данных на сервер
    const formData = {
      rating: selectedRating,
      feedback: textareaValue || "",
    };

    try {
      setIsSubmitting(true);
      const response = await axios.post("https://api-url.com", formData); // Добавить API_URL
      if (response.status >= 200 && response.status < 300) {
        navigate("/");
      } else {
        throw new Error("Ошибка при отправке данных");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={s.closeQuestionPage}>
      <h2>Закрыть вопрос</h2>
      <h5>Вы уверены, что хотите закрыть вопрос?</h5>
      <p className={s.closeQuestionText}>
        Пожалуйста, оцените ответы ветеринарного врача <br /> по шкале от 1 до 10, <br /> где 1 - совсем не понравилось, <br /> 10 -
        все супер! &#42;
      </p>
      <form className={s.form} onSubmit={handleSubmit}>
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
        <CustomButton
          text="Закрыть вопрос"
          type="submit"
          disabled={!selectedRating || isSubmitting}
          customStyle={{ marginTop: "80px" }}
        />
      </form>
    </div>
  );
};

export default Q_closeQuestionPage;
