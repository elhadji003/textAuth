'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [texts, setTexts] = useState([]);
  const [newText, setNewText] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userRes = await axios.get('http://localhost:5000/api/auth/me', {
            headers: {
              'x-auth-token': token,
            },
          });
          setUser(userRes.data);

          const textsRes = await axios.get('http://localhost:5000/api/texts', {
            headers: {
              'x-auth-token': token,
            },
          });
          setTexts(textsRes.data);
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

  const handleCreateText = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/texts',
        { content: newText },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      setTexts([...texts, res.data]);
      setNewText('');
    } catch (err) {
      console.error(err.response);
    }
  };

  const handleDeleteText = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/texts/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setTexts(texts.filter(text => text._id !== id));
    } catch (err) {
      console.error(err.response);
    }
  };

  if (!user) {
    return (
      <div>
        Loading... Votre session a expiré veuillez vous reconnecter !
        <Link href={'/'}>Je me connecte</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>

      <div>
        <h2>Vos Textes</h2>
        <ul>
          {texts.map(text => (
            <li key={text._id}>
              {text.content}
              <button onClick={() => handleDeleteText(text._id)}>Supprimer</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Nouveau texte"
        />
        <button onClick={handleCreateText}>Créer</button>
      </div>
    </div>
  );
};

export default Dashboard;
