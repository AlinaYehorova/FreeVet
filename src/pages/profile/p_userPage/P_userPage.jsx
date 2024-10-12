import React, { useEffect, useState } from 'react';
import s from './p_userPage.module.css'; 
import avatarPlaceholder from '../../../assets/avatarPlaceholder.svg';
import CustomMessage from '../../../components/customMessage/CustomMessage';
import QuestionPetList from '../../../components/questionPetList/QuestionPetList';
import BurgerMenu from '../../../components/burgerMenu/BurgerMenu';
import { Link } from 'react-router-dom';
import Footer from '../../../components/footer/Footer.jsx';
import texts from '../../../utils/ru_text';  // Импорт текстов

const P_userPage = () => {
  const [files, setFiles] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: texts.userPage.userName,  // Имя пользователя теперь берется из текстов
    role: '',
    photo: avatarPlaceholder
  });

  const fetchUserData = async () => {
    // Здесь должен быть запрос к API, чтобы получить данные пользователя
    const userData = {
      // Используем имя пользователя из текстов
      name: texts.userPage.userName, 
      role: 'volunteer', // Здесь можно установить роль пользователя
      photo: avatarPlaceholder // Здесь должно быть изображение пользователя
    };
    setUserInfo(userData);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className={s.p_userPage}>
      <BurgerMenu />
      <div className={s.name_Container}>
        <div className={s.avatarContainer}>
          <img 
            src={files.length > 0 ? URL.createObjectURL(files[0]) : userInfo.photo} 
            alt="Avatar" 
            className={s.avatar} 
          />
        </div>
        <div className={s.userInfo}>
          <div className={s.userName}>{userInfo.name}</div> {/* Имя пользователя */}
          <div className={s.userRole}>
            {userInfo.role === 'volunteer' ? texts.userPage.userRoleVolunteer : texts.userPage.userRolePetOwner}
          </div>
        </div>
      </div>
      <div className={s.question_box}>
        <h6>{texts.userPage.myQuestions}</h6>
        <Link to="/main/question/choice">
          <p>{texts.userPage.allQuestions}</p>
        </Link>
      </div>
      <CustomMessage 
        questionNumber={55} 
        images={[
          'https://placehold.co/400', 
          'https://placehold.co/400', 
          'https://placehold.co/400', 
          'https://placehold.co/400'
        ]} 
        animalInfo={texts.userPage.animalInfo} 
        message={texts.userPage.message}
      />
      <div className={s.question_box2}>
        <h6>{texts.userPage.vetBooks}</h6>
        <p>{texts.userPage.allVetBooks}</p>
      </div>
      <QuestionPetList
        categories={[
          {
            title: texts.userPage.myAnimalsTitle,
            images: [
              { src: "https://placehold.co/400", type: "digital" },
              { src: "https://placehold.co/400", type: "digital" },
              { src: "https://placehold.co/400", type: "digital" },
            ],
            svgcolor: "green",
          },
          {
            title: texts.userPage.strayAnimalsTitle,
            images: [
              { src: "https://placehold.co/400", type: "non-digital" },
              { src: "https://placehold.co/400", type: "non-digital" },
              { src: "https://placehold.co/400", type: "non-digital" },
            ],
            svgcolor: "orange",
          },
        ]}
      />
      <Footer />
    </div>
  );
};

export default P_userPage;
