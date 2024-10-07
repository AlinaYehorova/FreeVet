import React, { useState } from 'react';
import s from './burgerMenu.module.css'; 
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false); // Состояние для управления открытием меню

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Переключаем состояние меню
  };

  return (
    <div className={s.burgerMenu}>
      <div onClick={toggleMenu} className={s.burgerIcon}>
        {/* 3 точки */}
        <div className={s.dot}></div>
        <div className={s.dot}></div>
        <div className={s.dot}></div>
      </div>
      {isOpen && (
        <div className={s.modal}>
          <div className={s.modalContent}>
            <span className={s.close} onClick={toggleMenu}>&times;</span>
            <ul>
              <li>Редактировать профиль</li>
              <li>Настройки
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
