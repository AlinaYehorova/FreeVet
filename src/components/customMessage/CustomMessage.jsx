/* eslint-disable react/prop-types */
import CustomStickTitle from '../customStickTitle/CustomStickTitle';
import s from './CustomMessage.module.css'

const CustomMessage = ({ questionNumber, images, animalInfo, message }) => {
    return (
        <div className={s.container}>
            
                <div className={s.questionBlock}>
                    <h2 className="text-xl font-semibold mb-4">Вопрос № {questionNumber}</h2>
                    <CustomStickTitle backgroundColor={'var(--color-orange)'} 
                    color={'white'} 
                    border={'none'}
                    text='Ожидает ответа'
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
                        <CustomStickTitle border={'0.5px solid var(--color-orange)'} color={'black'} text={'Бездомное животное'} style={{fontWeight: 300, fontStyle: 'italic'}} />
                    </div>
                    
                    <p>{message}</p>
                </div>
            
        </div>
    );
};

export default CustomMessage


//<CustomMessage questionNumber={55} images={['https://placehold.co/400', 'https://placehold.co/400', 'https://placehold.co/400', 'https://placehold.co/400']} animalInfo={'Кошка 1кг200г Самец'} message={'Уличный кот, за которым я присматриваю, начал кашлять несколько раз в день в последние три недели. Кашель сухой, без выделений. Он активный, аппетит нормальный, но меня беспокоит частота кашля. Корм не меняли. Также прикладываю видео, где видно и слышно, как кот кашляет.'}/>