const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');

// Admin Layout
router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});

// Get Index Categories
router.get('/', (req, res)=>{
    Category.find({}).sort({date:'desc'}).then(categories=>{
        res.render('admin/categories/index', {categories:categories});
    });
});

// POST Create New Categorie
router.post('/create', (req, res)=>{
    const newCategory = Category({
        name: req.body.name
    });

    newCategory.save().then(savedCategory=>{
        req.flash('success_message', `Categorie ${savedCategory.name} Created Successfully`);
        res.redirect('/admin/categories');
    });
});

// Get Edit Categorie
router.get('/edit/:id', (req, res)=>{
    Category.findOne({_id: req.params.id}).then(category=>{
        res.render('admin/categories/edit', {category:category}); 
    });
});

// PUT Categorie
router.put('/edit/:id', (req, res)=>{
    Category.findOne({_id: req.params.id}).then(category=>{
        category.name = req.body.name;
        category.save().then(updatedCategory=>{
            req.flash('success_message', `Categorie ${updatedCategory.name} Updated Successfully`);
            res.redirect('/admin/categories');
        });
    });
});

// Delete Categorie
router.delete('/:id', (req, res)=>{
    Category.remove({_id: req.params.id}).then(result=>{
        req.flash('success_message', `Categorie Deleted Successfully`);
        res.redirect('/admin/categories');
    });
});

module.exports = router;