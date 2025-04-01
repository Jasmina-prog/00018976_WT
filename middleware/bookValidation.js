// vlidation with Yup
const yup = require('yup');

const bookSchema = yup.object({
    title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
    author: yup.string().required('Author is required').min(3, 'Author must be at least 3 characters'),
    review: yup.string().required('Review is required').min(5, 'Review must be at least 10 characters')
});

const validateBook = async (req, res, next) => {
    try {
        await bookSchema.validate(req.body, { abortEarly: false }); 
        next(); 
    } catch (err) {
        const errors = err.inner.map(e => ({ field: e.path, message: e.message }));
        res.render('add', { errors }); 
    }
};


module.exports = validateBook;