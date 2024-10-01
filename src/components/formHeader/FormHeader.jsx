import React from "react";
import leftArrow from "../../assets/left-arrow.svg";
import s from "./formHeader.module.css";
import { Link } from "react-router-dom";

const FormHeader = ({ path, children, headerPadding = "0", fontSize }) => {
  return (
    <div className={s.formHeader}>
      <Link to={path} className={s.formHeader_leftArrowBtn}>
        <img src={leftArrow} alt="Get back" />
      </Link>
      <h2 style={{ padding: headerPadding, fontSize: fontSize || '22px' }}>{children}</h2>
    </div>
  );
};

export default FormHeader;
