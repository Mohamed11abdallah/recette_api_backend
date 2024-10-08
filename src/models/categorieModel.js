// import db from '../config/dbConfig.js';

// // Récupérer toutes les catégories
// export const getAllCategories = async () => {
//   const [results] = await db.query('SELECT * FROM categories');
//   return results;
// };

// // Récupérer une catégorie par ID
// export const getCategorieById = async id => {
//   const [results] = await db.query('SELECT * FROM categories WHERE id = ?', [
//     id,
//   ]);
//   return results.length > 0 ? results[0] : null;
// };

// // Créer une nouvelle catégorie
// export const createCategorie = async nom => {
//   const [result] = await db.query('INSERT INTO categories (nom) VALUES (?)', [
//     nom,
//   ]);
//   return result;
// };

// // Mettre à jour une catégorie
// export const updateCategorie = async (id, nom) => {
//   const [result] = await db.query(
//     'UPDATE categories SET nom = ? WHERE id = ?',
//     [nom, id]
//   );
//   return result;
// };

// // Supprimer une catégorie
// export const deleteCategorie = async id => {
//   const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
//   return result;
// };

import db from '../config/dbConfig.js';

// Récupérer toutes les catégories
export const getAllCategories = async () => {
  try {
    const [results] = await db.query('SELECT * FROM categories');
    return results;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    throw error;
  }
};

// Récupérer une catégorie par ID
export const getCategorieById = async id => {
  try {
    const [results] = await db.query('SELECT * FROM categories WHERE id = ?', [
      id,
    ]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la catégorie avec l'ID ${id}:`,
      error
    );
    throw error;
  }
};

// Créer une nouvelle catégorie
export const createCategorie = async nom => {
  try {
    const [result] = await db.query('INSERT INTO categories (nom) VALUES (?)', [
      nom,
    ]);
    return result;
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    throw error;
  }
};

// Mettre à jour une catégorie
export const updateCategorie = async (id, nom) => {
  try {
    const [result] = await db.query(
      'UPDATE categories SET nom = ? WHERE id = ?',
      [nom, id]
    );
    return result;
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour de la catégorie avec l'ID ${id}:`,
      error
    );
    throw error;
  }
};

// Supprimer une catégorie
export const deleteCategorie = async id => {
  try {
    const [result] = await db.query('DELETE FROM categories WHERE id = ?', [
      id,
    ]);
    return result;
  } catch (error) {
    console.error(
      `Erreur lors de la suppression de la catégorie avec l'ID ${id}:`,
      error
    );
    throw error;
  }
};
