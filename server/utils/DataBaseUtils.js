import mongoose from 'mongoose';

import '../models/Film';

import config from '../../etc/config.json';

const Film = mongoose.model('Film');

export function setUpConnection() { //подключение к БД
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listFilms() { //получить список всех фильмов
    return Film.find().sort({ title: 1 }); //return Film.find(); //work
} //=====================================================================

export function listFilmsFindTitle(param) { //получить список всех фильмов c поисковым параметром param, localhost:8080/films/test (test-поисковый параметр)
    return Film.find({ title: { $regex: param } }).sort({ title: 1 }); //title: /^Antonio$/i
} //=====================================================================

export function listFilmsFindStars(param) {
    return Film.find({ stars: { $regex: param } }).sort({ title: 1 });
} //=====================================================================

export function createFilm(data) { //добавить фильм в базу
    const film = new Film({
        title: data.title,
        releaseYear: data.releaseYear,
        format: data.format,
        stars: data.stars
    });

    return film.save(); //сохранение в базу
}

export function deleteFilm(id) { //удаление фильма
    return Film.findById(id).remove();
}

//если базы нет созданой, то при запросе она создастся