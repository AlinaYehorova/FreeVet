import s from './opportunity.module.css';
import OppAdd from '../../assets/opportunityImg/oppAdd.svg';
import OppVetBook from '../../assets/opportunityImg/oppVetBook.svg';
import OppNavKl from '../../assets/opportunityImg/oppNavKl.svg';
import OppNavApt from '../../assets/opportunityImg/oppNavApt.svg';
import Online from '../../assets/opportunityImg/online.svg';
import More from '../../assets/opportunityImg/more.svg';
import { Link } from 'react-router-dom';
import texts from '../../utils/ru_text'; // Импортируйте файл с текстами

const Opportunity = () => {
  return (
    <section className={s.opportunity}>
      <h2>{texts.opportunity.title}</h2>
      <div className={s.featureCards}>
        <div className={s.cat}>
          <Link to="/main/question/choice">
            <img src={OppAdd} alt="Картинка с котиком" className={s.cardImage} />
            <h4>{texts.opportunity.askQuestion}</h4>
          </Link>
        </div>
        <div className={s.card}>
          <img src={OppNavKl} alt="кот в клинике" className={s.cardImage} />
          <h3>{texts.opportunity.clinicNavigator}</h3>
          <p>{texts.opportunity.inDevelopment}</p>
        </div>
        <div className={s.card}>
          <img src={OppNavApt} alt="котик в аптеке" className={s.cardImage} />
          <h3>{texts.opportunity.pharmacyNavigator}</h3>
          <p>{texts.opportunity.inDevelopment}</p>
        </div>
      </div>
      <div className={s.boxcard}>
        <div className={s.toocard}>
          <Link to="/vetbook">
            <img src={OppVetBook} alt="Картинка с собакой" className={s.cardImage} />
            <h3>{texts.opportunity.veterinaryBooks}</h3>
          </Link>
        </div>
        <div className={s.toocard}>
          <img src={Online} alt="Онлайн котик" className={s.cardImage} />
          <h3>{texts.opportunity.onlineReception}</h3>
          <p>{texts.opportunity.inDevelopment}</p>
        </div>
        <div className={s.toocard}>
          <img src={More} alt="картинка с котом" className={s.cardImage} />
          <h3>{texts.opportunity.more}</h3>
          <p>{texts.opportunity.inDevelopment}</p>
        </div>
      </div>
    </section>
  );
};

export default Opportunity;
