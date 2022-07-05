const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('index')
});
router.get('/list', (req, res) => {
    res.render('list');
});
router.get('/register', (req, res) => {
    res.render('addStudent');
});
// router.get('/student-update-form', (req, res) => {
//     res.render('student-update-form');
// });

module.exports = router;