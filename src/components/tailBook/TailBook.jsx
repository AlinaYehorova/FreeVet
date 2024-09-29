import s from './TailBook.module.css';
import sendIcon from '../../assets/tailIcons/send.svg';  // Импортируем иконку send
import instaIcon from '../../assets/tailIcons/insta.svg';  // Импортируем иконку Instagram
import telegramIcon from '../../assets/tailIcons/teleg.svg';  // Импортируем иконку Telegram
import logo from '../../assets/tailIcons/logo.svg'; // Импортируем логотип (например, если он у вас есть)

const TailBook = () => {
  return (
    <div className={s.tailBook}>
      <div className={s.logoContainer}>
          <img src={logo} alt="Logo" className={s.logo} />
        </div>
      <div className={s.socialIcons}>
        <a href="https://tailbook.me/" target="_blank" rel="noopener noreferrer">
          <img src={sendIcon} alt="Share" />
        </a>
        <a href="https://www.instagram.com/tailbook.me/" target="_blank" rel="noopener noreferrer">
          <img src={instaIcon} alt="Instagram" />
        </a>
        <a href="https://t.me/tailbookme" target="_blank" rel="noopener noreferrer">
          <img src={telegramIcon} alt="Telegram" />
        </a>
      </div>
    </div>
    
  );
}

export default TailBook;
