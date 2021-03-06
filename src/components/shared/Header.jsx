import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  const { username } = props;
  return (
    <header>
      <h1>Music List</h1>
      <div className="user-menu">
        <h2> Welcome { username } </h2>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/account/profile/Rahat">Rahat</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
