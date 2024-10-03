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
  const [selectedAnimalType, setSelectedAnimalType] = useState(null); // состояние для хранения типа животного
  const [isNewAnimalSelected, setIsNewAnimalSelected] = useState(false); // состояние для животных без вет. книжки
  const [resetSelection, setResetSelection] = useState(false); // состояние для сброса выбранного животного с книжкой
  const navigate = useNavigate();

  const handleSelectImage = (type) => {
    setIsNewAnimalSelected(false); // сбрасываем выбор нового животного при выборе животного с цифровой книжкой
    setSelectedAnimalType(type); // обновляем состояние выбранного животного
    setResetSelection(false); // сбрасываем состояние сброса
  };

  const handleNewAnimalClick = () => {
    setSelectedAnimalType(null); // сбрасываем выбор животного с книжкой
    setIsNewAnimalSelected(!isNewAnimalSelected); // переключаем выбор нового животного
    setResetSelection(true); // активируем сброс выбора животного с книжкой
  };

  const handleButtonClick = () => {
    if (selectedAnimalType === "digital") {
      navigate("/link-to-digital"); // перенаправляем на страницу для животных с цифровой книжкой
    } else if (isNewAnimalSelected) {
      navigate("/link-to-non-digital"); // перенаправляем на страницу для животных без цифровой книжки
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
        resetSelection={resetSelection}
      />
      <div className={s.q_choiceAnimalPage_newAnimal_box}>
        <h5>
          Животные<br></br>без цифровых ветеринарных книжек
        </h5>
        <div className={s.q_choiceAnimalPage_newAnimal_boxBtnTitle}>
          <div
            className={s.q_choiceAnimalPage_newAnimal_btnPlus}
            onClick={handleNewAnimalClick}
          >
            <img src={plus} alt="plus" />
            <div className={`${s.circle} ${isNewAnimalSelected ? s.selected : ""}`} />
          </div>
          <h5>Новое животное</h5>
        </div>
      </div>
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
