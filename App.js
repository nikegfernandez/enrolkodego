const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({path: './.env'});

app.set('view engine', 'hbs');
app.use('/auth', require('./routes/auth'));

app.use('/',require('./routes/accountRoutes'))

app.listen(port, (res,req)=>{
    console.log(`Server Started at http://localhost:${port}`);

})