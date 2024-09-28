import CustomMessage from '../../../components/customMessage/CustomMessage'
import s from './l_vetVerificationPage.module.css'

const L_vetVerificationPage = () => {

  return(
    <div className={s.l_vetVerificationPage}>
      <CustomMessage questionNumber={55} images={['https://placehold.co/400', 'https://placehold.co/400', 'https://placehold.co/400', 'https://placehold.co/400']} animalInfo={'Кошка 1кг200г Самец'} message={'Уличный кот, за которым я присматриваю, начал кашлять несколько раз в день в последние три недели. Кашель сухой, без выделений. Он активный, аппетит нормальный, но меня беспокоит частота кашля. Корм не меняли. Также прикладываю видео, где видно и слышно, как кот кашляет.'}/>
    </div>
  )}

  export default L_vetVerificationPage