import s from './Opportunity.module.css';
import OppAdd from '../../assets/opportunityImg/oppAdd.svg';
import OppVetBook from '../../assets/opportunityImg/oppVetBook.svg';
import OppNavKl from '../../assets/opportunityImg/oppNavKl.svg';
import OppNavApt from '../../assets/opportunityImg/oppNavApt.svg';
import Online from '../../assets/opportunityImg/online.svg';
import More from '../../assets/opportunityImg/more.svg';
import { Link } from 'react-router-dom';




const Opportunity = () => {
  return (
    <section className={s.opportunity}>
      <h2>Возможности</h2>
      <div className={s.featureCards}>
        <div className={s.cat}>
          <Link to="/main/question/choice">
          <img src={OppAdd} alt="Картинка с котиком" className={s.cardImage} />
          <h4>Задать вопрос</h4>
          </Link>
        </div>
        <div className={s.card}>
          <img src={OppNavKl} alt="кот в клинике" className={s.cardImage} />
          <h3>Навигатор ветклиник</h3>
          <p>в разработке</p>
        </div>
        <div className={s.card}>
          <img src={OppNavApt} alt="котик в аптеке" className={s.cardImage} />
          <h3>Навигатор ветаптек</h3>
          <p>в разработке</p>
        </div>
        </div>
        <div className={s.boxcard}>
        <div className={s.toocard}>
        <Link to="/verification/role/user/create-vetbook">
          <img src={OppVetBook} alt="Картинка с собакой" className={s.cardImage} />
          <h3>Ветеринарные книжки</h3>
          </Link>
        </div>
        <div className={s.toocard}>
          <img src={Online} alt="Онлайн котик" className={s.cardImage} />
          <h3>Онлайн-прием</h3>
          <p>в разработке</p>
        </div>
        <div className={s.toocard}>
          <img src={More} alt="картинка с котом" className={s.cardImage} />
          <h3>И многое другое</h3>
          <p>в разработке</p>
          </div>
      </div>
    </section>
  
  );
}

export default Opportunity;