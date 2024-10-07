import React, { useEffect, useState } from 'react';
import s from './p_userPage.module.css'; 
import avatarPlaceholder from '../../../assets/avatarPlaceholder.svg';
import CustomMessage from '../../../components/customMessage/CustomMessage';
import QuestionPetList from '../../../components/questionPetList/QuestionPetList';
import BurgerMenu from '../../../components/burgerMenu/BurgerMenu';
import { Link } from 'react-router-dom';
import Footer from '../../../components/footer/Footer.jsx';

const P_userPage = () => {
  const [files, setFiles] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    role: '',
    photo: avatarPlaceholder
  });

  const fetchUserData = async () => {
    // Здесь должен быть запрос к API, чтобы получить данные пользователя
    const userData = {
      name: 'Андрей Еремин',
      role: 'volunteer',
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
           {userInfo.role === 'volunteer' ? 'Я - волонтер' : 'Волонтер'}
          
        </div>
        <div className={s.userRole}>
           {userInfo.role === 'Pets' ? 'Владелец питомца' : 'У меня есть домашнее животное'}
        </div> 
      </div>
      </div>
      <div className={s.question_box}>
      <h6>Мои вопросы</h6>
     <Link to="/main/question/choice">
      <p>все</p>
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
        animalInfo={'Кошка 1кг200г Самец'} 
        message={'Уличный кот, за которым я присматриваю, начал кашлять несколько раз в день в последние три недели. Кашель сухой, без выделений. Он активный, аппетит нормальный, но меня беспокоит частота кашля. Корм не меняли. Также прикладываю видео, где видно и слышно, как кот кашляет.'}
      />
        
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
      />
      <Footer />
    </div>
    
  );
};

export default P_userPage;
