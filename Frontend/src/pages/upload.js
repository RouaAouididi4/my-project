import React, { useState } from "react";

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const data = new FormData();

      uploadedFiles.forEach((file) => {
        data.append("photos", file);
      });

      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi !");
      }

      const result = await response.json();
      setSuccessMessage("✅ Fichiers enregistrés dans le dossier !");
      console.log("Envoi réussi !", result);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setSuccessMessage("❌ Échec de l'enregistrement !");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDeletePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleReorderPhotos = (startIndex, endIndex) => {
    const updatedPhotos = [...photos];
    const updatedFiles = [...uploadedFiles];
    const [movedPhoto] = updatedPhotos.splice(startIndex, 1);
    const [movedFile] = updatedFiles.splice(startIndex, 1);
    updatedPhotos.splice(endIndex, 0, movedPhoto);
    updatedFiles.splice(endIndex, 0, movedFile);
    setPhotos(updatedPhotos);
    setUploadedFiles(updatedFiles);
  };

  return (
    <div className="ta-page">
      <div className="photos-section">
        <h2>Photos</h2>
        <p>Drag and drop to reorder. Click on a photo to delete.</p>

        <div className="photo-upload-area">
          <p>Drag and drop photos here to upload</p>

          <label className="upload-button">
            Add New Photo
            <input type="file" multiple onChange={handlePhotoUpload} hidden />
          </label>
        </div>

        <div className="photos-grid">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="photo-item"
              draggable
              onDragStart={(e) => e.dataTransfer.setData("index", index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const startIndex = e.dataTransfer.getData("index");
                handleReorderPhotos(parseInt(startIndex), index);
              }}
            >
              <img src={photo} alt={`Photo ${index}`} />
              <button
                className="delete-button"
                onClick={() => handleDeletePhoto(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {successMessage && (
        <div style={{ color: "green", marginTop: "15px" }}>{successMessage}</div>
      )}

      <button
        type="submit"
        onClick={handleSubmit}
        className="post-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save Locally"}
      </button>
    </div>
  );
};

export default Upload;
