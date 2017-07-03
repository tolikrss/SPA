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
    cb(null, `${file.originalname}`);// cb(null, `${new Date()}-${file.originalname}`);
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
 
console.log(meta);
console.log(file);
        fs.writeFile('hello.txt', file, function(error) {
            if(error) throw error; // если возникла ошибка
            console.log("Асинхронная запись файла завершена. Содержимое файла:");
                var data = fs.readFileSync("hello.txt", "utf8");
                console.log(data);  // выводим считанные данные
        });

    // send the data to our REST API
});

// upload, that works
// app.post('/upload', function(req, res) {
//     // create an incoming form object
//     var form = new formidable.IncomingForm();
//     // specify that we want to allow the user to upload multiple files in a single request
//     form.multiples = true;
//     // store all uploads in the /uploads directory
//     form.uploadDir = path.join(__dirname, '/uploads');
//     // every time a file has been uploaded successfully,
//     // rename it to it's orignal name
//     form.on('file', function(field, file) {
//         fs.rename(file.path, path.join(form.uploadDir, file.name));
//         console.log(file.path);
//     });

//     // log any errors that occur
//     form.on('error', function(err) {
//         console.log('An error has occured: \n' + err);
//     });
//     // once all the files have been uploaded, send a response to the client
//     form.on('end', function() {
//         res.end('success');
//     });
//     // parse the incoming request containing the form data
//     form.parse(req);
// });
// upload, that works

app.delete('/films/:id', (req, res) => {
    db.deleteFilm(req.params.id).then((data) => res.send(data));
});

const server = app.listen(serverPort, () => {
    console.log(`Server is run up on port ${serverPort}`);
});