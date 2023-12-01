// import { Link } from 'react-router-dom';

// import Auth from '../utils/auth';

// const Header = () => {
//   const logout = (event) => {
//     event.preventDefault();
//     Auth.logout();
//     window.location.replace('/')
//   };
//   return (
//     <header className="">
//       <div className="">
//         <div>
//           <Link className="" to="/home">
//             <h1 className="">Intellistock</h1>
//           </Link>
//           <p className="">Keep track of your inventory</p>
//         </div>
//         <div>
//           {Auth.loggedIn() ? (
//             <>
//               <Link className="" to="/">
//                 {Auth.getProfile().data.username}'s profile
//               </Link>
//               <button className="" onClick={logout}>
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link className="" to="/">
//                 Login
//               </Link>
//               <Link className="" to="/">
//                 Signup
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.replace('/');
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1em' }}>
      <div>
        <Link to="/home">
          <h1 style={{ margin: 0 }}>Intellistock</h1>
        </Link>
      </div>
      <div style={{ textAlign: 'center', flex: 1, paddingLeft: '60px' }}>
        <p>Keep track of your inventory</p>
      </div>
      <div>
        {Auth.loggedIn() && (
          <Link to="/home" style={{ marginRight: '10px' }}>
            {Auth.getProfile().data.username}'s profile
          </Link>
        )}
        {Auth.loggedIn() && (
          <Button icon color="green" onClick={logout} size="mini">
            <Icon name="log out" />
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;


