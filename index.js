require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/books');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form submissions


const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.static('public'));


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Atlas connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err)
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

    // Routes
app.get('/', (req, res) => {
    res.render('index');
});


app.use('/books', bookRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the Book Review API');
});

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
