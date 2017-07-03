import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const FilmActions = {
    uploadFile({ file, name }) {
        api.uploadFile({ file, name }) 
            .then(() =>
                console.log('uploadFile() from FilmActions.js without error. name - ' + name)
            )
            .catch(err =>
                console.error(err)
            );
    },

    loadFilms() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_FILMS_REQUEST
        });

        api.listFilms()
            .then(({ data }) =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_FILMS_SUCCESS,
                    films: data
                })
            )
            .catch(err =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_FILMS_FAIL,
                    error: err
                })
            );
    },

    createFilm(film) {
        api.createFilm(film)
            .then(() =>
                this.loadFilms()
            )
            .catch(err =>
                console.error(err)
            );
    },

    findFilmByTitle(title) {
        console.log('findFilmByTitle in FilmsActions.js worked. title - ' + title);
        api.listFindByTitleFilms(title)
            .then(({ data }) =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_FILMS_SUCCESS,
                    films: data
                })
            )
            .catch(err =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_FILMS_FAIL,
                    error: err
                })
            );
    },

    findFilmByStars(stars) {
        console.log('findFilmByStars in FilmsActions.js worked. stars - ' + stars);
        api.listFindByStarsFilms(stars)
            .then(({ data }) =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_FILMS_SUCCESS,
                    films: data
                })
            )
            .catch(err =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_FILMS_FAIL,
                    error: err
                })
            );
    },

    deleteFilm(filmId) {
        api.deleteFilm(filmId)
            .then(() =>
                this.loadFilms()
            )
            .catch(err =>
                console.error(err)
            );
    }
};

export default FilmActions;