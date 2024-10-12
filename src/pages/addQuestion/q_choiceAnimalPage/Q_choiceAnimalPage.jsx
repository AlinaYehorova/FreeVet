import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import s from "./q_choiceAnimalPage.module.css";
import FormHeader from "../../../components/formHeader/FormHeader";
import LineHeader from "../../../components/lineHeader/LineHeader";
import close from "../../../assets/close.svg";
import QuestionPetList from "../../../components/questionPetList/QuestionPetList";
import CustomButton from "../../../components/customButton/CustomButton";
import plus from "../../../assets/plus.svg";
import texts from '../../../utils/ru_text'; // Импортируем файл с текстами

const Q_choiceAnimalPage = () => {
  const [selectedAnimalType, setSelectedAnimalType] = useState(null); // состояние для хранения типа животного
  const [isNewAnimalSelected, setIsNewAnimalSelected] = useState(false); // состояние для животных без вет. книжки
  const [resetSelection, setResetSelection] = useState(false); // состояние для сброса выбранного животного с книжкой
  const navigate = useNavigate();

  // Функция для выбора изображения животного
  const handleSelectImage = (type) => {
    setIsNewAnimalSelected(false); // сбрасываем выбор нового животного при выборе животного с цифровой книжкой
    setSelectedAnimalType(type); // обновляем состояние выбранного животного
    setResetSelection(false); // сбрасываем состояние сброса
  };

  // Функция для выбора нового животного
  const handleNewAnimalClick = () => {
    setSelectedAnimalType(null); // сбрасываем выбор животного с книжкой
    setIsNewAnimalSelected(!isNewAnimalSelected); // переключаем выбор нового животного
    setResetSelection(true); // активируем сброс выбора животного с книжкой
  };

  // Определяем ссылку для перехода на основе выбранного типа животного
  const animalBasedLink = selectedAnimalType === "digital"
    ? "/link-to-digital" // если выбрано животное с цифровой книжкой
    : isNewAnimalSelected
      ? "/main/question/description-animal" // если выбрано животное без книжки
      : "#"; // если ничего не выбрано

  return (
    <div className={s.q_choiceAnimalPage}>
      <div className={s.q_choiceAnimalPage_header}>
        <FormHeader path="/main" fontSize={36}>
          {texts.questionPage.header} {/* Используем текст из файла */}
        </FormHeader>
        <Link to={"/main"}>
          <img className={s.closeBtn} src={close} alt="close" />
        </Link>
      </div>
      <LineHeader middle={"var(--color-line)"} />
      <h5 dangerouslySetInnerHTML={{ __html: texts.questionPage.animalSelection }} /> {/* Используем текст из файла */}
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
        <h5 dangerouslySetInnerHTML={{ __html: texts.questionPage.newAnimal }} /> {/* Используем текст из файла */}
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
  text={texts.questionPage.continueButton} // Используем текст из файла
  padding={"16px 120.5px"}
  link={animalBasedLink} // Передаем динамическую ссылку
  disabled={!selectedAnimalType && !isNewAnimalSelected} // кнопка активна только при выборе животного
/>

    </div>
  );
};

export default Q_choiceAnimalPage;
