import LineHeader from "../../../components/lineHeader/LineHeader";
import CustomInput from '../../../components/customInput/CustomInput';
import s from "./l_vetVerificationPage.module.css";
import FileUploader from "../../../components/fileUploader/FileUploader";
import CustomButton from "../../../components/customButton/CustomButton";
import CustomCheckbox from "../../../components/customCheckbox/CustomCheckbox";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const L_vetVerificationPage = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch 
  } = useForm({
    mode: "onChange",  // Включаем валидацию при изменении
  });

  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(true);
  const [isCancelButtonDisabled, setIsCancelButtonDisabled] = useState(false); // Изменено на false
  
  // Следим за всеми полями формы через watch
  const watchedName = watch('name');
  const watchedEmail = watch('email');
  const watchedTelegram = watch('telegram');
  const watchedSpecialization = watch('specialization');
  const watchedPetArt = watch('petArt');

  // Обработчик изменения текста
  const handleChange = (e) => setText(e.target.value);

  // Обработчик загрузки файлов
  const onUpload = (uploadedFiles) => {
    setFiles(uploadedFiles);
  };

  // Обработчик изменений чекбокса
  const handleUserRoleChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  // Следим за изменением всех полей и состояния для активации кнопок
  useEffect(() => {
    // Проверяем, что все обязательные поля формы заполнены и валидны
    const isFormValid = 
      watchedName?.length > 1 && 
      watchedEmail?.length > 0 && 
      watchedTelegram?.length > 1 && 
      watchedSpecialization?.length > 1 && 
      watchedPetArt?.length > 1 &&
      files.length > 0 &&  // Проверяем наличие загруженных файлов
      isCheckboxChecked;   // Чекбокс должен быть отмечен

    setIsCreateButtonDisabled(!isFormValid);
    setIsCancelButtonDisabled(isFormValid); // Блокируем кнопку "Отмена", если форма заполнена
  }, [watchedName, watchedEmail, watchedTelegram, watchedSpecialization, watchedPetArt, files, isCheckboxChecked]);

  // Обработчик отправки формы
  const onSubmit = (data) => {
    if (!isCheckboxChecked) {
      alert("Необходимо подтвердить достоверность сведений");
      return;
    }
    // Логика отправки данных на сервер или дальнейшей обработки
    console.log("Form submitted:", { ...data, text, files });
  };

  return (
    <div className={s.l_vetVerificationPage}>
      <h2>Верификация</h2>
      <LineHeader showMiddleLine={false} />

      <h5>
        Похоже, что Вы еще не авторизованы
        <br />
        в сервисе в качестве специалиста :(
      </h5>
      
      <p className={s.l_vetVerificationPage_pGreen}>
        Пожалуйста, укажите дополнительные данные,
        <br />
        для авторизации Вас в качестве специалиста
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Имя и Фамилия */}
        <label style={{ alignSelf: "start" }}>
          Имя и Фамилия полностью <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("name", {
            required: "Имя и Фамилия обязательно",
            minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          color={'var(--color-text-dark)'}
          placeholder="Имя и Фамилия"
          borderColor="var(--color-input-bg-grey)"
          width={335}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        {/* Документы */}
        <label style={{ alignSelf: "start" }}>
          Пожалуйста, добавьте документы,
          <br />
          подтверждающие Вашу квалификацию <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <FileUploader maxFiles={6} boxSize={50} borderRadius={5} onUpload={onUpload} />

        {/* Дополнительная информация */}
        <label style={{ alignSelf: "start" }}>
          Также Вы можете указать дополнительную информацию
        </label>
        <textarea
          value={text}
          onChange={handleChange}
          rows={8}
          cols={50}
          placeholder="Введите текст"
        />

        {/* Email */}
        <label style={{ alignSelf: "start" }}>
          Email <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("email", {
            required: "Email обязательно",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Введите корректный Email"
            }
          })}
          color={'var(--color-text-dark)'}
          placeholder="Email"
          borderColor="var(--color-input-bg-grey)"
          width={335}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        {/* Telegram */}
        <label style={{ alignSelf: "start" }}>
          Telegram <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("telegram", {
            required: "Telegram обязательно",
            minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          color={'var(--color-text-dark)'}
          placeholder="@"
          borderColor="var(--color-input-bg-grey)"
          width={335}
        />
        {errors.telegram && <p style={{ color: "red" }}>{errors.telegram.message}</p>}

        {/* Специализация */}
        <label style={{ alignSelf: "start" }}>
          Укажите Вашу специализацию <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("specialization", {
            required: "Специализация обязательно",
            minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          color={'var(--color-text-dark)'}
          placeholder="ветеринарный врач / кинолог / зоопсихолог  / ..."
          borderColor="var(--color-input-bg-grey)"
          width={335}
        />
        {errors.specialization && <p style={{ color: "red" }}>{errors.specialization.message}</p>}

        {/* Вид животных */}
        <label style={{ alignSelf: "start" }}>
          Укажите животных (кошки, собаки и т.д.),
          <br />
          на помощи которым Вы специализируетесь <span style={{ color: "#2A9D8F" }}>*</span>
        </label>
        <CustomInput
          {...register("petArt", {
            required: "Вид животного обязательно",
            minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          color={'var(--color-text-dark)'}
          placeholder="Например: кошки, собаки"
          borderColor="var(--color-input-bg-grey)"
          width={335}
        />
        {errors.petArt && <p style={{ color: "red" }}>{errors.petArt.message}</p>}

        {/* Чекбокс */}
        <span className={s.checkboxBox}>
          <CustomCheckbox
            {...register("confirmation")}
            name="confirmation"
            onChange={handleUserRoleChange}
            checked={isCheckboxChecked}
          />{" "}
          <span>Достоверность представленных сведений подтверждаю</span>
        </span>

        {/* Кнопки */}
        <div className={s.btnBox}>
          <CustomButton 
            link="/main" 
            customStyle={{ whiteSpace: 'nowrap' }} 
            padding={'16px 54px'} 
            text="Отмена" 
            disabled={isCancelButtonDisabled} // Активируем кнопку "Отмена", если форма заполнена
          />
          <CustomButton 
            type="submit" 
            disabled={isCreateButtonDisabled} 
            customStyle={{ whiteSpace: 'nowrap' }} 
            padding={'16px 42.5px'} 
            text="Отправить" 
          />
        </div>
      </form>
    </div>
  );
};

export default L_vetVerificationPage;
