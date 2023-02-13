import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    favorites: [],
    isLoading: false,
    isFavoriteSong: false,
  };

  handleFavorite = async (event) => {
    const { favorites } = this.state;
    const { data } = this.props;
    let list = [...favorites];
    this.setState({ isLoading: true });
    await addSong(data);
    this.setState({ isLoading: false });
    if (event.target.checked) {
      list = [...favorites, data];
    }
    this.setState({
      favorites: list,
      isFavoriteSong: true,
    });
  };

  render() {
    const {
      trackName,
      artistName,
      albumName,
      previewURL,
      trackId,
      isFavorite,
    } = this.props;
    const { isLoading, isFavoriteSong } = this.state;
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
            checked={ isFavoriteSong || isFavorite }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
        {isLoading && <h4>Carregando...</h4>}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  previewURL: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
