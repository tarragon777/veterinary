const express  = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

mongoClient.connect((err, client) => {

    const db = client.db('maximdb');
    const collection = db.collection('user');

    let user = { name: 'John', surname: 'Doe'};

    collection.insertOne(user, (err, result) => {
        if(err) {
            console.log(err);

            return false;
        }
        console.log('result.ops', result.ops);
        client.close();
    })
});

app.use("/static", express.static(__dirname + '/public'));

app.use((req, res, next) => {
    console.log('first middleware');
    next();
});

app.use((req, res, next) => {
    console.log('second middleware');
    next();
});

app.get('/', (req, res) => {
    res.send('hello world')
});

// app.get('/greeting', (req, res) => {
//     res.sendFile(__dirname + '/example.html')
// });

app.listen(3001);
