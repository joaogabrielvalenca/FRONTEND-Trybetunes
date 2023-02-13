import React from 'react';
import Header from './Header';

class Favorites extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          <h2>FAVORITES!</h2>
        </div>
      </>
    );
  }
}

export default Favorites;
