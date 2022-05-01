const express = require('express');
const router = express.Router();
const userService = require('../users/user.service');

router.post('/registerUser', (req, res, next) => {
    userService.registerUser(req.body)
        .then(() => { 
            res.json({ message: "User created successfully. " + req.body}) 
        })
        .catch(next);
    // res.json("POST: Received a request to register a user " + req.body);
});
router.get('/getAllUsers', (req, res) => {
    userService.getAllUsers().then((users) => {
        console.log("All Users:");
        console.log(users);
        res.json(users);
    });
});

router.put('/updateUser/:userid', (req, res, next) => {
    userService.updateUser(req.params.userid, req.body)
    .then(() => res.json({ message: `User updated successfully.`}))
    .catch(next);
});

router.delete('/deleteUser/:userid', (req, res, next) => {
    userService.deleteUser(req.params.userid)
    .then(() => res.json({ message: `User deleted successfully.`}))
    .catch(next);
}); 
module.exports = router;