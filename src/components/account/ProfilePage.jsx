import React from 'react';

export default function ProfilePage(props) {
  const { match } = props;
  return (
    <section className="page-content">
      <div className="content-container">
        This is the profile page The profile id is: {match.params.id}.
      </div>
      <aside className="sidebar">
        This is a sidebar
      </aside>
    </section>
  );
}
