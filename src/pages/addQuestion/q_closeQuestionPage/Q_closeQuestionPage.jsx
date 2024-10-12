import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomCheckbox from "../../../components/customCheckbox/CustomCheckbox";
import CustomTextarea from "../../../components/customTextarea/CustomTextarea";
import CustomButton from "../../../components/customButtonSubmit/CustomButtonSubmit";
import s from "./q_closeQuestionPage.module.css";
import texts from "../../../utils/ru_text"; // Импортируйте текстовый файл

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
      <h2>{texts.closeQuestionPage.header}</h2> {/* Заголовок страницы */}
      <h5>{texts.closeQuestionPage.confirmation}</h5> {/* Текст подтверждения */}
      <p className={s.closeQuestionText} dangerouslySetInnerHTML={{ __html: texts.closeQuestionPage.ratingPrompt }} /> {/* Описание рейтинга */}
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
          <p>{texts.closeQuestionPage.feedbackPrompt}</p> {/* Текст для отзыва */}
          <CustomTextarea backgroundColor="#2A9D8F16" value={textareaValue} onChange={handleTextareaChange} />
        </div>
        <CustomButton
          text={texts.closeQuestionPage.submitButton} // Текст кнопки
          type="submit"
          disabled={!selectedRating || isSubmitting}
          customStyle={{ marginTop: "80px" }}
        />
      </form>
    </div>
  );
};

export default Q_closeQuestionPage;
