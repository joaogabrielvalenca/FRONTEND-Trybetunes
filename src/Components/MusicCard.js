import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

// {
//   artistId: 12,
//   artistName: "Artist Name",
//   collectionId: 123,
//   collectionName: "Collection Name",
//   collectionPrice: 12.25,
//   artworkUrl100: "https://url-to-image",
//   releaseDate: "2012-03-02T08:00:00Z",
//   trackCount: 8,
// }

class MusicCard extends React.Component {
  state = {
    favorites: [],
  };

  // componentDidUpdate() {
  //   console.log(this.state.favorites);
  // }

  handleFavorite = async (event) => {
    const { favorites } = this.state;
    const { data } = this.props;
    let list = [...favorites];
    await addSong(data);
    if (event.target.checked) {
      list = [...favorites, data];
    }
    this.setState({
      favorites: list,
    });
  };

  render() {
    const { trackName, artistName, albumName, previewURL, trackId } = this.props;
    return (
      <div style={ { border: '1px solid red' } }>
        <h2>{ trackName }</h2>
        <h4>
          Artist Name:
          {' '}
          { artistName }
        </h4>
        <h4>{ albumName }</h4>
        <audio data-testid="audio-component" src={ previewURL } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor="favoriteCheckbox">
          Favorita
          <input
            type="checkbox"
            onClick={ this.handleFavorite }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  previewURL: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,

};

export default MusicCard;
