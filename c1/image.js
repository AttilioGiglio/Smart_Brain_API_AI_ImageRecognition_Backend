const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '830df3e3c47a4135989c97e73c30b3d9'
});

const handleApiCall = (req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data =>{
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
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
}

module.exports = {
    handleImage,
    handleApiCall
};