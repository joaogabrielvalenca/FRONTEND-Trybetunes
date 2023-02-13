import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import Header from './Header';

class Album extends React.Component {
  state = {
    songList: [],
    artistName: '',
    albumName: '',
    apiData: [],
    isLoading: true,
  };

  componentDidMount() {
    this.fetchMusicsFromAlbum();
  }

  fetchMusicsFromAlbum = async () => {
    const { match } = this.props;
    const { params } = match;
    const musicList = await getMusics(params.id);
    this.setState({ apiData: musicList.slice(1) });
    const musicTrackList = musicList.slice(1).map((music) => (
      { name: music.trackName, previewURL: music.previewUrl, trackId: music.trackId }
    ));
    this.setState({
      songList: musicTrackList,
      artistName: musicList[0].artistName,
      albumName: musicList[0].collectionName,
      isLoading: false,
    });
    return musicList;
  };

  render() {
    const { songList, artistName, albumName, apiData, isLoading } = this.state;
    if (isLoading) return <h1>Carregando...</h1>;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <p data-testid="artist-name">
            {artistName}
          </p>
          <p data-testid="album-name">
            {albumName}
          </p>
          {songList.map((song, index) => (
            <MusicCard
              key={ song.name }
              trackName={ song.name }
              previewURL={ song.previewURL }
              artistName={ artistName }
              albumName={ albumName }
              trackId={ song.id }
              data={ apiData[index] }
            />
          ))}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};

export default withRouter(Album);
