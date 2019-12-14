const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'smart-brain'
  }
});

const saltRounds = 10;

const app = express();

// app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


app.get('/', (req,res)=>{
	db.select('*').from('users')
		.then(users => {
			res.send(users)
		});

})

//different way of calling the function
app.post('/signin', signin.handleSignIn(db, bcrypt, saltRounds))

app.post('/register', (req,res) => {
	// dependency injection
	register.handleRegister(req, res, db, bcrypt, saltRounds)
});

app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req,res,db)
})

app.put('/image', (req,res) => {
	image.handleImage(req, res, db)
})

app.post('/imageurl', (req,res) => {
	image.handleApiCall(req, res)
})

app.listen(process.env.PORT || 3000, () =>{
	console.log('app is running on port ${process.env.PORT}');
})


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

*/