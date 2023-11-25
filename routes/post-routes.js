const express = require('express');

const { getAllPosts, createPost, renderCreateForm, getSinglePost, deleteSinglePost } = require('../controllers/post-controller');

const router = express.Router();

router.get('/', getAllPosts);

router.post('/', createPost);

router.get('/create', renderCreateForm);

router.get('/:id', getSinglePost);

router.delete('/:id', deleteSinglePost);

module.exports = router;