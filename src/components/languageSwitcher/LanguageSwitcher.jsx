import  { useState } from "react";
import s from "./languageSwitcher.module.css";
// import flagEN from '../../assets/flags/en.svg';
// import flagME from '../../assets/flags/me.svg';
// import flagBA from '../../assets/flags/ba.svg';
// import flagRS from '../../assets/flags/rs.svg';
// import flagRU from '../../assets/flags/ru.svg';
// import flagUA from '../../assets/flags/ua.svg';
// import flagFR from '../../assets/flags/fr.svg';


const languages = [
  // { code: "en", name: "English", flag: flagEN },
  // { code: "me", name: "Montenegro", flag: flagME },
  // { code: "ba", name: "Bosnia", flag: flagBA },
  // { code: "rs", name: "Serbia", flag: flagRS },
  // { code: "ru", name: "Russia", flag: flagRU },
  // { code: "ua", name: "Ukraine", flag: flagUA },
  // { code: "fr", name: "France", flag: flagFR },
];

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false); // Для открытия/закрытия меню
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]); // Язык по умолчанию?????

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false); //Закрытие после выбора 
  };

  return (
    <div className={s.languageSwitcher}>
{/*       <button className={s.button} onClick={toggleMenu}>
        <img src={selectedLanguage.flag} alt={selectedLanguage.name} className={s.flagIcon} />
      </button>

      {isOpen && (
        <ul className={s.languageList}>
          {languages.map((language) => (
            <li
              key={language.code}
              className={s.languageItem}
              onClick={() => changeLanguage(language)}
            >
              <img src={language.flag} alt={language.name} className={s.flagIcon} />
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default LanguageSwitcher;
