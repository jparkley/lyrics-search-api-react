import React, { Component } from "react"
import Axios from "axios"
import { Link } from "react-router-dom"
import Spinner from "../layout/Spinner"

class Lyrics extends Component {
  state = {
    lyrics: {},
    track: {}
  }

  componentDidMount() {
    Axios.get(`https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        //console.log(res.data)
        this.setState({ lyrics: res.data.message.body.lyrics })
        return Axios.get(`https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
      })
      .then(res => {
        //console.log(res.data)
        this.setState({ track: res.data.message.body.track })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { track, lyrics } = this.state
    if (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
      return <Spinner />
    } else {
      return (
        <>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back{" "}
          </Link>
          <div className="card">
            <h5 className="card-header">
              <span className="text-info">{track.track_name} </span>by {track.artist_name}
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <span className="text-secondary">Album Name: </span>
              <strong>{track.album_name}</strong>
            </li>
            <li className="list-group-item">
              <span className="text-secondary">Album Id: </span>
              <strong>{track.album_id}</strong>
            </li>

            <li className="list-group-item">
              <span className="text-secondary">Song Genre: </span>
              <strong>{track.primary_genres.music_genre_list[0].music_genre.music_genre_name ? track.primary_genres.music_genre_list[0].music_genre.music_genre_name : ""}</strong>
            </li>
          </ul>
        </>
      )
    }
  }
}

export default Lyrics
