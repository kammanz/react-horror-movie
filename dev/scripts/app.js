import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {

    constructor() {
      super();
      this.state = {
        movies: [],
        ratingGte: null,
        ratingLte: null,
        voteCountGte: null,
        voteCountLte: null,
        releaseYearGte: null,
        releaseYearLte: null,
      }
      
      this.getMovies = this.getMovies.bind(this);
      // this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentWillMount() {
      this.getMovies();
    }

    componentDidUpdate(prevProps, prevState){
      if (prevState.ratingGte != this.state.ratingGte || prevState.voteCountGte != this.state.voteCountGte || prevState.releaseYearGte != this.state.releaseYearGte) {
        this.getMovies();
      }
    }

    getMovies() {
      console.log(this);
        axios({
          method: 'GET',
          url: 'https://api.themoviedb.org/3/discover/movie?',
          dataResponse: 'json',
          params: { 
            api_key: '666042b53729341d90681f2d042ecae2',
            with_genres: '27',
            "vote_average.gte": this.state.ratingGte,
            "vote_average.lte": this.state.ratingLte,
            "vote_count.gte": this.state.voteCountGte,
            "vote_count.lte": this.state.voteCountLte,
            "primary_release_date.gte": this.state.releaseYearGte,
            "primary_release_date.lte": this.state.releaseYearLte,
          }
        }).then((res) => {
          this.setState({movies: res.data.results});
        });
    }

    voteAverageChange(e){
      console.log(e.target.value);
      if (e.target.value === "All") {
        this.setState({ ratingGte: null, ratingLte: null });
      } else {
        this.setState({ ratingGte: e.target.value, ratingLte: parseInt(e.target.value) + 0.9 });
      }  
    } 

    voteCountChange(e){
      // console.log(e.target.value);
      if (e.target.value === "All") {
        this.setState({ voteCount: null});
      } else if (e.target.value === "1") {
        this.setState({ voteCountGte: e.target.value, voteCountLte: parseInt(e.target.value) + 9 });
      } else if (e.target.value === "10") {
        this.setState({ voteCountGte: e.target.value, voteCountLte: parseInt(e.target.value) + 89 });
      } else if (e.target.value === "100") {
        this.setState({ voteCountGte: e.target.value, voteCountLte: parseInt(e.target.value) + 889 });     
      } else if (e.target.value === "1000") {
        this.setState({ voteCountGte: e.target.value, voteCountLte: parseInt(e.target.value) + 10000 });
      } 
    }

    releaseYearChange(e){
      // console.log(this.state.releaseYearGte);
      if (e.target.value === "All"){
        this.setState({releaseYearGte: null});
      } else {
        this.setState({releaseYearGte: parseInt(e.target.value), releaseYearLte: parseInt(e.target.value) + 9 });
      }
    }

    render() {
      return (
        <div>
          <div className="wrapper">
            <header>
              <h1>Horror Movie Finder</h1>
            </header>
            <section className="searchBar">
              <div>
                <label htmlFor="rating">Rating</label>
                  <select name="rating" id="rating" onChange={(e) => this.voteAverageChange(e)}>
                    <option value="All">All</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
              </div>
              <div>
                <label htmlFor="voteCount">Number of Votes</label>
                  <select name="voteCount" id="voteCount" onChange={(e) => this.voteCountChange(e)}>
                    <option value="All">All</option>
                    <option value="1">1-9</option>
                    <option value="10">10 - 99</option>
                    <option value="100">100 - 999</option>
                    <option value="1000">1000+</option>
                  </select>
              </div>
              <div>
                <label htmlFor="releaseYear">Decade</label>
                  <select name="releaseYear" id="releaseYear" onChange={(e) => this.releaseYearChange(e)}>
                    <option value="All">All</option>
                    <option value="1960">60's</option>
                    <option value="1970">70's</option>
                    <option value="1980">80's</option>
                    <option value="1990">90's</option>
                    <option value="2000">2000's</option>
                    <option value="2010">2010's</option>
                  </select>
              </div> 
            </section>
            <section className="movieGallery">
              {this.state.movies.map((movie) => 
              <div key={movie.id} className="movieBox">
                <img src={(`https://image.tmdb.org/t/p/w185${movie.poster_path}`)} />
                <div className="movieBoxDescription">
                  <h3>{movie.original_title}</h3>
                  <p>Vote: {movie.vote_average}</p>
                  <p>Vote Count: {movie.vote_count}</p>
                  <p>Released: {movie.release_date}</p>
                </div>
              </div>
              )}
            </section> 
          </div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
