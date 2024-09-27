import './helpers/jasmineHelper.js';
import db from '../src/config/dbConfig.js';
import {
  getAllRecettes,
  getRecetteById,
  createRecette,
  updateRecette,
  deleteRecette,
} from '../src/models/recetteModel.js';

describe('Recette Model', () => {
  beforeAll(async () => {
    await db.query('DELETE FROM recettes');
  });

  afterAll(async () => {
    await db.query('DELETE FROM recettes');
    await db.end();
  });

  it('should create a recette', async () => {
    const recette = await createRecette(
      'Titre de Test',
      'Ingrédients de Test',
      'plat'
    );
    expect(recette.affectedRows).toBe(1);
  });

  it('should get all recettes', async () => {
    await createRecette('Titre de Test', 'Ingrédients de Test', 'plat');
    const recettes = await getAllRecettes();
    expect(recettes.length).toBeGreaterThan(0);
  });

  it('should get a recette by ID', async () => {
    const createdRecette = await createRecette(
      'Titre de Test',
      'Ingrédients de Test',
      'plat'
    );
    const recette = await getRecetteById(createdRecette.insertId);
    expect(recette).not.toBeNull();
    expect(recette).toEqual({
      id: createdRecette.insertId,
      titre: 'Titre de Test',
      ingredient: 'Ingrédients de Test',
      type: 'plat',
    });
  });

  it('should update a recette', async () => {
    const createdRecette = await createRecette(
      'Titre de Test',
      'Ingrédients de Test',
      'plat'
    );
    const updatedRecette = await updateRecette(
      createdRecette.insertId,
      'Titre Mis à Jour',
      'Ingrédients Mis à Jour',
      'plat'
    );
    expect(updatedRecette.affectedRows).toBe(1);
  });

  it('should delete a recette', async () => {
    const createdRecette = await createRecette(
      'Titre de Test',
      'Ingrédients de Test',
      'plat'
    );
    const result = await deleteRecette(createdRecette.insertId);
    expect(result.affectedRows).toBe(1);
  });
});
