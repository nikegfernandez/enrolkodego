select * from user;

SELECT * FROM student JOIN courses ON student.course_id = courses.course_id;

UPDATE student SET first_name = ?, last_name = ?, course_id = ? WHERE email = ?;