   var express = require('express'); // Import Express
var router = express.Router(); // Create a Router
var Article = require('../models/article');

router.get('/', async (req, res) => {
  const articles = await Article.find();

  // res.json(articles); // Responds back with our Articles in JSON format
  res.render('articles/list', { articles });
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  const article = await Article.findById(id);

  // res.json(article);
  res.render('articles/details', { article });
});

module.exports = router; // Export that Router