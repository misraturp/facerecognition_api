const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

// app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@john.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@sally.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id: '987',
			hash: '',
			email: 'john@john.com'

		}
	]
}


app.get('/', (req,res)=>{
	res.send(database.users);

})

app.post('/signin', (req,res)=>{

	// bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
	//     // res == true
	// });

	if(req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password){
		res.json(database.users[0]);
	}else{
		res.status(400).json('error logging in');
	}
})

app.post('/register', (req,res)=>{
	const { email, name, password } = req.body;

	// bcrypt.hash(password, saltRounds, function(err, hash) {
	//   console.log(hash);
	// });

	database.users.push({
			id: '125',
			name: name,
			email: email,
			entries: 0,
			joined: new Date()
		})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id',(req,res)=>{
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if (!found){
		res.status(400).json('not found user')
	}
})

app.put('/image', (req,res)=>{
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	})
	if (!found){
		res.status(400).json('not found user')
	}
})

app.listen(3000, () =>{
	console.log('app is running on port 3000');
})


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

*/