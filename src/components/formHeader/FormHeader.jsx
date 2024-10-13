import React from "react";
import leftArrow from "../../assets/left-arrow.svg";
import s from "./formHeader.module.css";
import { Link } from "react-router-dom";
import texts from "../../utils/ru_text"; // Импортируйте текстовый файл

const FormHeader = ({ path, titleKey, headerPadding = "0", fontSize }) => {
  return (
    <div className={s.formHeader}>
      <Link to={path} className={s.formHeader_leftArrowBtn}>
        <img src={leftArrow} alt={texts.formHeader.backButtonAlt} /> {/* Используйте текст из файла */}
      </Link>
      <h2 style={{ padding: headerPadding, fontSize: fontSize || '22px' }}>
        {titleKey} {/* Используем переданный пропс */}
      </h2>
    </div>
  );
};

export default FormHeader

//<FormHeader path="/previous" titleKey="title" />
