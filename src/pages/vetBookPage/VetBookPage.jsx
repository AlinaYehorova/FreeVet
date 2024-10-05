import s from './vetBookPage.module.css'
import CustomPetCard from '../../components/customPetCard/CustomPetCard'
import CustomStickTitle from '../../components/customStickTitle/CustomStickTitle'

const VetBookPage = () => {
  return (
    <div className={s.vetBookPage}>
    <CustomPetCard 
      name="Мой питомец"
  type="Кот"
  weight="500"
  gender="Мужской"
  imageUrl=""
  statusMessage="Доступен"
  link="/pet/1"
  imageWidth="150px"
  StatusComponent={CustomStickTitle}
  />
    </div>
  )
}

export default VetBookPage
