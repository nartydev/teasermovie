import React from 'react'

const BASE_URL = "https://youtube.com/embed/"

const Video = ({videoId}) => {
    return(
        <div className="embed-responsive embed-responsive-16by9">
            <iframe className="responsive-embed-item" src={`${BASE_URL}${videoId}`} frameBorder="0" allowFullScreen ></iframe>
        </div>
    ) 
}

export default Video