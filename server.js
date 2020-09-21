const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image')

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

app.post('/signin', signin.handleSignin(db,bcrypt))

app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfile(req, res, db)})

app.put('/image', (req,res) => {image.handleImage(req, res, db)})

app.listen(4000)

/*
--> res = this is working
    /signin --> POST = success/fail
    /register --> POST = new user
    /profile/:userID --> GET = user
    /image --> PUT --> user

*/