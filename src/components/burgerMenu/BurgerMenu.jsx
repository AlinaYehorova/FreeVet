import { useState } from 'react';
import s from './burgerMenu.module.css'; 
import texts from '../../utils/ru_text'; // Импортируем текст

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={s.burgerMenu}>
      <div onClick={toggleMenu} className={s.burgerIcon}>
        <div className={s.dot}></div>
        <div className={s.dot}></div>
        <div className={s.dot}></div>
      </div>
      {isOpen && (
        <div className={s.modal}>
          <div className={s.modalContent}>
            <span className={s.close} onClick={toggleMenu}>&times;</span>
            <ul>
              <li>{texts.burgerMenu.editProfile}</li>
              <li>{texts.burgerMenu.settings}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
