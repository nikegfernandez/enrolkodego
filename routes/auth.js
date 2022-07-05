const express = require('express');
const router = express.Router();
const regController = require('../controllers/authAccount');


router.post('/login', regController.login);
router.get('/delete/:email', regController.delete);
router.get('/update-data/:email', regController.update);
router.post('/update-user' , regController.update_user);
router.post('/register', regController.register);
router.get('/logout', (req,res) => {
    res.render('index', {message: 'Successfully Logout'});
});


module.exports = router;