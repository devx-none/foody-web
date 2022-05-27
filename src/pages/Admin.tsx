import { FC } from 'react';
import { Link } from 'react-router-dom';

const Admin: FC = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <p>You must have an Admin role.</p>
      <br />
      <div>
        <Link to="/">Home</Link>
      </div>
    </section>
  );
}

export default Admin;