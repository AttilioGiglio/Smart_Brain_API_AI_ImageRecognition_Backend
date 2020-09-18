const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('this is working')
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
