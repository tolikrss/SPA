import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const FilmActions = {
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