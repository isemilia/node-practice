const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Post = require('./models/post')

// set uup .env
dotenv.config();

// initialize express 
const app = express({ extended: true });

// connect to mongoDB
mongoose.connect(process.env.DB_URI)
    .then((res) => {
        console.log('Connected to DB');

        // listen for requests
        app.listen(4000, () => {
            console.log('Listening');
        });
    })
    .catch((err) => {
        console.log(err);
    })

// register view engine
app.set('view engine', 'ejs');
app.set('views', 'pages');

// midldeware
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

// logger 
app.use(morgan('dev'));

// router
app.get('/', (req, res) => {
    res.redirect('/posts');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


// post routes
app.get('/posts', (req, res) => {
    Post.find().sort({ createdAt: -1 })
        .then(posts => {
            res.render('index', { title: 'Posts', posts });
        })
        .catch(console.log)
});

app.post('/posts', (req, res) => {
    const post = new Post(req.body);
    post.save()
        .then(result => {
            res.redirect('/posts')
        })
        .catch(console.log)
});

app.get('/posts/create', (req, res) => {
    res.render('create', { title: 'Create a new post' });
});

app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    Post.findById(id).
        then(result => {
            res.render('single', { title: result.title, post: result })
        })
        .catch(console.log);
});

app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    Post.findByIdAndDelete(id).
        then(result => {
            console.log(result);
            res.json({
                redirect: '/posts'
            })
        })
        .catch(console.log);
});

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' });
});