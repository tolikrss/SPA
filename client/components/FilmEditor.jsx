import React from 'react';

import './FilmEditor.less';

const FilmEditor = React.createClass({
    getInitialState() {
        return {
            title: '',
            releaseYear: 0,
            format: '',
            starsString: '',
            findByTitle: '',
            findByStars: ''
        };
    },

    handleFileUpload(e) { //{ file }
        console.log('handleFileUpload() in FilmEditor.jsx worked');
        const file = e.target.files[0];
        this.props.onUploadRequest({
            file,
            name: 'Awesome Cat Pic'
        })
    },
    handleFindByStars() {
        const stars = this.state.findByStars;
        this.props.onFindByStars(stars);
        this.setState({ title: '', releaseYear: '', format: '', starsString: '', findByTitle: '', findByStars: '' });
    },

    handleFindByStarsChange(event) {
        this.setState({ findByStars: event.target.value });
    },

    handleFindByTitle() {
        const title = this.state.findByTitle;
        this.props.onFindByTitle(title);
        this.setState({ title: '', releaseYear: '', format: '', starsString: '', findByTitle: '', findByStars: '' });
    },

    handleFindByTitleChange(event) {
        this.setState({ findByTitle: event.target.value });
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
        console.log('handleFilmAdd() from FilmEditor.jsx worked');
        this.props.onFilmAdd(newFilm);
        this.setState({ title: '', releaseYear: '', format: '', starsString: '', findByTitle: '', findByStars: '' });
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
                <hr/>
                <div>
                        <input
                        type='text'
                        className='FilmEditor__title'
                        placeholder='Enter title'
                        value={this.state.findByTitle}
                        onChange={this.handleFindByTitleChange}
                        />
                        <button
                            className='FilmEditor__button'
                            disabled={false}
                            onClick={this.handleFindByTitle}
                        >
                            Find by title
                        </button>
                </div>
                <div>
                        <input
                        type='text'
                        className='FilmEditor__title'
                        placeholder='Enter title'
                        value={this.state.findByStars}
                        onChange={this.handleFindByStarsChange}
                        />
                        <button
                            className='FilmEditor__button'
                            disabled={false}
                            onClick={this.handleFindByStars}
                        >
                            Find by stars
                        </button>
                </div>
                <br/>
                <div>
                        <input type="file" onChange={this.handleFileUpload}/>
                        <br/>
                        {/*<button
                            className='FilmEditor__button'
                            disabled={false}
                            onClick={this.handleFindByStars} //=========
                        >
                            Upload films
                        </button>*/}
                </div>
            </div>
        );
    }
});

export default FilmEditor;
