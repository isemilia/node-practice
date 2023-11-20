const express = require('express');

// initialize express 
const app = express();

// register view engine
app.set('view engine', 'ejs');
app.set('views', 'pages');

// listen for requests
app.listen(4000, () => {
    console.log('Listening');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/posts/create', (req, res) => {
    res.render('create');
})


// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


// 404 page
app.use((req, res) => {
    res.status(404).render('404');
});