var express = require('express'); // Import Express
var router = express.Router(); // Create a Router
var Article = require('../models/article');

router.get('/', async (req, res) => {
  const articles = await Article.find();

  // res.json(articles); // Responds back with our Articles in JSON format
  res.render('articles/list', { articles });
});

// Render Article Creation Form View
router.get('/create', (req, res) => res.render('articles/create'));

router.get('/:id/delete', async (req, res) => {
  const id = req.params.id;
  await Article.findByIdAndDelete(id);
  res.redirect('/articles');
});

// Handle creation of article through POST
router.post('/create', async (req, res) => {
  // Grab submission from form
  const body = req.body;

  // Create a new Article based on submission
  const newArticle = new Article(body);

  // Save the new article
  const article = await newArticle.save();

  // Redirect to the newly created Article
  res.redirect(`/articles/${article._id}`);
});

router.get('/:id/update', async (req, res) => {
  const id = req.params.id;

  const article = await Article.findById(id);

  // res.json(article);
  res.render('articles/update', { article });
});

router.post('/:id/update', async (req, res) => {
  // Grab submission from form
  const id = req.params.id;
  const body = req.body;

  // Create a new Article based on submission
  const article = await Article.findByIdAndUpdate(id, body);

  // Redirect to the newly created Article
  res.redirect(`/articles/${article._id}`);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  const article = await Article.findById(id);

  // res.json(article);
  res.render('articles/details', { article });
});

module.exports = router; // Export that Router