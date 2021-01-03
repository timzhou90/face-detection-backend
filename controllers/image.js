const Clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: '2dbf3b62820549418772c647dc90d3c6'
});

const handleApiCall = (req, res) => {
    app.module.predict(
        //Clarifai.FACE_DETECT_MODEL,
        //second keys
        "c0c0ac362b03416da06ab3fa36fb58e3",
        req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) =>{
    const { id } = req.body;
        db('users1').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
        res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage : handleImage,
    handleApiCall: handleApiCall
}