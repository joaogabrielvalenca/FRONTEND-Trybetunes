import React from 'react';
import Header from './Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          <h2>Profile EDIT!</h2>
        </div>
      </>

    );
  }
}

export default ProfileEdit;
