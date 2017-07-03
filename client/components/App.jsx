import React from 'react';

import FilmsStore from '../stores/FilmsStore';
import FilmsActions from '../actions/FilmsActions';

import FilmEditor from './FilmEditor.jsx';
import FilmsGrid from './FilmsGrid.jsx';

import './App.less';

function getStateFromFlux() {
    return {
        isLoading: FilmsStore.isLoading(),
        films: FilmsStore.getFilms()
    };
}

const App = React.createClass({
    getInitialState() {
        return getStateFromFlux();
    },

    componentWillMount() {
        FilmsActions.loadFilms();
    },

    componentDidMount() {
        FilmsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        FilmsStore.removeChangeListener(this._onChange);
    },

    handleFilmDelete(film) {
        FilmsActions.deleteFilm(film.id);
    },

    handleFilmAdd(filmData) {
        FilmsActions.createFilm(filmData);
    },

    handleFindFilmByTitle(title) {
        console.log('handleFindFilmByTitle in app.jsx worked. title - ' + title)
        FilmsActions.findFilmByTitle(title);
    },

    handleFindFilmByStars(stars) {
        console.log('handleFindFilmByStars in app.jsx worked. stars - ' + stars)
        FilmsActions.findFilmByStars(stars);
    },

    handleUploadRequest({ file, name }) {
        console.log('handleUploadRequest in app.jsx worked. name - ' + name);
        FilmsActions.uploadFile({ file, name });
    },

    render() {
        return (
            <div className='App'>
                <h2 className='App__header'>FilmsApp</h2>
                <FilmEditor onFilmAdd={this.handleFilmAdd} onFindByTitle={this.handleFindFilmByTitle} onFindByStars={this.handleFindFilmByStars} onUploadRequest={this.handleUploadRequest}/>
                <FilmsGrid films={this.state.films} onFilmDelete={this.handleFilmDelete} />
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default App;
