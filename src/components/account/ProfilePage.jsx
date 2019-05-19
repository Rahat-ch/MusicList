import React from 'react';

import Sidebar from '../shared/Sidebar';

export default function ProfilePage(props) {
  const { match } = props;
  return (
    <div>
      <div className="content-container">
        This is the profile page. The profile id is: {match.params.id}
      </div>
      <Sidebar />
    </div>
  );
}
