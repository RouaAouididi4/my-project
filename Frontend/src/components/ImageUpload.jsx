import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ onImagesChange, validationResults = [] }) => {
  const [previews, setPreviews] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newPreviews = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setPreviews((prev) => [...prev, ...newPreviews]);
      onImagesChange(acceptedFiles); // Envoie directement les fichiers à PostForSaleByOwnerListing
    },
    [onImagesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 10,
  });

  const removeImage = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onImagesChange(newPreviews.map((p) => p.file)); // Notifie le parent de la suppression
  };

  const getValidationStatus = (index) => {
    const result = validationResults[index];
    if (!result) return null;

    return (
      <div
        className={`validation-badge ${result.isValid ? "valid" : "invalid"}`}
      >
        {result.isValid ? "✓" : "✗"}
        {!result.isValid && (
          <span className="validation-message">{result.message}</span>
        )}
      </div>
    );
  };

  return (
    <div className="photo-upload-area">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        <p>Drag and drop photos here to upload</p>
        <label className="upload-button">Add New Photo</label>
      </div>

      <div className="photos-grid">
        {previews.map((item, index) => (
          <div key={index} className="photo-item" draggable>
            <img src={item.preview} alt={`Preview ${index}`} />
            {getValidationStatus(index)}
            <button
              className="delete-button"
              onClick={() => removeImage(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .photo-upload-area {
          margin: 20px 0;
          text-align: center;
        }

        .dropzone {
          border: 2px dashed #ddd;
          border-radius: 4px;
          padding: 20px;
          cursor: pointer;
          margin-bottom: 15px;
        }

        .dropzone.active {
          border-color: #947054;
          background-color: rgba(148, 112, 84, 0.1);
        }

        .upload-button {
          display: inline-block;
          background-color: #947054;
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        }

        .photos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }

        .photo-item {
          position: relative;
          border: 1px solid #ddd;
          border-radius: 4px;
          overflow: hidden;
          height: 150px;
        }

        .photo-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .delete-button {
          position: absolute;
          bottom: 5px;
          right: 5px;
          background: rgba(255, 0, 0, 0.7);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 2px 8px;
          cursor: pointer;
          font-size: 12px;
        }

        .validation-badge {
          position: absolute;
          top: 5px;
          right: 5px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
        }

        .validation-badge.valid {
          background-color: #4caf50;
        }

        .validation-badge.invalid {
          background-color: #f44336;
        }

        .validation-message {
          position: absolute;
          bottom: -25px;
          left: 0;
          background: #f44336;
          color: white;
          padding: 5px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default ImageUpload;
