const express = require('express');
const router = express.Router();
const User = require('../models/user');

// save a user to mongo db
router.post('/api/users', async(req, res) => {
    const { name, email, password } = req.body;
    try {

        if(!name || !email || !password) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: `Please provide all required data fields: Name, Email and Password!`
            });
        }

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        return res.status(201).json({
            status: 'success',
            statusCode: 201,
            message: 'User added successfully!',
            data: {
                user
            }
        });
    } catch(err) {
        console.error('error adding user: ', err);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: `Problem while adding user, please try again later!`
        })
    }
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({
            status: 'error',
            statusCode: 400,
            message: `Request failed, please try again!`
        });
    }
    try {

        const findUser = await User.findById(id);

        if(!findUser) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: `User not found!`
            });
        }

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'User found successfully!',
            data: {
                user: findUser
            }
        });
    } catch(err) {
        console.error('error get user: ', err);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: `Problem while get user, please try again later!`
        })
    }
})

module.exports = router;