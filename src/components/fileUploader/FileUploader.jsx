import React, { useState } from 'react';
import s from './fileUploader.module.css';
import close from '../../assets/close.svg';
import plus from '../../assets/plus.svg';

const FileUploader = ({ maxFiles = 3, boxSize = 104, borderRadius }) => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (files.length + selectedFiles.length > maxFiles) {
      alert(`You can upload up to ${maxFiles} files.`);
      return;
    }
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className={s.uploaderContainer}>
      <div className={s.previewContainer}>
        {files.map((file, index) => (
          <div key={index} className={s.previewBox} style={{ width: boxSize, height: boxSize, borderRadius: borderRadius || '20px' }}>
            {file.type.startsWith('image') ? (
              <img src={URL.createObjectURL(file)} alt={`preview-${index}`} className={s.previewImage} style={{ width: boxSize, height: boxSize }} />
            ) : (
              <video controls autoPlay className={s.previewImage} style={{ width: boxSize, height: boxSize, borderRadius: borderRadius || '20px' }}>
                <source src={URL.createObjectURL(file)} />
              </video>
            )}
            <button className={s.removeButton} onClick={() => removeFile(index)}>
              <img style={{ width: '5px', height: '5px', alignSelf: 'center' }} src={close} alt="close" />
            </button>
          </div>
        ))}

        {/* Отображаем кнопку загрузки, если файлов меньше maxFiles */}
        {files.length < maxFiles && (
          <label className={s.uploadBox} style={{ width: boxSize, height: boxSize, borderRadius: borderRadius || '20px' }}>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <div className={s.addBox} style={{ fontSize: boxSize / 4 }}>
              <img src={plus} alt="plus" style={{ width: boxSize / 2.88, height: boxSize / 2.88 }} />
            </div>
          </label>
        )}

        {/* Отображаем пустые места, если файлов меньше maxFiles */}
        {Array.from({ length: Math.max(0, maxFiles - files.length - 1) }).map((_, idx) => (
          <div key={idx} className={s.emptyBox} style={{ width: boxSize, height: boxSize, borderRadius: borderRadius || '20px' }}></div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
