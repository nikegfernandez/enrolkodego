const bcrypt = require('bcrypt');
const mySql = require('mysql2');
const db = mySql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE
});

exports.login = async(req, res) => {
    try {
        const { username, password } = req.body;
        // console.log(username);
        // console.log(password);
        if (!username || !password) {
            return res.status(400).render('index', { message: 'Error provide email and password.' });
        }
        else{
        db.query('SELECT * FROM user WHERE user_name = ?', username,
            async(err, results) => {
                if (!results || (password !== results[0].password)) {
                    res.status(401).render('index', { message: 'Email or password is incorrect.' });
                    console.log('Login successfully')
                } else {
                    db.query('SELECT * FROM student LEFT JOIN courses ON student.course_id = courses.course_id',
                        (error, results) => {
                            
                            console.log(results)
                            if (err) {
                                
                                console.log(error.message);
                            } else {
                                res.render('list', { student: results, title: 'List Of Students' });
                                
                            }
                        });
                }
                
        });
        }
    } 
    catch (error) {
        console.log(error.message);
    }
    
}

exports.delete = (req, res) => {
    const email = req.params.email;
    // console.log(email);
    db.query('DELETE FROM student WHERE email=?',
    email, 
    (err, results) => {
        // console.log('Data Deleted!!');
        db.query('SELECT * FROM student LEFT JOIN courses ON student.course_id = courses.course_id', (err, results) => {
            if (err) {
                console.log(err.message)
            } else {
                res.render('list', {student: results, message: 'Record has been Deleted!'});
            }
        })
    })
};

exports.update = (req, res) => {
    const email = req.params.email;
    // console.log(email);
    db.query('SELECT * FROM student WHERE email= ? ',
    email,
    (err, results) => {
        if (err) {
            console.log(err.message)
        } else {
            res.render('update-data', {student: results});
        }
    })
};


exports.update_user = (req, res) => {
    // console.log(req.body);
    const {first_name, last_name, course_id, email} = req.body;
    db.query('UPDATE student SET first_name = ?, last_name = ?, course_id = ? WHERE email = ?', 
        [first_name, last_name, course_id, email],
        (err, results) => {
            db.query('SELECT * FROM student JOIN courses ON student.course_id = courses.course_id;', (err, results) => {
                if (err) {
                    console.log(err.message)
                } else {
                    res.render('list', {student: results, message: 'Record has been Updated!'});
                }
            })
        })
};

// exports.register = (req, res) => {
//     const {first_name, last_name, email, course_id} = req.body;
//         db.query('INSERT INTO student SET ?', 
//         {first_name: first_name, last_name: last_name, email: email, course_id: course_id}, 
//         (err, results) => {
//             db.query('SELECT * FROM student a JOIN courses b ON a.course_id = b.course_id', (err, results) => {
//                 if (err) {
//                     console.log(err.message)
//                 } else {
//                     res.render('list', {student: results, message: 'Student has been Added'});
//                     console.log(results)
//                 }
//             })
//         })
// };

exports.register = (req, res) => {
    const {first_name, last_name, email, course_id} = req.body; //Destructuring 
        db.query('INSERT INTO student SET?', {first_name: first_name, last_name: last_name, email: email, course_id: course_id}, 
        (err, results) => {
            db.query('SELECT * FROM student a JOIN courses b ON a.course_id = b.course_id', (err, results) => {
            if (err) {
                console.log(err.message);
            } else {
                res.render('list', {student: results, message: 'Student has been Added'});
            }
        })
    })
};