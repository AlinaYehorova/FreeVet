import s from './vetBookPage.module.css'
import CustomPetCard from '../../components/customPetCard/CustomPetCard'

const VetBookPage = () => {
  return (
    <div className={s.vetBookPage}>
    <CustomPetCard />
    </div>
  )
}

export default VetBookPage