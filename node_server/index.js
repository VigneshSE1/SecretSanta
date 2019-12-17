const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const bcrypt = require("bcrypt");

const saltRounds = 10;
app.use(cors());
app.use(bodyParser.json());

app.post('/userdata', function(req, res) {
    mongoClient.connect(url, function(err, client) {
        if (err) throw err;

        var db = client.db('SecretSanta');

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                console.log(hash);
                db.collection('users').insertOne({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    phonenumber: req.body.phonenumber,
                    role: "player",
                    child: "",
                    parent: "",
                    assignedTask: [{
                        taskName: "",
                        taskMessage: "",
                        startTime: "",
                        endTime: "",
                        status: ""
                    }],
                    taskAssigned: [{
                        taskName: "",
                        taskMessage: "",
                        startTime: "",
                        endTime: "",
                        status: ""
                    }]
                }, function(err) {
                    if (err) throw err;

                    res.status(200).json({
                        "message": "succes"
                    })
                    client.close();
                })
            })
        })
    })
})

app.post('/login', function(req, res) {
    mongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db("SecretSanta");
        var result = db.collection("users").findOne({ email: req.body.email })

        result.then(function(userdata) {
            if (userdata !== null) {
                bcrypt.compare(req.body.password, userdata.password, function(err, hasResult) {
                    if (hasResult == true) {

                        res.json({
                            "message": "sucess"
                        })
                    } else {
                        console.log("wrong")
                        res.status(403).json({
                            message: "wrong password"
                        })
                    }
                })
                client.close()
            }
        })
    })
})

app.listen(3000);