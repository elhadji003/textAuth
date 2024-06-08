'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('http://localhost:5000/api/auth/me', {
            headers: {
              'x-auth-token': token,
            },
          });
          setUser(res.data);
        } else {
          console.log(error);
        }
      } catch (err) {
        console.error(err.response);
      }
    };

    fetchUserData();
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  if (!user) {
    return <div>Loading...
      Votre session a expiré veuilliez-vous reconnectez !
      <Link href={'/'}>Je me connect</Link>
    </div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
