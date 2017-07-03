import React from 'react';

import './Film.less';

const Film = React.createClass({
    render() {
        const style = { backgroundColor: "#fff" };

        return (
            <div className='Film' style={style}>
                <span className='Film__del-icon' onClick={this.props.onDelete}> × </span>
                {
                    this.props.title
                    ?
                        <h4 className='Film__title'>Title: {this.props.title}</h4>
                    :
                        null
                }
                {
                    this.props.releaseYear
                    ?
                        <h4 className='Film__title'>Release Year: {this.props.releaseYear}</h4>
                    :
                        null
                }
                {
                    this.props.format
                    ?
                        <h4 className='Film__format'>Format: {this.props.format}</h4>
                    :
                        null
                }
                <div className='Film__text'>{this.props.children}</div>
            </div>
        );
    }
});

export default Film;
