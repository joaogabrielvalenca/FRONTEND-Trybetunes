import { Route, Switch } from 'react-router-dom';
import Favorites from './Pages/Favorites';
import Login from './Pages/Login';
import Search from './Pages/Search';
import Album from './Pages/Album';
import Profile from './Pages/Profile';
import ProfileEdit from './Pages/ProfileEdit';
import NotFound from './Pages/NotFound';

function Routes() {
  return (
    <Switch>
      <Route path="/favorites" component={ Favorites } />
      <Route path="/search" component={ Search } />
      <Route path="/album/:id" component={ Album } />
      <Route path="/profile/edit" component={ ProfileEdit } />
      <Route path="/profile" component={ Profile } />
      <Route exact path="/" component={ Login } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default Routes;
