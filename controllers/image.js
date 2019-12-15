const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: process.env.API_CLARIFAI
 // apiKey: 'c4d640cfd8764436a95e8cdc88cea671'
});

const handleApiCall = (req,res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req,res,db)=>{
	const { id } = req.body;

	db.from('users').where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	res.json(entries[0]);
	  })
	  .catch(err => res.status(400).json('unable to get entries'))
}


module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};