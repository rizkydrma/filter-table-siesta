import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../../elements/BrandLogo/BrandLogo';
import './Navbar.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

function Navbar() {
  const [user] = useAuthState(auth);
  const data = localStorage.getItem('user');

  return (
    <div className="navbar">
      <BrandLogo brandname="SiestaID" />
      <nav>
        <ul>
          {!user && !data ? (
            <li>
              <Link to="/" className="nav-link">
                Login
              </Link>
            </li>
          ) : (
            <li>
              <span className="nav-link">{user ? user.email : data}</span>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
