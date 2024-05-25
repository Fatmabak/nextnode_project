const express = require('express');
const router = express.Router();
const Article = require("../models/article");
const Scategorie = require("../models/scategorie");

// Afficher la liste des articles par page avec filtre
router.get('/paginationFilter', async (req, res) => {
    const page = req.query.page || 1; // Page actuelle
    const limit = req.query.limit || 5; // Nombre d'articles par page
    const searchTerm = req.query.searchTerm || ""; // Terme recherché
    const offset = (page - 1) * limit;

    try {
        let query = {};

        // Si le terme de recherche est défini, ajouter un filtre pour la désignation
        if (searchTerm) {
            query.designation = { $regex: new RegExp(searchTerm, 'i') };
        }

        // Ajouter un filtre pour le prix
        query.prix = { $lte: 10000 }; // Prix maximum

        const articlesTot = await Article.find(query).countDocuments();
        const articles = await Article.find(query)
            .sort({ '_id': -1 })
            .skip(offset)
            .limit(limit);

        res.status(200).json({ articles, tot: articlesTot });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Afficher la liste des articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find({}, null, { sort: { '_id': -1 } }).populate("scategorieID").exec();
        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Afficher la liste des articles par page
router.get('/pagination', async (req, res) => {
    const page = req.query.page || 1; // Page actuelle
    const limit = req.query.limit || 5; // Nombre d'articles par page
    const offset = (page - 1) * limit;

    try {
        const articlesTot = await Article.countDocuments();
        const articles = await Article.find({}, null, { sort: { '_id': -1 } })
            .skip(offset)
            .limit(limit);

        res.status(200).json({ articles: articles, tot: articlesTot });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Créer un nouvel article
router.post('/', async (req, res) => {
    const nouvarticle = new Article(req.body);
    try {
        await nouvarticle.save();
        res.status(200).json(nouvarticle);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Chercher un article
router.get('/:articleId', async (req, res) => {
    try {
        const art = await Article.findById(req.params.articleId);
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Modifier un article
router.put('/:articleId', async (req, res) => {
    try {
        const art = await Article.findByIdAndUpdate(
            req.params.articleId,
            { $set: req.body },
            { new: true }
        );
        const articles = await Article.findById(art._id).populate("scategorieID").exec();
        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Supprimer un article
router.delete('/:articleId', async (req, res) => {
    const id = req.params.articleId;
    await Article.findByIdAndDelete(id);
    res.json({ message: "article deleted successfully." });
});

// Chercher un article par sous-catégorie
router.get('/scat/:scategorieID', async (req, res) => {
    try {
        const art = await Article.find({ scategorieID: req.params.scategorieID }).exec();
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Chercher un article par catégorie
router.get('/cat/:categorieID', async (req, res) => {
    try {
        // Recherche des sous-catégories correspondant à la catégorie donnée
        const sousCategories = await Scategorie.find({ categorieID: req.params.categorieID }).exec();
        // Initialiser un tableau pour stocker les identifiants des sous-catégories trouvées
        const sousCategorieIDs = sousCategories.map(scategorie => scategorie._id);
        // Recherche des articles correspondant aux sous-catégories trouvées
        const articles = await Article.find({ scategorieID: { $in: sousCategorieIDs } }).exec();
        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Modifier la quantité d'un article
router.put('/qty/:id', async (req, res) => {
    const qty = req.body.quantity;
    const articleId = req.params.id;
    const oldArticle = await Article.findById(articleId);

    try {
        const articleUpdated = await Article.findByIdAndUpdate(
            articleId,
            { qtestock: oldArticle.qtestock - qty },
            { new: true } // Retourne le document mis à jour
        );

        if (!articleUpdated) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(articleUpdated);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;
