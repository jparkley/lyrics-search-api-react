import React, { Component } from "react"
import Axios from "axios"
import { Consumer } from "../../context"

class Search extends Component {
  state = {
    trackTitle: ""
  }

  onChange = e => {
    this.setState({ trackTitle: e.target.value })
  }

  findTrack = (dispatch, e) => {
    e.preventDefault()
    Axios.get(`https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        console.log(res.data)
        dispatch({ type: "SEARCH_TRACKS", value: res.data.message.body.track_list })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search For A Song
              </h1>
              <p className="lead text-center">Get the lyrics for any song.</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input type="text" className="form-control lg" placeholder="Song title..." onChange={this.onChange} name="trackTitle" value={this.state.trackTitle} />
                  <button className="btn btn-primary btn-lg btn-block mb-5 mt-2" type="submit">
                    Get Track Lyrics
                  </button>
                </div>
              </form>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default Search
