import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

import Auth from '../utils/auth';
import HeaderLogo from '../assets/images/intelliStock-word_logo.png'

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.replace('/');
  };

  return (
    <header style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1em' }}>

      {Auth.loggedIn() ? (
        <div>
          <Link to="/home">
            {/* <h1 style={{ margin: 0, paddingRight: '10px', paddingTop: '5px' }}>IntelliStock</h1> */}
            <img src={HeaderLogo} width="270px" height="75px"></img>
          </Link>
          <p style={{ marginLeft: '60px', marginTop: '-15px', fontWeight: 'bolder' }}><i>Keep track of your inventory</i></p>
        </div>
      ) : (
        <div>
          {/* <h1 style={{ margin: 0, paddingRight: '10px', paddingTop: '5px' }}>IntelliStock</h1> */}
          <img src={HeaderLogo} width="270px" height="75px"></img>
          <p style={{ marginLeft: '60px', marginTop: '-15px', fontWeight: 'bolder' }}><i>Keep track of your inventory</i></p>
        </div>
      )}


      <div>
        {Auth.loggedIn() && (
          <Link to="/home" style={{ marginRight: '10px' }}>
            Signed in, {Auth.getProfile().data.username}
          </Link>
        )}
        {Auth.loggedIn() && (
          <Button color="red" onClick={logout} size="small">
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;


