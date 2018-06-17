/**
 * Created By: Arman Zohrabyan
 */

const jwt = require('jsonwebtoken');
const express = require('express');
const ObjectId = require('mongoose').mongo.ObjectId;
const config = require('../../config.json');


const router = new express.Router();

router.get('/createUser/:nickname', (req, res) => {
    const user = {
        id: ObjectId(),
        nickname: req.params.nickname
    };

    const token = jwt.sign(user, config.jwtSecret);

    res.status(200).json({
        token,
        success: true
    });
});

module.exports = router;
