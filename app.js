const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Post = require('./models/post')

// set uup .env
dotenv.config();

// initialize express 
const app = express();

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

// styles
app.use(express.static(__dirname + '/public'));

// logger 
app.use(morgan('dev'));

// mongodb
app.get('/create-post', (req, res) => {
    const post = new Post({
        title: 'Learning NodeJS',
        snippet: 'NodeJS, Express, MongoDB',
        body: 'Node.js is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more.'
    });

    // save post instance to database
    post.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/all-posts', (req, res) => {
    // get all posts
    Post.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/single-post', (req, res) => {
    Post.findById('6561bcaa0370884a478d3263')
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
})

// router
app.get('/', (req, res) => {
    const posts = [
        { title: 'NodeJS', snippet: 'Lorem ipus liber metus' },
        { title: 'JavaScript', snippet: 'Lorem ipus liber metus' },
        { title: 'TypeScript', snippet: 'Lorem ipus liber metus' },
    ]
    res.render('index', { title: 'Home', posts });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/posts/create', (req, res) => {
    res.render('create', { title: 'Create a new post' });
})


// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' });
});