const API_BASE_URL = "http://localhost:5000/api";

export const propertyAPI = {
  // Créer un bien immobilier
  createEstate: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/property`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création du bien immobilier");
    }

    return await response.json();
  },

  // Obtenir tous les biens
  getAllProperties: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/property?${query}`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des biens");
    }

    return await response.json();
  },

  // Revalider une image
  // revalidateImage: async (propertyId, imageIndex) => {
  //   const response = await fetch(
  //     `${API_BASE_URL}/property/${propertyId}/images/${imageIndex}/revalidate`,
  //     {
  //       method: "POST",
  //     }
  //   );

  //   if (!response.ok) {
  //     throw new Error("Erreur lors de la revalidation de l'image");
  //   }

  //   return await response.json();
  // },
};

export default estateAPI;
