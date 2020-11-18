import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonBackToHome } from '../components/ButtonBackToHome'


const API_KEY = '4efeaea1'

export class Detail extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
      isExact: PropTypes.bool,
      path: PropTypes.string,
      url: PropTypes.string,
    })
  }

  state = { movie: {} }

  _fetchMovie({ id }) {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
      .then(res => res.json())
      .then(movie => {
        this.setState({ movie })
      })
  }

  componentDidMount() {
    const { id } = this.props.match.params
    console.log('id', id)
    this._fetchMovie({id})
  }

  render() {
    const { Title, Poster, Actors, Metascore, Plot } = this.state.movie
    return (
      <div className="container">
        <div className="column is-half is-offset-one-quarter">
          <ButtonBackToHome />
          <h1 className="title  has-text-info">{Title}</h1>
          <img src={Poster} />
          <h3>{Actors}</h3>
          <span>Score: {Metascore}</span>
          <p>{Plot}</p>
        </div>
      </div>
    )
  }
}
