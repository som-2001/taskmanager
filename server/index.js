const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
var dbConnection;

app.use(express.json());

app.use(cors({
    origin: ['https://taskmanager-625t.vercel.app'],
    methods: ['PUT', 'GET', 'POST', 'DELETE'],
    credential: true
}))

MongoClient.connect('mongodb+srv://user2000:test234@cluster0.ja3sz4z.mongodb.net/Docker_test?retryWrites=true&w=majority&appName=Cluster0').then(client => {

    dbConnection = client.db();
    console.log('database connected');

})

app.post('/',(req,res)=>{
 res.send('hello');
})

app.post('/api/save', (req, res) => {

    var background = ['https://plus.unsplash.com/premium_vector-1712694179179-f18fd818419d?bg=FFFFFF&w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGlrZXN8ZW58MHx8MHx8fDA%3D', 'https://plus.unsplash.com/premium_vector-1711987582179-5a4fdb1711d5?bg=FFFFFF&w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlrZXN8ZW58MHx8MHx8fDA%3D', 'https://plus.unsplash.com/premium_vector-1713941732591-60e71e84560b?bg=FFFFFF&w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlrZXN8ZW58MHx8MHx8fDA%3D', 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGxpa2VzfGVufDB8fDB8fHww', 'https://plus.unsplash.com/premium_photo-1683275025970-dd2db5e4c84d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGxpa2VzfGVufDB8fDB8fHww'];
    var backgroundgenerator = background[Math.floor(Math.random() * background.length)];
    var date = new Date();
    var year = date.getFullYear();
    var day = date.getDate();
    const month = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];
    const currentdate = `${month[date.getMonth()]} ${day},${year}`;

    dbConnection.collection('notes').insertOne(
        { title: req.body.title, task: req.body.task, date: currentdate, status: 'Todo', background: backgroundgenerator,userid:req.body.userid }
    ).then(result => {
        console.log('added succesfully');
    })
})

app.post('/api/change', (req, res) => {

    dbConnection.collection('notes').updateOne(
        {
            _id: new ObjectId(req.body.id)
        },
        {
            $set: {
                status: req.body.status
            }
        },
    )
})

app.post('/api/delete', (req, res) => {

    dbConnection.collection('notes').deleteOne({
        _id: new ObjectId(req.body.id)
    })
})
app.post('/api/getResults', (req, res) => {

    dbConnection.collection('notes').find({ status: req.body.value,userid:req.body.userid }).toArray().then(result => {
        res.send(result);
    })
})

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

    dbConnection.collection('users').findOne({ email, password })
        .then(user => {
            if (user) {
                // User found, login successful
                res.send({ user, message: 'Login successful' });
            } else {
                // No user found with provided credentials
                res.status(401).send('Invalid email or password');
            }
        })
        .catch(err => {
            console.error('Error finding user:', err);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/api/register', (req, res) => {

    dbConnection.collection('users').find({ email: req.body.email }).toArray().then(result => {
        console.log(result);
        if (result.length === 0) {
            dbConnection.collection('users').insertOne({
                username: req.body.name,
                password: req.body.password,
                email: req.body.email
            }).then(result=>{
                res.send('successfully registered')
            })
        }else{
            res.send('email is already exist in database')
        }

    })

})

app.listen(3001, () => {
    console.log('app is listening on 3001');
})
