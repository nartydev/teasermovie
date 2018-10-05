import React from 'react'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/"

const VideoListItem = (props) => {
    const {movie} = props
    return <li onClick={handleClick} className="video-item"> 
    <img className="img-movie-list"src={`${IMAGE_BASE_URL}${movie.poster_path}`} />
    <div className="title-movie-list">{movie.title}</div> </li>

    function handleClick() {
        props.callback(movie)
    }
}

export default VideoListItem