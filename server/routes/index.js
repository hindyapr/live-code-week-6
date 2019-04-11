const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Favorite = require('../models/favorite');
const jwt = require('jsonwebtoken');
const { cekUser } = require('../middleware/cekUser')
const { encode, decode } = require('../helper/hashing');

router.post('/register', (req, res) => {
    User
        .create({
            email: req.body.email,
            password: encode(req.body.password)
        })
        .then(data => {
            res
                .status(201)
                .json(data);
        })
})

router.post('/login', (req, res) => {
    console.log('masuk');
    User
        .find({
            email: req.body.email
        })
        .then(data => {
            console.log('masuk');
            if (data.length < 1) {
                throw 'Email tidak ditemukan'
            } else {
                if (decode(req.body.password, data[0].password)) {
                    console.log('masuk');
                    let access_token = jwt.sign({
                        id: data._id,
                        email: data.email
                    }, process.env.SECRET);
                    console.log('masuk');
                    res
                        .status(201)
                        .json(access_token);
                } else {
                    throw 'Password salah'
                }
            }
        })
        .catch(err => {
            res
                .status(500)
        })
})

router.get('/user', (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.token, process.env.SECRET);

        User
            .findById(decoded._id)
            .populate('Favorite')
            .then(data => {
                res
                    .json(data)
            })
            .catch(err => {
                res
                    .status(500)
            })

    } catch (err) {
        throw err
    }
})

router.get('/users', (req, res) => {


    User
        .find({})
        .populate('Favorite')
        .then(data => {
            res
                .json(data)
        })
        .catch(err => {
            res
                .status(500)
        })

})

router.post('/favorites', (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.token, 'wrong-secret');
        Favorite
            .create({
                joke: req.body.joke,
                userId: decoded._id
            })
            .then(data => {
                res
                    .status(201)
                    .json({
                        _id: data._id,
                        joke: data.joke
                    })
            })
            .catch(err => {
                res
                    .status(500)
            })

    } catch (err) {
        throw err
    }


})

router.delete('/favorites/:id', cekUser, (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.token, 'wrong-secret');
        Favorite
            .findByIdAndDelete(req.params.id)
            .then(data => {
                res
                    .status(200)
                    .json({ _id: decoded._id })
            })
            .catch(err => {
                res
                    .status(500)
            })

    } catch (err) {
        throw err
    }
})

module.exports = router