// import './helpers/jasmineHelper.js';
// import db from '../src/config/dbConfig.js';
// import {
//   getAllCategories,
//   getCategorieById,
//   createCategorie,
//   updateCategorie,
//   deleteCategorie,
// } from '../src/models/CategorieModel.js';

// describe('Categorie Model', () => {
//   // Avant de commencer les tests, on vide la table des catégories
//   beforeAll(async () => {
//     await db.query('DELETE FROM categories');
//   });

//   // Après tous les tests, on vide à nouveau la table et on ferme la connexion à la DB
//   afterAll(async () => {
//     await db.query('DELETE FROM categories');
//     await db.end();
//   });

//   // Test de création d'une nouvelle catégorie
//   it('should create a categorie', async () => {
//     const categorie = await createCategorie('Catégorie de Test');
//     expect(categorie.affectedRows).toBe(1);
//   });

//   // Test de récupération de toutes les catégories
//   it('should get all categories', async () => {
//     await createCategorie('Catégorie de Test');
//     const categories = await getAllCategories();
//     expect(categories.length).toBeGreaterThan(0);
//   });

//   // Test de récupération d'une catégorie par ID
//   it('should get a categorie by ID', async () => {
//     const createdCategorie = await createCategorie('Catégorie de Test');
//     const categorie = await getCategorieById(createdCategorie.insertId);
//     expect(categorie).not.toBeNull();
//     expect(categorie).toEqual({
//       id: createdCategorie.insertId,
//       nom: 'Catégorie de Test',
//     });
//   });

//   // Test de mise à jour d'une catégorie
//   it('should update a categorie', async () => {
//     const createdCategorie = await createCategorie('Catégorie de Test');
//     const updatedCategorie = await updateCategorie(
//       createdCategorie.insertId,
//       'Catégorie Mis à Jour'
//     );
//     expect(updatedCategorie.affectedRows).toBe(1);
//   });

//   // Test de suppression d'une catégorie
//   it('should delete a categorie', async () => {
//     const createdCategorie = await createCategorie('Catégorie de Test');
//     const result = await deleteCategorie(createdCategorie.insertId);
//     expect(result.affectedRows).toBe(1);
//   });
// });

import './helpers/jasmineHelper.js';
import db from '../src/config/dbConfig.js';
import {
  getAllCategories,
  getCategorieById,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} from '../src/models/CategorieModel.js';

describe('CategorieModel', () => {
  // Nettoyage avant chaque test pour éviter des conflits
  beforeEach(async () => {
    await db.query('DELETE FROM categories'); // Supprimer toutes les catégories pour un état propre
  });

  it('devrait récupérer toutes les catégories', async () => {
    // Insérer une catégorie pour le test
    await createCategorie('Entrée');

    const categories = await getAllCategories();
    expect(categories).toBeDefined();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBe(1);
    expect(categories[0].nom).toBe('Entrée');
  });

  it('devrait récupérer une catégorie par ID', async () => {
    const nouvelleCategorie = await createCategorie('Plat principal');

    const categorie = await getCategorieById(nouvelleCategorie.insertId);
    expect(categorie).toBeDefined();
    expect(categorie.id).toBe(nouvelleCategorie.insertId);
    expect(categorie.nom).toBe('Plat principal');
  });

  it('devrait créer une nouvelle catégorie', async () => {
    const result = await createCategorie('Dessert');
    expect(result).toBeDefined();
    expect(result.affectedRows).toBe(1);
  });

  it('devrait mettre à jour une catégorie existante', async () => {
    const nouvelleCategorie = await createCategorie('Boisson');

    const result = await updateCategorie(
      nouvelleCategorie.insertId,
      'Boisson froide'
    );
    expect(result.affectedRows).toBe(1);

    const updatedCategorie = await getCategorieById(nouvelleCategorie.insertId);
    expect(updatedCategorie.nom).toBe('Boisson froide');
  });

  it('devrait supprimer une catégorie par ID', async () => {
    const nouvelleCategorie = await createCategorie('Salade');

    const result = await deleteCategorie(nouvelleCategorie.insertId);
    expect(result.affectedRows).toBe(1);

    const categorieSupprimee = await getCategorieById(
      nouvelleCategorie.insertId
    );
    expect(categorieSupprimee).toBeNull(); // Vérifie que la catégorie n'existe plus
  });
});
