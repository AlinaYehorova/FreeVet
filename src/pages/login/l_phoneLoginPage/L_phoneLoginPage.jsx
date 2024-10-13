import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import s from "./l_phoneLoginPage.module.css";
import { useForm } from "react-hook-form";
import CustomInput from "../../../components/customInput/CustomInput";
import CustomButton from "../../../components/customButton/CustomButton";
import FormHeader from "../../../components/formHeader/FormHeader";
import { loginUserPhone } from "../../../utils/api.js";
import texts from "../../../utils/ru_text";

const L_phoneLoginPage = () => {
  const navigate = useNavigate(); // Инициализируем useNavigate

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange", // Включаем валидацию в реальном времени
  });

  // Функция отправки формы
  const onSubmit = async (data) => {
    console.log("Отправка формы:", data); // Лог для дебага
    try {
      const formData = new FormData();
      formData.append("phone", data.phone);

      const response = await loginUserPhone(formData); // Ждем ответа от API
      console.log("Ответ от API:", response); // Лог ответа от API

      // Проверяем, что запрос был успешным (например, response.success может быть признаком успеха)
      if (response.success) {
        reset(); // Сбрасываем форму
        navigate("/verification"); // Перенаправляем на страницу верификации
      } else {
        console.error("Ошибка логина, неверные данные.");
      }
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    }
  };

  return (
    <form className={s.l_phoneLoginPage} onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <FormHeader 
          path="/" 
          titleKey={texts.phoneLoginPage.header} 
        />
        <p className={s.l_phoneLoginPage_subtitle} dangerouslySetInnerHTML={{ __html: texts.phoneLoginPage.subtitle }} />
        <label style={{ alignSelf: "start" }}>
          {texts.registrationPage.phoneLabel} <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("phone", {
            required: texts.registrationPage.phoneErrorRequired,
            pattern: {
              value: /^\+?[0-9]{10,}$/, // Простая проверка на номер телефона
              message: texts.registrationPage.phoneErrorPattern,
            },
          })}
          placeholder="+"
          width={335}
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}
        <p className={s.l_phoneLoginPage_lostAccess}>{texts.phoneLoginPage.lostAccess}</p>
        <p className={s.l_phoneLoginPage_accessRestoration}>{texts.phoneLoginPage.accessRestoration}</p>
      </div>

      <CustomButton
        type="submit"
        text={texts.registrationPage.submitButton}
        padding="16px 78px"
        disabled={!isValid} // Кнопка отключена, если форма не валидна
      />
    </form>
  );
};

export default L_phoneLoginPage;
