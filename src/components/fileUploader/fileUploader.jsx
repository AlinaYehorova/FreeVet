import React, { useState } from 'react';
import s from './fileUploader.module.css';
import close from '../../assets/close.svg';
import plus from '../../assets/plus.svg';

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (files.length + selectedFiles.length > 3) {
      alert('You can upload up to 3 files.');
      return;
    }
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className={s.uploaderContainer}>
      <p style={{ alignSelf: 'start', marginBottom: '8px' }}>Добавьте фото и (или) видео</p>
      <div className={s.previewContainer}>
        {files.map((file, index) => (
          <div key={index} className={s.previewBox}>
            {file.type.startsWith('image') ? (
              <img src={URL.createObjectURL(file)} alt={`preview-${index}`} className={s.previewImage} />
            ) : (
              <video controls autoPlay className={s.previewImage}>
                <source src={URL.createObjectURL(file)} />
              </video>
            )}
            <button className={s.removeButton} onClick={() => removeFile(index)}>
              <img style={{ width: '5px', height: '5px', alignSelf: 'center' }} src={close} alt="close" />
            </button>
          </div>
        ))}

        {/* Отображаем кнопку загрузки, если файлов меньше 3 */}
        {files.length < 3 && (
          <label className={s.uploadBox}>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <div className={s.addBox}>
              <img src={plus} alt="plus" />
            </div>
          </label>
        )}

        {/* Отображаем пустые места, если файлов меньше 3 */}
        {Array.from({ length: Math.max(0, 3 - files.length - 1) }).map((_, idx) => (
          <div key={idx} className={s.emptyBox}></div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
