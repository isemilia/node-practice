const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const postRoutes = require('./routes/post-routes');

// set up .env
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
    });

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
app.use('/posts', postRoutes);

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' });
});