const express = require('express');
const userController = require('./users/user.controller.js');
const app = express();

app.use(express.json());

const PORT = 4000;
app.use('/users', userController);
app.get('/', (req, res) => {
    res.json('Received get request');
});
app.listen(PORT, () => {
    console.log('Server listening port:' + PORT);
})