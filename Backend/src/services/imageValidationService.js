// const tf = require("@tensorflow/tfjs-node");
const axios = require("axios");
// const sharp = require("sharp");
const fs = require("fs").promises;

class ImageValidationService {
  constructor() {
    this.model = null;
    this.useExternalAPI = false;
    this.realEstateCategories = [
      "house",
      "building",
      "room",
      "kitchen",
      "bathroom",
      "bedroom",
      "living room",
      "office",
      "apartment",
      "villa",
      "garden",
      "balcony",
      "terrace",
      "garage",
    ];
  }

  // Initialiser le modèle (MobileNet pré-entraîné)
  async initializeModel() {
    try {
      this.model = await tf.loadGraphModel(
        "https://tfhub.dev/google/imagenet/mobilenet_v3_small_100_224/classification/5/default/1",
        { fromTFHub: true }
      );
      console.log("✅ Modèle IA chargé avec succès");
    } catch (error) {
      console.error("❌ Erreur lors du chargement du modèle:", error);
      this.useExternalAPI = true;
    }
  }

  // Prétraitement de l'image
  async preprocessImage(imagePath) {
    try {
      const imageBuffer = await sharp(imagePath)
        .resize(224, 224)
        .removeAlpha()
        .toBuffer();

      const tensor = tf.node
        .decodeImage(imageBuffer, 3)
        .expandDims(0)
        .div(255.0);

      return tensor;
    } catch (error) {
      throw new Error(`Erreur preprocessing: ${error.message}`);
    }
  }

  // Validation avec TensorFlow
  async validateWithTensorFlow(imagePath) {
    try {
      const preprocessedImage = await this.preprocessImage(imagePath);
      const predictions = await this.model.predict(preprocessedImage).data();

      const topPredictions = this.getTopPredictions(predictions);
      const realEstateScore = this.calculateRealEstateScore(topPredictions);

      return {
        isValid: realEstateScore > 0.3,
        confidence: realEstateScore,
        categories: topPredictions
          .filter((p) =>
            this.realEstateCategories.some((cat) =>
              p.className.toLowerCase().includes(cat)
            )
          )
          .map((p) => p.className),
        allPredictions: topPredictions,
      };
    } catch (error) {
      throw new Error(`Erreur validation TensorFlow: ${error.message}`);
    }
  }

  // Validation avec API externe
  async validateWithExternalAPI(imagePath) {
    try {
      const imageBuffer = await fs.readFile(imagePath);
      const base64Image = imageBuffer.toString("base64");

      const response = await axios.post(
        "https://api.imagga.com/v2/tags",
        { image_base64: base64Image },
        {
          headers: {
            Authorization: `Basic ${Buffer.from("acc_7dc5cec63e88b96").toString("base64")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const tags = response.data.result.tags;
      const realEstateTags = tags.filter((tag) =>
        this.realEstateCategories.some((cat) =>
          tag.tag.en.toLowerCase().includes(cat)
        )
      );

      const confidence =
        realEstateTags.length > 0
          ? Math.max(...realEstateTags.map((tag) => tag.confidence)) / 100
          : 0;

      return {
        isValid: confidence > 0.3,
        confidence: confidence,
        categories: realEstateTags.map((tag) => tag.tag.en),
        allTags: tags.slice(0, 10),
      };
    } catch (error) {
      throw new Error(`Erreur API externe: ${error.message}`);
    }
  }

  // Méthode principale
  async validateImage(imagePath) {
    try {
      if (this.model && !this.useExternalAPI) {
        return await this.validateWithTensorFlow(imagePath);
      } else {
        return await this.validateWithExternalAPI(imagePath);
      }
    } catch (error) {
      console.error("❌ Erreur validation image:", error);
      return {
        isValid: false,
        confidence: 0,
        categories: [],
        error: error.message,
      };
    }
  }

  // Obtenir les prédictions principales
  getTopPredictions(predictions, topK = 10) {
    const predArray = Array.from(predictions);
    const topIndices = predArray
      .map((prob, index) => ({ prob, index }))
      .sort((a, b) => b.prob - a.prob)
      .slice(0, topK);

    return topIndices.map((item) => ({
      className: this.getImageNetClass(item.index),
      probability: item.prob,
    }));
  }

  // Calculer un score basé sur les catégories immobilières
  calculateRealEstateScore(predictions) {
    let score = 0;
    predictions.forEach((pred) => {
      if (
        this.realEstateCategories.some((cat) =>
          pred.className.toLowerCase().includes(cat)
        )
      ) {
        score += pred.probability;
      }
    });
    return Math.min(score, 1.0);
  }

  // Exemple de mapping simplifié de classes ImageNet
  getImageNetClass(index) {
    const classes = {
      0: "house",
      1: "building",
      2: "apartment",
      3: "kitchen",
      4: "bedroom",
      5: "bathroom",
      6: "garden",
      7: "garage",
      8: "living room",
      9: "office",
      // Ajouter d'autres classes si nécessaire
    };
    return classes[index] || `class_${index}`;
  }
}

module.exports = new ImageValidationService();
