const handleSignin = (db, bcrypt) => (req,res) => {
    const {email, password} = req.body;
    if(!email||!password){
        return res.status(400).json('incorrect form submission');
    }
    db.select('email', 'hash').from('login')
    .where("email", "=", email)
    .then(data => {
       const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid){
            return db.select('*').from('users')
            .where("email", "=", email)
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
    // if (email === dataBase.users[0].email && password === dataBase.users[0].password) {
    //     res.json(dataBase.users[0])
    // } else {
    //     res.status(400).json('error logging in')
    // } 
}

module.exports={
    handleSignin
};