const express = require('express');

const app = express();

const dataBase = {
    users: [
        {
            is:'123',
            name:'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries:0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send('this is working')
})

app.post('/signin', (req, res) => {
    res.send('signing')
})


app.listen(4000, ()=>{
    console.log('app is runnning on port 4000')
})

/*  
--> res = this is working
    /signin --> POST = success/fail
    /register --> POST = new user 
    /profile/:userID --> GET = user
    /image --> PUT --> user

*/ 
