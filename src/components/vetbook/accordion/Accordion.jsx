import React, { useState } from 'react';
import CustomInput from '../../customInput/CustomInput';
import FileUploader from '../../fileUploader/FileUploader'; // Импорт FileUploader
import s from './Accordion.module.css';
import icon from '../../../assets/Arrow_vet.svg'; 

const AccordionSection = ({ title, isOpen, onClick, inputs, inputValues, onInputChange }) => {
    return (
      <div
        className={`${s.accordionSection} ${
          isOpen ? s.accordionSectionOpen : s.accordionSectionClosed
        }`}
      >
        <h3 className={s.accordionTitle} onClick={onClick}>
        {title}
          <img src={icon} alt="Icon" className={s.icon} /> 
        </h3>
  
        {isOpen && (
          <div className={s.accordionContent}>
            {inputs.map((inputData, index) => (
              <div key={index}>
                <label>{inputData.label}</label>
                <CustomInput
                  placeholder={inputData.placeholder}
                  backgroundColor="rgba(42, 157, 143, 0.09)"
                  border="1px solid var(--color-main)"
                  borderRadius="12px"
                  padding="10px"
                  color="var(--color-main)"
                  fontStyle="italic"
                  value={inputValues[index]} // Устанавливаем значение инпута
                  onChange={(e) => onInputChange(index, e.target.value)} // Обработка изменения
                  required={inputData.label.includes('*')} // Добавляем required для полей со звездочкой
                />
              </div>
            ))}

            {/* Добавляем лейбл "Файлы" и компонент FileUploader с шириной 141px в секции "Клинический осмотр" */}
            {title === 'Клинический осмотр' && (
             <>
             <label>Файлы</label>
             <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
               <FileUploader
                 maxFiles={3}
                 boxSize={50}
                 borderRadius="12px"
                 onUpload={(files) => console.log(files)}
               />
             </div>
           </>
            )}
          </div>
        )}
      </div>
    );
};

const Accordion = () => {
    const [openSections, setOpenSections] = useState(Array(8).fill(false)); // Массив для хранения открытых секций
  
    // Состояние для хранения значений инпутов
    const [inputValues, setInputValues] = useState(Array(8).fill([]).map(() => Array(4).fill('')));
  
    const sections = [
      {
        title: 'Дополнительное описание ',
        inputs: [
          { label: 'Порода', placeholder: 'Беспородный длинношерстный' },
          { label: 'Окрас', placeholder: 'Рыжий' },
          { label: 'Дата рождения', placeholder: '01.10.2023' },
          { label: 'Особые приметы', placeholder: 'Полидактилия' }
        ]
      },
      {
        title: 'Идентификация',
        inputs: [
          { label: 'Чип Номер', placeholder: '11110120202010210202330340435040540' },
          { label: 'Клиника, в которой установлен чип', placeholder: 'MontVet Podgorica' },
          { label: 'Место установки чипа', placeholder: 'Холка' }
        ]
      },
      {
        title: 'Вакцинация против бешенства',
        inputs: [
          { label: 'Вакцина*', placeholder: 'Nobivac' },
          { label: 'Серия*', placeholder: '0989' },
          { label: 'Срок годности*', placeholder: '01.01.2025' },
          { label: 'Клиника, в которой поставлена вакцина*', placeholder: 'MontVet Podgorica' },
          { label: 'Дата вакцинации*', placeholder: '10.01.2024' },
          { label: 'Срок окончания действия*', placeholder: '10.01.2025' }
        ]
      },
      {
        title: 'Другие вакцинации',
        inputs: [
          { label: 'Вакцина*', placeholder: 'Nobivac' },
          { label: 'Серия*', placeholder: '0989' },
          { label: 'Срок годности*', placeholder: '01.01.2025' },
          { label: 'Клиника, в которой поставлена вакцина*', placeholder: 'MontVet Podgorica' },
          { label: 'Дата вакцинации*', placeholder: '10.01.2024' },
          { label: 'Срок окончания действия*', placeholder: '10.01.2025' }
        ]
      },
      {
        title: 'Дегельминтизация',
        inputs: [
          { label: 'Перпарат*', placeholder: 'Nobivac' },
          { label: 'Дата обработки*', placeholder: '10.01.2024' },
          { label: 'Клиника, в которой проведена обработка (либо самостоятельно)', placeholder: 'MontVet Podgorica' },
        ]
      },
      {
        title: 'Обработка от эктопаразитов',
        inputs: [
          { label: 'Перпарат*', placeholder: 'Nobivac' },
          { label: 'Дата обработки*', placeholder: '10.01.2024' },
          { label: 'Клиника, в которой проведена обработка (либо самостоятельно)', placeholder: 'MontVet Podgorica' }
        ]
      },
      {
        title: 'Клинический осмотр',
        inputs: [
          { label: 'Дата*', placeholder: '10.01.2024' },
          { label: 'Результат', placeholder: 'Здоров, выдана справка' }
        ]
      },
      {
        title: 'Регистрация',
        inputs: [
          { label: 'Клиника', placeholder: 'MontVet Podgorica' },
          { label: 'Регистрационный номер', placeholder: '1212039483984837583' }
        ]
      }
    ];
  
    // Обновление состояния для открытия/закрытия секции
    const toggleSection = (index) => {
      const updatedSections = [...openSections];
      updatedSections[index] = !updatedSections[index]; // Переключаем состояние только для выбранной секции
      setOpenSections(updatedSections);
    };
  
    // Обновление значений инпутов
    const handleInputChange = (sectionIndex, inputIndex, value) => {
      const updatedValues = [...inputValues];
      updatedValues[sectionIndex][inputIndex] = value; // Сохраняем значение в соответствующем инпуте
      setInputValues(updatedValues);
    };
  
    return (
      <div>
        {sections.map((section, index) => (
          <AccordionSection
            key={index}
            title={section.title}
            isOpen={openSections[index]}
            onClick={() => toggleSection(index)}
            inputs={section.inputs}
            inputValues={inputValues[index]} // Передаем значения инпутов для текущей секции
            onInputChange={(inputIndex, value) => handleInputChange(index, inputIndex, value)} // Передаем функцию для обновления значений
          />
        ))}
      </div>
    );
};

export default Accordion;
