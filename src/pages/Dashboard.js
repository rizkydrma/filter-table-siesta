import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../firebase';
import Button from '../elements/Button/Button';

function Dashboard() {
  const [user] = useAuthState(auth);
  const [data, setData] = useState(localStorage.getItem('user'));
  const navigate = useNavigate();

  const isLogout = () => {
    logout();
    setData(null);
  };

  useEffect(() => {
    if (user == null && data == null) {
      return navigate('/');
    }
  }, [user, data, navigate]);

  return (
    <div className="dashboard">
      <h2 className="success">Berhasil Login</h2>
      <h1 className="text-lg success">{user ? user.email : data}</h1>
      <Button className="btn btn-secondary" isLarge onClick={isLogout}>
        Logout
      </Button>
      <Button
        type="link"
        to="/daftar-hadir"
        className="btn btn-secondary"
        isLarge
      >
        Daftar Hadir
      </Button>
    </div>
  );
}
export default Dashboard;
