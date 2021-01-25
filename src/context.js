import React, { Component } from "react"
import Axios from "axios"

const Context = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TRACKS":
      return {
        ...state,
        track_list: action.value,
        heading: "Search Results"
      }
    default:
      return state
  }
}

export class Provider extends Component {
  state = {
    track_list: [],
    heading: "Top Tracks",
    dispatch: action => this.setState(state => reducer(state, action))
  }

  componentDidMount() {
    Axios.get(`https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=30&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        const newList = res.data.message.body.track_list.filter(item => item.track.explicit === 0)
        this.setState({ track_list: newList })
      })
      .catch(err => console.log(err))
  }

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>
  }
}

export const Consumer = Context.Consumer
