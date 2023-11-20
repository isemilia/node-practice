const express = require('express');

// initialize express 
const app = express();

// styles
app.use(express.static(__dirname + '/public'));

// register view engine
app.set('view engine', 'ejs');
app.set('views', 'pages');

// listen for requests
app.listen(4000, () => {
    console.log('Listening');
});

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