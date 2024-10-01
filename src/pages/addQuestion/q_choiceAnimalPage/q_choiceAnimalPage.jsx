import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./q_choiceAnimalPage.module.css";
import FormHeader from "../../../components/formHeader/FormHeader";
import LineHeader from "../../../components/lineHeader/LineHeader";
import close from "../../../assets/close.svg";
import QuestionPetList from "../../../components/questionPetList/QuestionPetList";
import CustomButton from "../../../components/customButton/CustomButton";
import plus from "../../../assets/plus.svg";

const Q_choiceAnimalPage = () => {
  const [selectedAnimalType, setSelectedAnimalType] = useState(null); // состояние для выбранного животного с вет. книжкой
  const [isNewAnimalSelected, setIsNewAnimalSelected] = useState(false); // состояние для нового животного без вет. книжки
  const navigate = useNavigate();

  // Логика выбора животного с цифровой ветеринарной книжкой
  const handleSelectImage = (type) => {
    if (isNewAnimalSelected) {
      setIsNewAnimalSelected(false); // Сбросить выбор нового животного, если выбрано животное с вет. книжкой
    }
    setSelectedAnimalType(type); // Установить выбранное животное с цифровой книжкой
  };

  // Логика выбора нового животного без цифровой ветеринарной книжки
  const handleNewAnimalClick = () => {
    if (selectedAnimalType) {
      setSelectedAnimalType(null); // Сбросить выбор животного с вет. книжкой, если выбрано новое животное
    }
    setIsNewAnimalSelected(!isNewAnimalSelected); // Переключить выбор нового животного
  };

  // Логика обработки нажатия на кнопку "Продолжить"
  const handleButtonClick = () => {
    if (selectedAnimalType === "digital") {
      navigate("/link-to-digital"); // Перенаправляем на страницу для животных с цифровой книжкой
    } else if (isNewAnimalSelected) {
      navigate("/link-to-non-digital"); // Перенаправляем на страницу для животных без цифровой книжки
    }
  };

  return (
    <div className={s.q_choiceAnimalPage}>
      <div className={s.q_choiceAnimalPage_header}>
        <FormHeader path="/main" fontSize={36}>
          Задать вопрос
        </FormHeader>
        <img className={s.closeBtn} src={close} alt="close" />
      </div>
      <LineHeader middle={"var(--color-line)"} />
      <h5>
        Выберите животное,<br></br>по которому хотите задать вопрос
      </h5>

      {/* Список животных с цифровыми вет. книжками */}
      <QuestionPetList
        categories={[
          {
            title: "Мои животные",
            images: [
              { src: "https://placehold.co/400", type: "digital" },
              { src: "https://placehold.co/400", type: "digital" },
              { src: "https://placehold.co/400", type: "digital" },
            ],
            svgcolor: "green",
          },
          {
            title: "Бездомные животные",
            images: [
              { src: "https://placehold.co/400", type: "non-digital" },
              { src: "https://placehold.co/400", type: "non-digital" },
              { src: "https://placehold.co/400", type: "non-digital" },
            ],
            svgcolor: "orange",
          },
        ]}
        onSelectImage={handleSelectImage}
        selectedAnimalType={selectedAnimalType} // Добавляем текущий выбор
      />

      {/* Выбор нового животного без цифровой вет. книжки */}
      <div className={s.q_choiceAnimalPage_newAnimal_box}>
        <h5>
          Животные<br></br>без цифровых ветеринарных книжек
        </h5>
        <div className={s.q_choiceAnimalPage_newAnimal_boxBtnTitle}>
          <div
            className={`${s.q_choiceAnimalPage_newAnimal_btnPlus} ${
              isNewAnimalSelected ? s.selected : ""
            }`}
            onClick={handleNewAnimalClick}
          >
            <img src={plus} alt="plus" />
            <div
              className={`${s.circle} ${
                isNewAnimalSelected ? s.selected : ""
              }`}
            ></div>
          </div>
          <h5>Новое животное</h5>
        </div>
      </div>

      {/* Кнопка продолжения */}
      <CustomButton
        text="Продолжить"
        padding={"16px 120.5px"}
        onClick={handleButtonClick}
        disabled={!selectedAnimalType && !isNewAnimalSelected} // кнопка активна только при выборе животного
      />
    </div>
  );
};

export default Q_choiceAnimalPage;