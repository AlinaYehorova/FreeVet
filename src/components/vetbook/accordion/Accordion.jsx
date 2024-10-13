import React, { useState } from 'react';
import CustomInput from '../../customInput/CustomInput';
import FileUploader from '../../fileUploader/FileUploader'; 
import s from './accordion.module.css';
import icon from '../../../assets/Arrow_vet.svg'; 
import texts from '../../../utils/ru_text';

const AccordionSection = ({ title, isOpen, onClick, inputs, inputValues, onInputChange }) => {
    return (
        <div className={`${s.accordionSection} ${isOpen ? s.accordionSectionOpen : s.accordionSectionClosed}`}>
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
                                value={inputValues[index]} 
                                onChange={(e) => onInputChange(index, e.target.value)} 
                                required={inputData.label.includes('*')} 
                            />
                        </div>
                    ))}

                    {/* Вставляем FileUploader для секции "Клинический осмотр" */}
                    {title === texts.accordion.clinicalExamination && (
                        <>
                            <label>{texts.accordion.files}</label>
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
    const [openSections, setOpenSections] = useState(Array(8).fill(false)); 
    const [inputValues, setInputValues] = useState(Array(8).fill([]).map(() => Array(4).fill('')));

    const sections = [
        {
            title: texts.accordion.title,
            inputs: [
                { label: texts.accordion.breedlabel, placeholder: texts.accordion.breedplaceholder },
                { label: texts.accordion.colorlabel, placeholder: texts.accordion.colorplaceholder },
                { label: texts.accordion.agelabel, placeholder: texts.accordion.ageplaceholder },
                { label: texts.accordion.features, placeholder: texts.accordion.featuresplaceholder }
            ]
        },
        {
            title: texts.accordion.identification,
            inputs: [
                { label: texts.accordion.chipNumberLabel, placeholder: texts.accordion.chipNumberPlaceholder },
                { label: texts.accordion.clinicLabel, placeholder: texts.accordion.clinicPlaceholder },
                { label: texts.accordion.chipLocationLabel, placeholder: texts.accordion.chipLocationPlaceholder },
                { label: texts.accordion.chipDateLabel, placeholder: texts.accordion.chipDatePlaceholder }
            ]
        },
        {
            title: texts.accordion.rabiesVaccination,
            inputs: [
                { label: texts.accordion.vaccineLabel, placeholder: texts.accordion.vaccinePlaceholder },
                { label: texts.accordion.seriesLabel, placeholder: texts.accordion.seriesPlaceholder },
                { label: texts.accordion.expiryDateLabel, placeholder: texts.accordion.expiryDatePlaceholder },
                { label: texts.accordion.clinicVaccineLabel, placeholder: texts.accordion.clinicVaccinePlaceholder },
                { label: texts.accordion.vaccineDateLabel, placeholder: texts.accordion.vaccineDatePlaceholder },
                { label: texts.accordion.validityEndDateLabel, placeholder: texts.accordion.validityEndDatePlaceholder }
            ]
        },
        {
            title: texts.accordion.otherVaccinations,
            inputs: [
                { label: texts.accordion.vaccineLabel, placeholder: texts.accordion.vaccinePlaceholder },
                { label: texts.accordion.seriesLabel, placeholder: texts.accordion.seriesPlaceholder },
                { label: texts.accordion.expiryDateLabel, placeholder: texts.accordion.expiryDatePlaceholder },
                { label: texts.accordion.clinicVaccineLabel, placeholder: texts.accordion.clinicVaccinePlaceholder },
                { label: texts.accordion.vaccineDateLabel, placeholder: texts.accordion.vaccineDatePlaceholder },
                { label: texts.accordion.validityEndDateLabel, placeholder: texts.accordion.validityEndDatePlaceholder }
            ]
        },
        {
            title: texts.accordion.deworming,
            inputs: [
                { label: texts.accordion.dewormingDrugLabel, placeholder: texts.accordion.dewormingDrugPlaceholder },
                { label: texts.accordion.dewormingDateLabel, placeholder: texts.accordion.dewormingDatePlaceholder },
                { label: texts.accordion.clinicDewormingLabel, placeholder: texts.accordion.clinicDewormingPlaceholder },
            ]
        },
        {
            title: texts.accordion.ectoparasiteTreatment,
            inputs: [
                { label: texts.accordion.dewormingDrugLabel, placeholder: texts.accordion.dewormingDrugPlaceholder },
                { label: texts.accordion.dewormingDateLabel, placeholder: texts.accordion.dewormingDatePlaceholder },
                { label: texts.accordion.clinicDewormingLabel, placeholder: texts.accordion.clinicDewormingPlaceholder },
            ]
        },
        {
            title: texts.accordion.clinicalExamination,
            inputs: [
                { label: texts.accordion.examinationDateLabel, placeholder: texts.accordion.examinationDatePlaceholder },
                { label: texts.accordion.resultLabel, placeholder: texts.accordion.resultPlaceholder },
            ]
        }, 
        {
            title: texts.accordion.registration,
            inputs: [
                { label: texts.accordion.registrationClinicLabel, placeholder: texts.accordion.registrationClinicPlaceholder },
                { label: texts.accordion.registrationNumberLabel, placeholder: texts.accordion.registrationNumberPlaceholder }
            ]
        }
    ];

    const toggleSection = (index) => {
        const updatedSections = [...openSections];
        updatedSections[index] = !updatedSections[index]; 
        setOpenSections(updatedSections);
    };

    const handleInputChange = (sectionIndex, inputIndex, value) => {
        const updatedValues = [...inputValues];
        updatedValues[sectionIndex][inputIndex] = value; 
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
                    inputValues={inputValues[index]} 
                    onInputChange={(inputIndex, value) => handleInputChange(index, inputIndex, value)} 
                />
            ))}
        </div>
    );
};

export default Accordion;