'use client'
import { useState } from 'react';
import axios from 'axios';
import iconRed from "../assets/icon.png";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './inscription.scss'
import Image from 'next/image';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false); // Ajoutez cet état
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();


    if (!name || !email || !password) {
      toast.error('Tous les champs sont obligatoires et les conditions doivent être acceptées !');
      return;
    }

    if (!termsAccepted) {
      return toast.error('Vous devez accepter les termes et la politique pour vous inscrire');
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      toast.success('Utilisateur enregistré avec succès');
      router.push('/dashboard');
    } catch (err) {
      console.error(err.response.data);
      toast.error('Cet email existe déjà');
    }
  };

  return (
    <div className="Inscription">
      <div className='header'>
        <div><Image src={iconRed} alt="logo" /></div>
        <div>Red Product</div>
      </div>
      <div className="connexion-box">
        <div className='title'>
          <div>Inscrivez-vous en tant qu'admin</div>
        </div>
        <form onSubmit={onSubmit}>
          <div className='box-input'>
            <div className="input">
              <label>Prénom(s) et Nom</label>
              <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className='box-input'>
            <div className="input">
              <label>Email</label>
              <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className='box-input'>
            <div className="input">
              <label>Password</label>
              <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className='box-input'>
            <div className="check">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span>Accepter les termes et la politique</span>
            </div>
          </div>
          <div className="btn-con">
            <button className='btn-connexion' type="submit">S'inscrire</button>
          </div>
        </form>
      </div>
      <div className="footer-con">
        <div className="inscrire">
          <span>Vous avez déjà un compte ?</span>
          <Link href={'/connexion'}> Se connecter</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
