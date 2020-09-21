const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1', //localhost
        user: 'postgres',
        password: 'postgres',
        database: 'smart-brain'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data)  /* --> this log giveme the password error :( */
// });

const app = express();

// const dataBase = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'bananas',
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     login: [
//         {
//             id: '987',
//             hash: '',
//             email: 'john@gmail.com'
//         }
//     ]
// }

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send(dataBase.users)
})

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
    .where("email", "=", req.body.email)
    .then(data => {
       const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if(isValid){
            return db.select('*').from('users')
            .where("email", "=", req.body.email)
            .then(user =>{
                res.json(user[0])
            })
            .catch(err => res.status(400).json('enable to get user'))
        }else{
            res.status(400).json('wrong credentials')
        }
    })
   
    // bcrypt.compare("chucha", '$2a$10$h6yIBQ8Jlq6MIAJFQv6eRe2XmQGRMM4PV.lvoIcSwME0u/oJaAaIC', function (err, res) {
    //     console.log('first guess', res)
    // });
    // bcrypt.compare("veggies", '$2a$10$h6yIBQ8Jlq6MIAJFQv6eRe2XmQGRMM4PV.lvoIcSwME0u/oJaAaIC', function (err, res) {
    //     console.log('second guess', res)
    // });
    // if (req.body.email === dataBase.users[0].email && req.body.password === dataBase.users[0].password) {
    //     res.json(dataBase.users[0])
    // } else {
    //     res.status(400).json('error logging in')
    // } 
})

app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    // let found = false;
    db.select('*').from('users').where({ id: id })
        .then(user => {
            if (user.length) {
                res.json(user[0])
            }
            else {
                res.status(400).json('not found')
            }
        }).catch(err => res.status(400).json('error getting user'))
    // dataBase.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         return res.json(user);
    //     }
    // })
    // if (!found) {

    //     res.status(404).json('no such user')
    // }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    // let found = false;
    // dataBase.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         user.entries++
    //         return res.json(user.entries);
    //     }
    // })
    // if (!found) {
    //     res.status(404).json('no such user');
    // }
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        }).catch(err => res.status(400).json('unable to get entries'))
})

app.listen(4000)

/*
--> res = this is working
    /signin --> POST = success/fail
    /register --> POST = new user
    /profile/:userID --> GET = user
    /image --> PUT --> user

*/