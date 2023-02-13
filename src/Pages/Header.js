import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    isLoading: false,
    userName: '',
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({ isLoading: false, userName: user.name });
    return user.name;
  };

  render() {
    const { isLoading, userName } = this.state;
    return (
      <div data-testid="header-component">
        { isLoading ? <p>Carregando...</p> : (
          <>
            <h2>header</h2>
            <div>
              <Link data-testid="link-to-search" to="/search">Busca</Link>
            </div>
            <div>
              <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
            </div>
            <div>
              <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
            </div>
            <div data-testid="header-user-name">
              <p>{ userName }</p>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Header;
