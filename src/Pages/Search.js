import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';

class Search extends React.Component {
  state = {
    searchInput: '',
    disabledButton: true,
    artist: '',
    albumList: [],
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ searchInput: value }, () => this.checkEnabledButton());
  };

  checkEnabledButton = () => {
    const { searchInput } = this.state;
    if (searchInput.length >= 2) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  };

  onSearch = async () => {
    const { searchInput } = this.state;
    const albumList = await searchAlbumsAPI(searchInput);
    this.setState({ artist: searchInput, searchInput: '', albumList });
    console.log(albumList);
    return albumList;
  };

  render() {
    const { searchInput, disabledButton, artist, albumList } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <h2>Busque o Artista!</h2>
          <input
            data-testid="search-artist-input"
            placeholder="2+ caracteres"
            onChange={ this.onInputChange }
            value={ searchInput }
          />
          <button
            data-testid="search-artist-button"
            disabled={ disabledButton }
            onClick={ this.onSearch }
          >
            Pesquisar
          </button>
          <h3>
            {`Resultado de álbuns de: ${artist}`}
          </h3>
          {albumList.length === 0
            ? 'Nenhum álbum foi encontrado'
            : albumList.map((album) => (
              <li key={ album.artistId }>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  {album.collectionName }
                </Link>
              </li>
            ))}
        </div>
      </>
    );
  }
}

export default Search;
