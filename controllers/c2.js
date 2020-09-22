const handleSignin = (db, bcrypt) => (req,res) => {
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
}

module.exports={
    handleSignin
};