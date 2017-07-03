import mongoose from 'mongoose';

import '../models/Film';

import config from '../../etc/config.json';

const Film = mongoose.model('Film');

export function setUpConnection() { //подключение к БД
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listFilms() { //получить список всех фильмов
    return Film.find();
}

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