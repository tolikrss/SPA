import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
    uploadFile({ file, name }) {
        console.log('uploadFile() in api/index.js worked. name - ' + name);
        let data = new FormData();
        data.append('file', file);
        data.append('name', name);
        return axios.post(`${apiPrefix}/upload`, data);
        // return (dispatch) => {
        //     axios.post(`${apiPrefix}/upload`, data)
        //     .then(response => dispatch(uploadSuccess(response))
        //     .catch(error => dispatch(uploadFail(error));
        // };
    },

    listFilms() {
        return axios.get(`${apiPrefix}/films`);
    },

    listFindByTitleFilms(title) {
        console.log('listFindByTitleFilms in api/index.js worked. title - ' + title);
        return axios.get(`${apiPrefix}/films/title/${title}`);
    },

    listFindByStarsFilms(stars) {
        console.log('listFindByStarsFilms in api/index.js worked. stars - ' + stars);
        return axios.get(`${apiPrefix}/films/stars/${stars}`);
    },

    createFilm(data) {
        return axios.post(`${apiPrefix}/films`, data);
    },

    deleteFilm(filmId) {
        return axios.delete(`${apiPrefix}/films/${filmId}`);
    }
}