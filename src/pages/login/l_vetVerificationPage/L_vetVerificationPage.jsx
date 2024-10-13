import LineHeader from "../../../components/lineHeader/LineHeader";
import CustomInput from '../../../components/customInput/CustomInput';
import s from "./l_vetVerificationPage.module.css";
import FileUploader from "../../../components/fileUploader/FileUploader";
import CustomButton from "../../../components/customButton/CustomButton";
import CustomCheckbox from "../../../components/customCheckbox/CustomCheckbox";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import CustomTextarea from '../../../components/customTextarea/CustomTextarea';
import texts from '../../../utils/ru_text';  // Импорт текстов

const L_vetVerificationPage = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch 
  } = useForm({
    mode: "onChange",
  });

  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(true);
  const [isCancelButtonDisabled, setIsCancelButtonDisabled] = useState(false);
  
  const watchedName = watch('name');
  const watchedEmail = watch('email');
  const watchedTelegram = watch('telegram');
  const watchedSpecialization = watch('specialization');
  const watchedPetArt = watch('petArt');

  const handleChange = (e) => setText(e.target.value);

  const onUpload = (uploadedFiles) => {
    setFiles(uploadedFiles);
  };

  const handleConfirmationChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  useEffect(() => {
    const isFormValid = 
      watchedName?.length > 1 && 
      watchedEmail?.length > 0 && 
      watchedTelegram?.length > 1 && 
      watchedSpecialization?.length > 1 && 
      watchedPetArt?.length > 1 &&
      files.length > 0 &&
      isCheckboxChecked;

    setIsCreateButtonDisabled(!isFormValid);
    setIsCancelButtonDisabled(isFormValid);
  }, [watchedName, watchedEmail, watchedTelegram, watchedSpecialization, watchedPetArt, files, isCheckboxChecked]);

  const onSubmit = (data) => {
    if (!isCheckboxChecked) {
      alert("Необходимо подтвердить достоверность сведений");
      return;
    }
    console.log("Form submitted:", { ...data, text, files });
  };

  return (
    <div className={s.l_vetVerificationPage}>
      <h2>{texts.vetVerificationPage.header}</h2>
      <LineHeader showMiddleLine={false} />

      <h5 dangerouslySetInnerHTML={{__html:texts.vetVerificationPage.notAuthorized}}/>
      
      <p className={s.l_vetVerificationPage_pGreen}
        dangerouslySetInnerHTML={{__html:texts.vetVerificationPage.additionalData}}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Имя и Фамилия */}
        <label style={{ alignSelf: "start" }}>
          {texts.vetVerificationPage.nameLabel}
        </label>
        <CustomInput
          {...register("name", {
            required: texts.vetVerificationPage.nameRequired,
            minLength: { value: 2, message: texts.vetVerificationPage.nameMinLength },
          })}
          color={'var(--color-text-dark)'}
          placeholder="Имя и Фамилия"
          borderColor="var(--color-input-bg-grey)"
          width={335}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        {/* Документы */}
        <label style={{ alignSelf: "start", lineHeight: 0.6 }}
          dangerouslySetInnerHTML={{__html:texts.vetVerificationPage.documentsLabel}}
        />
        <FileUploader maxFiles={6} boxSize={50} borderRadius={5} onUpload={onUpload} />

        {/* Дополнительная информация */}
        <label style={{ alignSelf: "start" }}>
          {texts.vetVerificationPage.additionalInfoLabel}
        </label>
        <CustomTextarea
          value={text}
          onChange={handleChange}
          rows={8}
          cols={50}
          placeholder="Введите текст"
          style={{borderColor: 'var(--color-input-bg-grey)', backgroundColor: 'var(--color-text-white)'}}
        />

        {/* Email */}
        <label style={{ alignSelf: "start" }}>
          {texts.vetVerificationPage.emailLabel}
        </label>
        <CustomInput
          {...register("email", {
            required: texts.vetVerificationPage.emailRequired,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: texts.vetVerificationPage.emailPattern
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
          {texts.vetVerificationPage.telegramLabel}
        </label>
        <CustomInput
          {...register("telegram", {
            required: texts.vetVerificationPage.telegramRequired,
            minLength: { value: 2, message: texts.vetVerificationPage.telegramMinLength },
          })}
          color={'var(--color-text-dark)'}
          placeholder="@"
          borderColor="var(--color-input-bg-grey)"
          width={335}
        />
        {errors.telegram && <p style={{ color: "red" }}>{errors.telegram.message}</p>}

        {/* Специализация */}
        <label style={{ alignSelf: "start" }}>
          {texts.vetVerificationPage.specializationLabel}
        </label>
        <CustomInput
          {...register("specialization", {
            required: texts.vetVerificationPage.specializationRequired,
            minLength: { value: 2, message: texts.vetVerificationPage.specializationMinLength },
          })}
          color={'var(--color-text-dark)'}
          placeholder="ветеринарный врач / кинолог / зоопсихолог  / ..."
          borderColor="var(--color-input-bg-grey)"
          width={335}
        />
        {errors.specialization && <p style={{ color: "red" }}>{errors.specialization.message}</p>}

        {/* Вид животных */}
        <label style={{ alignSelf: "start", lineHeight: 0.6 }}
          dangerouslySetInnerHTML={{__html:texts.vetVerificationPage.petArtLabel}}
        />
        <CustomInput
          {...register("petArt", {
            required: texts.vetVerificationPage.petArtRequired,
            minLength: { value: 2, message: texts.vetVerificationPage.petArtMinLength },
          })}
          color={'var(--color-text-dark)'}
          placeholder="Кошки, собаки и т.д."
          borderColor="var(--color-input-bg-grey)"
          width={335}
        />
        {errors.petArt && <p style={{ color: "red" }}>{errors.petArt.message}</p>}

        {/* Чекбокс */}
        <span className={s.checkboxBox}>
          <CustomCheckbox
            {...register("confirmation")}
            name="confirmation"
            checked={isCheckboxChecked}
          />
          <span>{texts.vetVerificationPage.dataReliability}</span>
        </span>
        
        {/* Кнопки */}
        <div className={s.buttonGroup}>
          <CustomButton disabled={isCancelButtonDisabled} text={texts.vetVerificationPage.cancelBtn} type="button" />
          <CustomButton disabled={isCreateButtonDisabled} text={texts.vetVerificationPage.submitBtn} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default L_vetVerificationPage;
