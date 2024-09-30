// import db from '../config/dbConfig.js';

// // Récupérer toutes les recettes
// export const getAllRecettes = async () => {
//   const [results] = await db.query('SELECT * FROM recettes');
//   return results;
// };

// // Récupérer une recette par ID
// export const getRecetteById = async id => {
//   const [results] = await db.query('SELECT * FROM recettes WHERE id = ?', [id]);
//   return results.length > 0 ? results[0] : null;
// };

// // Créer une nouvelle recette
// export const createRecette = async (titre, ingredients, type, categorie_id) => {
//   const [result] = await db.query(
//     'INSERT INTO recettes (titre, ingredients, type, categorie_id) VALUES (?, ?, ?, ?)',
//     [titre, ingredients, type, categorie_id]
//   );
//   return result;
// };

// // Mettre à jour une recette
// export const updateRecette = async (
//   id,
//   titre,
//   ingredients,
//   type,
//   categorie_id
// ) => {
//   const [result] = await db.query(
//     'UPDATE recettes SET titre = ?, ingredients = ?, type = ?, categorie_id = ? WHERE id = ?',
//     [titre, ingredients, type, categorie_id, id]
//   );
//   return result;
// };

// // Supprimer une recette
// export const deleteRecette = async id => {
//   const [result] = await db.query('DELETE FROM recettes WHERE id = ?', [id]);
//   return result;
// };

// // Rechercher des recettes par nom (nouvelle fonction)
// export const searchRecettesByName = async nom => {
//   const query = 'SELECT * FROM recettes WHERE titre LIKE ?';
//   const [results] = await db.query(query, [`%${nom}%`]);
//   return results;
// };

import db from '../config/dbConfig.js';

// Récupérer toutes les recettes
export const getAllRecettes = async () => {
  try {
    const [results] = await db.query('SELECT * FROM recettes');
    return results;
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes:', error);
    throw error;
  }
};

// Récupérer une recette par ID
export const getRecetteById = async id => {
  try {
    const [results] = await db.query('SELECT * FROM recettes WHERE id = ?', [
      id,
    ]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la recette avec l'ID ${id}:`,
      error
    );
    throw error;
  }
};

// Créer une nouvelle recette
export const createRecette = async (titre, ingredients, type, categorie_id) => {
  try {
    const [result] = await db.query(
      'INSERT INTO recettes (titre, ingredients, type, categorie_id) VALUES (?, ?, ?, ?)',
      [titre, ingredients, type, categorie_id]
    );
    return result;
  } catch (error) {
    console.error('Erreur lors de la création de la recette:', error);
    throw error;
  }
};

// Mettre à jour une recette
export const updateRecette = async (
  id,
  titre,
  ingredients,
  type,
  categorie_id
) => {
  try {
    const [result] = await db.query(
      'UPDATE recettes SET titre = ?, ingredients = ?, type = ?, categorie_id = ? WHERE id = ?',
      [titre, ingredients, type, categorie_id, id]
    );
    return result;
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour de la recette avec l'ID ${id}:`,
      error
    );
    throw error;
  }
};

// Supprimer une recette
export const deleteRecette = async id => {
  try {
    const [result] = await db.query('DELETE FROM recettes WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.error(
      `Erreur lors de la suppression de la recette avec l'ID ${id}:`,
      error
    );
    throw error;
  }
};

// Rechercher des recettes par nom (nouvelle fonction)
export const searchRecettesByName = async nom => {
  try {
    const query = 'SELECT * FROM recettes WHERE titre LIKE ?';
    const [results] = await db.query(query, [`%${nom}%`]);
    return results;
  } catch (error) {
    console.error(
      `Erreur lors de la recherche des recettes avec le nom "${nom}":`,
      error
    );
    throw error;
  }
};
