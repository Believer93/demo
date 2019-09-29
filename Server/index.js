const mysql = require('mysql');
const express = require('express');
const path = require('path');
const http = require('http');
var app = express();
const bodyparser = require('body-parser');

var session = require('express-session');

app.use(express.static(__dirname + '/app'));

app.get('/app',(req, res)=>res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}))

app.use(bodyparser.json({
    extended: true
}));

// var sess = req.session;  //initialize session variable

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root@123',
    database: 'fms',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));
server.listen(3001, () => console.log('Express server is runnig at port no : 3000'));


//Get an user Login 
app.post('/login', (req, res) => {
    mysqlConnection.query('SELECT * FROM fms_user_details WHERE user_id = ? and password = ?', [req.body.user_id, req.body.password], (err, results, fields) => {
        if (!err && results[0]) {
            req.session.username = results[0].user_id;
            req.session.team = results[0].team_name;
            req.session.role = results[0].role;
            req.session.odc = results[0].odc;

            res.send(results);
        }
        else
            res.send(err);
    })
});


//Get all users
app.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM fms_user_details', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});



//Add New User
app.post('/addUser', (req, res) => {
    mysqlConnection.query('INSERT INTO fms_user_details (user_id,user_name,team_name,role,odc,password) VALUES (?,?,?,?,?,?)',
        [req.body.user_id, req.body.user_name, req.body.team_name, req.body.role, req.body.odc, req.body.password],
        (err, result, fields) => {
            if (!err)
                res.send(result);
            else
                res.send(err);
        })
});


//Delete Existing User

app.post('/deleteUser', (req, res) => {
    mysqlConnection.query('delete from fms_user_details where user_id = ?',
        [req.body.user_id],
        (err, result, fields) => {
            if (!err)
                res.send(result);
            else
                res.send(err);
        })
});


//Get employee details based on team  
app.get('/employees', (req, res) => {

    if (req.session.team === 'ALL') {
        mysqlConnection.query('SELECT * FROM fms_emp_details', (err, rows, fields) => {

            if (!err)
                res.send(rows);
            else
                res.send(err);
        })
    } else {

        mysqlConnection.query('SELECT * FROM fms_emp_details where team_name = ?', [req.session.team], (err, rows, fields) => {

            if (!err)
                res.send(rows);
            else
                res.send(err);
        })

    }
});





//Add New Employee
app.post('/addEmployee', (req, res) => {

    if(req.session.team===req.body.team_name){

        mysqlConnection.query('insert into fms_emp_details(emp_id, emp_name, asset_type, asset_id, floor_num, seat_num, source_prjct, team_name, multitagged_asset_id, odc) values (?,?,?,?,?,?,?,?,?,?)',
        [req.body.emp_id, req.body.emp_name, req.body.asset_type, req.body.asset_id, req.body.floor_num, req.body.seat_num, req.body.source_prjct, req.body.team_name, req.body.multitagged_asset_id, req.body.odc],
        (err, result, fields) => {
            if (!err)
                res.send(result);
            else
                res.send(err);
        })

    }else{
        console.log("Not Allowed to insert Employee");
        return res.status(400).send({
            message: 'Do not have permission to add the employee'
         });
    }
    
});


//Delete Existing Employee

app.post('/deleteEmployee', (req, res) => {
    mysqlConnection.query('delete from fms_emp_details where emp_id = ? and team_name = ?',
        [req.body.emp_id,req.session.team],
        (err, result, fields) => {
            if (!err && result.affectedRows>0)
                res.send(result);
            else
            
            res.status(420).send({ error: 'do not have the permission' })
                
                
        })
});


//Update Existing Employee

app.post('/updateEmployee', (req, res) => {

    var updateField = req.body.updated_field;
    mysqlConnection.query('update fms_emp_details set ' + updateField + ' = ? where emp_id = ?',
        [req.body[updateField], req.body.emp_id],
        (err, result, fields) => {
            if (!err)
                res.send(result);
            else
                res.send(err);
        })
});



app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (!err)
            res.send();
        else
            res.send(err);

    });

});




//Get Dashboard Details
app.get('/dashboard', (req, res) => {
    mysqlConnection.query('select odc,count(odc) alocated_count from fms_emp_details group by odc', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

