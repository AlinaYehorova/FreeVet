import s from './mainPage.module.css'
import MainHeader from '../../components/mainHeader/MainHeader';
import Opportunity from '../../components/opportunity/Opportunity.jsx';
import Statistics from '../../components/statistics/Statistics.jsx'; 
import TailBook from '../../components/tailBook/TailBook.jsx'; 
import Footer from '../../components/footer/Footer.jsx';





const MainPage = () => {
  return (
   
    <div className={s.mainPage}>
      <MainHeader />
      <Opportunity/>
      <Statistics />
      <TailBook /> 
      <Footer />

     </div>
   
  )
}

export default MainPage