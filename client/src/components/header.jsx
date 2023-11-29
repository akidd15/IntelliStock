import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="">
      <div className="">
        <div>
          <Link className="" to="/">
            <h1 className="">Intellistock</h1>
          </Link>
          <p className="">Keep track of your inventory</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="" to="/">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="" to="/">
                Login
              </Link>
              <Link className="" to="/">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
