const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const productsRouter = require('./routes/products.route');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/products', productsRouter)

//connect to db with mongoose
mongoose.connect('mongodb://localhost/productsModel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("database connect")
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`application start at ${process.env.PORT || 5000}`)
})
