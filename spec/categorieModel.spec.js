import './helpers/jasmineHelper.js';
import db from '../src/config/dbConfig.js';
import {
  getAllCategories,
  getCategorieById,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} from '../src/models/categorieModel.js';

describe('Categorie Model', () => {
  // Avant de commencer les tests, on vide la table des catégories
  beforeAll(async () => {
    await db.query('DELETE FROM categories');
  });

  // Après tous les tests, on vide à nouveau la table et on ferme la connexion à la DB
  afterAll(async () => {
    await db.query('DELETE FROM categories');
    await db.end();
  });

  // Test de création d'une nouvelle catégorie
  it('should create a categorie', async () => {
    const categorie = await createCategorie('Catégorie de Test');
    expect(categorie.affectedRows).toBe(1);
  });

  // Test de récupération de toutes les catégories
  it('should get all categories', async () => {
    await createCategorie('Catégorie de Test');
    const categories = await getAllCategories();
    expect(categories.length).toBeGreaterThan(0);
  });

  // Test de récupération d'une catégorie par ID
  it('should get a categorie by ID', async () => {
    const createdCategorie = await createCategorie('Catégorie de Test');
    const categorie = await getCategorieById(createdCategorie.insertId);
    expect(categorie).not.toBeNull();
    expect(categorie).toEqual({
      id: createdCategorie.insertId,
      nom: 'Catégorie de Test',
    });
  });

  // Test de mise à jour d'une catégorie
  it('should update a categorie', async () => {
    const createdCategorie = await createCategorie('Catégorie de Test');
    const updatedCategorie = await updateCategorie(
      createdCategorie.insertId,
      'Catégorie Mis à Jour'
    );
    expect(updatedCategorie.affectedRows).toBe(1);
  });

  // Test de suppression d'une catégorie
  it('should delete a categorie', async () => {
    const createdCategorie = await createCategorie('Catégorie de Test');
    const result = await deleteCategorie(createdCategorie.insertId);
    expect(result.affectedRows).toBe(1);
  });
});
