import s from './statistics.module.css';
import texts from '../../utils/ru_text'; // Импортируйте файл с текстами

const Statistics = () => {
  return (
    <section className={s.statistics}>
      <h2>{texts.statistics.title}</h2>
      <div className={s.stats}>
        <div className={s.statItem}>
          <span>203</span>
          <p>{texts.statistics.helpedAnimals}</p>
        </div>
        <div className={s.statItem}>
          <span>75</span>
          <p>{texts.statistics.helpedThisMonth}</p>
        </div>
        <div className={s.statItem}>
          <span>550</span>
          <p>{texts.statistics.donatedAmount}</p>
        </div>
      </div>
      <h3>{texts.statistics.thankYou}</h3>
    </section>
  );
}

export default Statistics;
