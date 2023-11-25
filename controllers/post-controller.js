const Post = require('../models/post');

const getAllPosts = (req, res) => {
    Post.find().sort({ createdAt: -1 })
        .then(posts => {
            res.render('index', { title: 'Posts', posts });
        })
        .catch((err) => {
            console.log(err);
            res.render('error', { title: 'Something went wrong' })
        });
}

const createPost = (req, res) => {
    const post = new Post(req.body);
    post.save()
        .then(result => {
            res.redirect('/posts')
        })
        .catch((err) => {
            console.log(err);
            res.render('error', { title: 'Something went wrong' })
        });
}

const renderCreateForm = (req, res) => {
    res.render('create', { title: 'Create a new post' });
}

const getSinglePost = (req, res) => {
    const { id } = req.params;
    Post.findById(id).
        then(result => {
            res.render('single', { title: result.title, post: result })
        })
        .catch((err) => {
            console.log(err);
            res.render('error', { title: 'Something went wrong' })
        });
}

const deleteSinglePost = (req, res) => {
    const { id } = req.params;
    Post.findByIdAndDelete(id).
        then(result => {
            console.log(result);
            res.json({
                redirect: '/posts'
            })
        })
        .catch((err) => {
            console.log(err);
            res.render('error', { title: 'Something went wrong' })
        });
}

module.exports = {
    getAllPosts,
    createPost,
    renderCreateForm,
    getSinglePost,
    deleteSinglePost
}