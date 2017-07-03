import React from 'react';

import './FilmEditor.less';

const FilmEditor = React.createClass({
    getInitialState() {
        return {
            title: '',
            releaseYear: 0,
            format: '',
            starsString: ''
        };
    },

    handleStarsChange(event) {
        this.setState({ starsString: event.target.value });
    },

    handleFormatChange(event) {
        this.setState({ format: event.target.value });
    },

    handleReleaseYearChange(event) {
        this.setState({ releaseYear: event.target.value });
    },

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    },

    handleFilmAdd() {
        const newFilm = {
            title: this.state.title,
            releaseYear: this.state.releaseYear,
            format: this.state.format,
            stars: this.state.starsString.split(',')
        };

        this.props.onFilmAdd(newFilm);
        this.setState({ title: '', releaseYear: '', format: '', starsString: '' });
    },

    render() {
        return (
            <div className='FilmEditor'>
                <input
                    type='text'
                    className='FilmEditor__title'
                    placeholder='Enter title'
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                />
                <input
                    type='number'
                    className='FilmEditor__title'
                    placeholder='Enter release year'
                    value={this.state.releaseYear}
                    onChange={this.handleReleaseYearChange}
                />
                <label>
                    <input 
                        type="radio" name="address" 
                        value="VHS"  
                        checked={this.state.format === "VHS"} 
                        onChange={this.handleFormatChange} 
                    />
                    VHS
                </label>
                <label>
                    <input 
                        type="radio" name="address" 
                        value="DVD"  
                        checked={this.state.format === "DVD"} 
                        onChange={this.handleFormatChange} 
                    />
                    DVD
                </label>
                <label>
                    <input 
                        type="radio" name="address" 
                        value="Blu-Ray"  
                        checked={this.state.format === "Blu-Ray"} 
                        onChange={this.handleFormatChange} 
                    />
                    Blu-Ray
                </label>
                
                <textarea
                    placeholder='Enter stars'
                    rows={5}
                    className='FilmEditor__text'
                    value={this.state.starsString}
                    onChange={this.handleStarsChange}
                />
                {/*<textarea
                    placeholder='Enter stars'
                    rows={5}
                    className='FilmEditor__text'
                    value={this.state.stars}
                    onChange={this.handleStarsChange}
                />*/}
                <div className='FilmEditor__footer'>
                    <button
                        className='FilmEditor__button'
                        disabled={this.state.text}
                        onClick={this.handleFilmAdd}
                    >
                        Add
                    </button>
                </div>
            </div>
        );
    }
});

export default FilmEditor;
