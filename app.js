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
    res.sendFile('./pages/home.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('./pages/about.html', { root: __dirname });
});


// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


// 404 page
app.use((req, res) => {
    res.statusCode(404).sendFile('./pages/404.html', { root: __dirname });
});