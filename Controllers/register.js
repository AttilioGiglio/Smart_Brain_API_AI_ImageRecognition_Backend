const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    // bcrypt.hash(password, null, null, function (err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    // }); Asyncronous way from npm bcrypt-nodejs documentation 
    const hash = bcrypt.hashSync(password); /*Sync way "" */
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
                // dataBase.users[dataBase.users.length-1], instead of .returning('*').. reserver word from knex
            })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json('unable to register'))
    // res.json(dataBase.users[dataBase.users.length - 1])
}

module.exports = {
    handleRegister
};