import s from "./q_choiceAnimalPage.module.css";
import FormHeader from "../../../components/formHeader/FormHeader";
import LineHeader from '../../../components/lineHeader/LineHeader'
import close from "../../../assets/close.svg";

const Q_choiceAnimalPage = () => {
  return (
    <div className={s.q_choiceAnimalPage}>
      <div className={s.q_choiceAnimalPage_header}>
        <FormHeader path="/main" fontSize={36}>
          Задать вопрос
        </FormHeader>
        <img className={s.closeBtn} src={close} alt="close" />
      </div>
      <LineHeader middle={'var(--color-line)'}/>
      <h5>Выберите животное,<br></br>по которому хотите задать вопрос</h5>
      <div className={s.q_choiceAnimalPage_newAnimal_box}>
        <h5>Животные<br></br>без цифровых ветеринарных книжек</h5>
      </div>
    </div>
  );
};

export default Q_choiceAnimalPage;
