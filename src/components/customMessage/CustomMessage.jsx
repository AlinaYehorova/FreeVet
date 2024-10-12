/* eslint-disable react/prop-types */
import CustomStickTitle from '../customStickTitle/CustomStickTitle';
import s from './customMessage.module.css';
import texts from '../../utils/ru_text'; // Импортируем файл с текстами

const CustomMessage = ({ questionNumber, images, animalInfo, message }) => {
    return (
        <div className={s.container}>
            <div className={s.questionBlock}>
                <h2 className="text-xl font-semibold mb-4">{texts.customMessage.questionTitle} {questionNumber}</h2> {/* Локализованный заголовок */}
                <CustomStickTitle 
                    backgroundColor={'var(--color-orange)'} 
                    color={'white'} 
                    border={'none'}
                    text={texts.customMessage.awaitingResponse} // Локализованный текст
                />
            </div>
                
            <div className={s.imageBlock}>
                {images.map((image, index) => (
                    <img 
                        key={index} 
                        src={image} 
                        alt={`Animal ${index + 1}`} 
                        style={{ maxWidth: '48%' }} 
                    />
                ))}
            </div>
            
            <div className={s.animalInfo}>
                <div className={s.animalTitle}>
                    <h3 className="text-lg font-medium mb-2">{animalInfo}</h3>
                    <CustomStickTitle 
                        border={'0.5px solid var(--color-orange)'} 
                        color={'black'} 
                        text={texts.customMessage.homelessAnimal} // Локализованный текст
                        style={{ fontWeight: 300, fontStyle: 'italic' }} 
                    />
                </div>
                    
                <p>{message}</p>
            </div>
        </div>
    );
};

export default CustomMessage;
