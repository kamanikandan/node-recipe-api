const express = require("express");
const router = express.Router();
const Recipes = require("../model/recipes");

//Get All Recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipes.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Getting one Recipe
router.get("/:id", getRecipe, (req, res) => {
  res.json(res.recipe);
});
//Creating One Recipe
router.post("/", async (req, res) => {
  const recipe = new Recipes({
    name: req.body.name,
    imgUrl: req.body.imgUrl,
    ingredients: req.body.ingredients
  });
  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Update one Recipe
router.patch("/:id", getRecipe, async (req, res) => {
  if (req.body.name != null) {
    res.recipe.name = req.body.name;
  }
  if (req.body.imgUrl != null) {
    res.recipe.imgUrl = req.body.imgUrl;
  }
  if (req.body.ingredients != null) {
    res.recipe.ingredients = req.body.ingredients;
  }
  try {
    let updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Delete One Recipe
router.delete("/:id", getRecipe, async (req, res) => {
  try {
    await res.recipe.remove();
    res.json({ message: "Deleted a recipe!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipes.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: "Can't find the recipe!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.recipe = recipe;
  next();
}

module.exports = router;
