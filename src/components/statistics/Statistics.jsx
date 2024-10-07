import s from './statistics.module.css';

const Statistics = () => {
  return (
    <section className={s.statistics}>
      <h2>Статистика помощи</h2>
      <div className={s.stats}>
        <div className={s.statItem}>
          <span>203</span>
          <p>животным оказана помощь</p>
        </div>
        <div className={s.statItem}>
          <span>75</span>
          <p>животным помогли в этом месяце</p>
        </div>
        <div className={s.statItem}>
          <span>550</span>
          <p>евро пожертвовано на развитие проекта</p>
        </div>
      </div>
      <h3> Спасибо за Вашу поддержку!</h3>
    </section>
  );
}

export default Statistics;
