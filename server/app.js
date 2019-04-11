require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost:27017/classic_fox_live_code_1', { useNewUrlParser: true });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/', routes);


app.listen(port, () => {
    console.log(`Server is running in port ${port}...`);
})