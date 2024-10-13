import React, { useState, useEffect, useRef } from 'react';
import s from './fileUploader.module.css';
import close from '../../assets/close.svg';
import plus from '../../assets/plus.svg';
import texts from '../../utils/ru_text'; // Импортируем текстовый файл

const FileUploader = ({ maxFiles = 3, boxSize = 104, borderRadius = '20px', onUpload = () => {} }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null); // создаем реф для input

  useEffect(() => {
    if (typeof onUpload === 'function') {
      onUpload(files);
    } else {
      console.error('onUpload is not a function');
    }
  }, [files, onUpload]);

  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (files.length + selectedFiles.length > maxFiles) {
      alert(texts.fileUploader.uploadLimitError.replace('{{maxFiles}}', maxFiles)); // Используем текст из файла
      return;
    }

    const validFiles = selectedFiles.filter(file => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        return true;
      }
      alert(texts.fileUploader.unsupportedFileType.replace('{{fileName}}', file.name)); // Используем текст из файла
      return false;
    });

    setFiles([...files, ...validFiles]);
  };

  const removeFile = (index) => {
    URL.revokeObjectURL(URL.createObjectURL(files[index]));
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // вручную вызываем клик на input
    }
  };

  return (
    <div className={s.uploaderContainer}>
      <div className={s.previewContainer}>
        {files.map((file, index) => (
          <div 
            key={index} 
            className={s.previewBox} 
            style={{ width: boxSize, height: boxSize, borderRadius: borderRadius }}
          >
            {file.type.startsWith('image/') ? (
              <img 
                src={URL.createObjectURL(file)} 
                alt={`preview-${index}`} 
                className={s.previewImage} 
                style={{ width: boxSize, height: boxSize, borderRadius: borderRadius }} // Применяем borderRadius к изображению
              />
            ) : (
              <video 
                controls 
                className={s.previewImage} 
                style={{ width: boxSize, height: boxSize, borderRadius: borderRadius }} // Применяем borderRadius к видео
              >
                <source src={URL.createObjectURL(file)} />
              </video>
            )}
            <button className={s.removeButton} onClick={() => removeFile(index)}>
              <img style={{ width: '5px', height: '5px', alignSelf: 'center' }} src={close} alt="close" />
            </button>
          </div>
        ))}

        {files.length < maxFiles && (
          <div 
            className={s.uploadBox} 
            style={{ width: boxSize, height: boxSize, borderRadius: borderRadius }} 
            onClick={handleBoxClick} // обработка клика на div
          >
            <input
              ref={fileInputRef} // связываем input с рефом
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              multiple
            />
            <div className={s.addBox} style={{ fontSize: boxSize / 4 }}>
              <img src={plus} alt="plus" style={{ width: boxSize / 2.88, height: boxSize / 2.88 }} />
            </div>
          </div>
        )}

        {Array.from({ length: Math.max(0, maxFiles - files.length - 1) }).map((_, idx) => (
          <div key={idx} className={s.emptyBox} style={{ width: boxSize, height: boxSize, borderRadius: borderRadius }}></div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
