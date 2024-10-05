import React, { useEffect, useState } from 'react';
import s from './Loader.module.css'; 
import pawImage from '../../assets/paw-loader.png'

const Loader = () => {
    const [activeCircle, setActiveCircle] = useState(0);
    const totalCircles = 12;
  
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveCircle((prevIndex) => (prevIndex + 1) % totalCircles);
      }, 200); // Меняем активный круг каждые 200 миллисекунд
      return () => clearInterval(interval);
    }, [totalCircles]);
  
    const getCircleColor = (index) => {
      const relativeIndex = (index - activeCircle + totalCircles) % totalCircles;
      if (relativeIndex === 0) return '#555555'; 
      if (relativeIndex === 1) return '#777777'; 
      if (relativeIndex === 2) return '#999999'; 
      return '#cccccc'; 
    };
  
    return (
      <div className={s.loader}>
        <img src={pawImage} alt="paw" className={s.paw} />
        {Array.from({ length: totalCircles }).map((_, i) => (
          <div
            key={i}
            className={s.loaderCircle}
            style={{
              backgroundColor: getCircleColor(i),
              transform: `rotate(${i * 30}deg) translate(40px)`
            }}
          ></div>
        ))}
      </div>
    );
  };
  
  export default Loader;