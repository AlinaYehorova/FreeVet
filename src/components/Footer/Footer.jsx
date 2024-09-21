import React from 'react';
import { Link } from 'react-router-dom';
import s from './Footer.module.css'; // Подключаем модульные стили

// Импортируем иконки
import PlusWhite from '../../assets/PlusWhite.png';
import Profile from '../../assets/Profile.png';
import Vectore from '../../assets/Vector.png';
import Paw from '../../assets/paw.png';

const Footer = () => {
  const links = [
    { icon: Paw, label: 'О сервисе', path: '/service' },
    { icon: PlusWhite, label: 'Главная', path: '/home' },
    { icon: Profile, label: 'Профиль', path: '/profile' },
    { icon: Vectore, label: 'Поддержать', path: '/donate' },
    
  ];

  return (
    <div className={s.footer}>
      {links.map((link, index) => (
        <Link key={index} to={link.path} className={s.footerItem}>
          <img src={link.icon} alt={link.label} className={s.footerIcon} />
          <span className={s.footer_links}>{link.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default Footer;
