import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    login: '',
    disabledButton: true,
    isLoading: false,
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ login: value }, () => this.checkEnabledButton());
  };

  checkEnabledButton = () => {
    const { login } = this.state;
    if (login.length >= Number('3')) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  };

  onRouteChange = () => {
    const { history } = this.props;
    history.push('search');
  };

  saveInputValue = async () => {
    const { login } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: login });
    this.setState({ isLoading: false });
    this.onRouteChange();
    // <Redirect to="/search" />;
  };

  render() {
    const { login, disabledButton, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <input
          data-testid="login-name-input"
          placeholder="3+ caracteres"
          onChange={ this.onInputChange }
          value={ login }
        />
        <button
          data-testid="login-submit-button"
          disabled={ disabledButton }
          onClick={ this.saveInputValue }
        >
          Entrar
        </button>
        {isLoading && <h1>Carregando...</h1>}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default withRouter(Login);
