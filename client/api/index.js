import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
    listFilms() {
        return axios.get(`${apiPrefix}/films`);
    },

    createFilm(data) {
        return axios.post(`${apiPrefix}/films`, data);
    },

    deleteFilm(filmId) {
        return axios.delete(`${apiPrefix}/films/${filmId}`);
    }
}