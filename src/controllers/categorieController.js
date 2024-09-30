// src/controllers/categorieController.js
import {
  getAllCategories,
  getCategorieById,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} from '../models/CategorieModel.js';

export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des catégories.',
      error: error.message,
    });
  }
};

export const getCategorieByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await getCategorieById(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Catégorie non trouvée.' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération de la catégorie.',
      error: error.message,
    });
  }
};

export const createCategorieController = async (req, res) => {
  const { nom } = req.body;
  try {
    const result = await createCategorie(nom);
    res
      .status(201)
      .json({ message: 'Catégorie créée avec succès', categorie: result });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la création de la catégorie.',
      error: error.message,
    });
  }
};

export const updateCategorieController = async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  try {
    await updateCategorie(id, nom);
    res.status(200).json({ message: 'Catégorie mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de la catégorie.',
      error: error.message,
    });
  }
};

export const deleteCategorieController = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCategorie(id);
    res.status(200).json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la suppression de la catégorie.',
      error: error.message,
    });
  }
};
