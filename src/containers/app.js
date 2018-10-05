import React, { Component } from "react";

import SearchBar from "../components/search-bar";
import VideoList from "./video-list";
import VideoDetail from "../components/video-detail";
import Video from "../components/video";
import axios from "axios";

const SEARCH_URL = "search/movie?language=fr&include_adult=false";
const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL =
  "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images";
const API_KEY = "api_key=e1a3a80962112a1b2f1718defa7d6daa";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: {},
      currentMovie: {}
    };
  }

  componentWillMount() {
    this.initMovies();
  }

  initMovies() {
    // Récupération des films
    axios
      .get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
      .then(response => {
        this.setState(
          {
            moviesList: response.data.results.slice(1, 6),
            currentMovie: response.data.results[0]
          },
          () => {
            this.applyVideoToCurrentMovie();
          }
        );
      });
  }

  applyVideoToCurrentMovie() {
    // Récupération vidéo youtube
    axios
      .get(
        `${API_END_POINT}movie/${
          this.state.currentMovie.id
        }?${API_KEY}&append_to_response=videos&include_adult=false`
      )
      .then(response => {
        const YOUTUBE_KEY = response.data.videos.results[0].key;
        let newCurrentMovie = this.state.currentMovie;
        newCurrentMovie.videoId = YOUTUBE_KEY;
        this.setState({ currentMovie: newCurrentMovie });
        console.log(newCurrentMovie);
      });
  }

  onclickListItem(movie) {
    this.setState({ currentMovie: movie }, () => {
      this.applyVideoToCurrentMovie()
      this.setRecommendation()
    });
  }

  setRecommendation() {
    axios
    .get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`)
    .then(response => {
      this.setState({ moviesList: response.data.results.slice(0,5)})
    });
  }

  onclickOnSearch(searchText) {
    if(searchText) {
      axios
        .get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`)
        .then(response => {
          if(response.data && response.data.results[0]) {
            if(response.data.results[0].id !== this.state.currentMovie.id) {
              this.setState({ currentMovie: response.data.results[0] }, () => {
                this.applyVideoToCurrentMovie()
                this.setRecommendation()
              })
            }
          }
        });
    }
  }

  render() {
    const renderVideoList = () => {
      if (this.state.moviesList.length === 5) {
        return (
          <VideoList
            moviesList={this.state.moviesList}
            callback={this.onclickListItem.bind(this)}
          />
        );
      }
    };

    return (
      <div>
        <div className="movie-promo">
          <SearchBar callback={this.onclickOnSearch.bind(this)} />
          <Video videoId={this.state.currentMovie.videoId} />
          <VideoDetail
            title={this.state.currentMovie.title}
            description={this.state.currentMovie.overview}
          />
        </div>
        <div className="gray">{renderVideoList()}</div>
      </div>
    );
  }
}

export default App;
