import express from 'express';
import bodyParser from 'body-parser'; //преобразование данных
import fs from 'fs'; // node.js api, будет использовано для работы с файлами
import path from 'path';
import formidable from 'formidable'; // formidable will parse the incoming form data (the uploaded files)
import axios from 'axios';
import multer from 'multer';

import { serverPort, apiPrefix } from '../etc/config.json'

import * as db from './utils/DataBaseUtils.js';

db.setUpConnection();

const app = express();

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storage = multer.diskStorage({
    destination: './uploads',
    filename(req, file, cb) {
        cb(null, `${file.originalname}`); // cb(null, `${new Date()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

app.use(bodyParser.json()); // промежуточный обработчик данных
// каждый раз, когда будет приходить запрос, то что пришло в риквесте
// и преобразует в обычний вид (обьект)
// и тогда будут вызыватся наши обработчики запросов get, post, delete
// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function(req, res) { //we'll create a route which will serve up the homepage (index.html) when someone visits the website:
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.get('/films', (req, res) => {
    db.listFilms().then((data) => res.send(data));
});

app.get('/films/title/:id', (req, res) => { //поиск фильма по заголовку
    db.listFilmsFindTitle(req.params.id).then((data) => res.send(data));
});

app.get('/films/stars/:id', (req, res) => { //поиск фильма по актеру
    db.listFilmsFindStars(req.params.id).then((data) => res.send(data));
});

app.post('/films', (req, res) => {
    db.createFilm(req.body).then((data) => res.send(data));
});


app.post('/upload', upload.single('file'), (req, res) => {
    console.log('app.post worked');
    const file = req.file; // file passed from client
    const meta = req.body; // all other values passed from the client, like name, etc..

    fs.readFile(`uploads/${file.originalname}`, function(err, data) {
        if (err) throw err;

        var arrayStr = data.toString().split("\r\n\r\n");
        var arrayObj = [];

        for (var i = 0; i < arrayStr.length; i++) {
            arrayStr[i] = arrayStr[i].split("\r\n");
        }
        var i = 0;
        while (i < arrayStr.length) {
            while (arrayStr[i].indexOf("") !== -1) {
                arrayStr[i].splice(arrayStr[i].indexOf(""), 1);
            }
            if (arrayStr[i].length === 0) {
                arrayStr.splice(i, 1);
            } else {
                i++;
            }
        }
        arrayStr.forEach(function(elem, i, array) {
            console.log("elem number - " + i);
            console.log(elem);
        });
        arrayStr.forEach(function(elem, i, array) {
            let elemArrayObj = {};
            let arrayStars = [];
            elemArrayObj.title = elem[0].substring(7);
            elemArrayObj.releaseYear = elem[1].substring(14);
            elemArrayObj.format = elem[2].substring(8);
            arrayStars = elem[3].substring(7).split(', ');
            elemArrayObj.stars = arrayStars;
            arrayObj.push(elemArrayObj);
        });
        arrayObj.forEach(function(elem, i, array) {
            console.log("elem number - " + i);
            console.log(elem);
        });

        // arrayObj.forEach(function(elem, i, array) {
        //     db.createFilm(elem);
        // });
        // res.send("Success");
        db.uploadFilms(arrayObj).then((data) => res.send(data));
    });
});

app.delete('/films/:id', (req, res) => {
    db.deleteFilm(req.params.id).then((data) => res.send(data));
});

const server = app.listen(serverPort, () => {
    console.log(`Server is run up on port ${serverPort}`);
});