'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import axios from 'axios';
import '../connexion/connexion.scss'
import iconRed from "../assets/icon.png";
import Image from 'next/image';

const MdpOublier = () => {
 
  const router = useRouter();

  const [values, setValues] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  

  return (
    <div className="Connexion">
        <div className='header'>
          <div><Image src={iconRed} alt="logo" /></div>
          <div>Red Product</div>
        </div>
        <div className="connexion-box">
          <div className='title'>
            <div>Mot de passe oublier ?</div>
          </div>
          <div className='info'>
                <span>
                Entrez votre adresse e-mail ci-dessous <br />
                et nous vous enverrons des instructions <br />
                sur la façon de modifier votre mot de passe. 
                </span>
          </div>
          <form>

            <div className='box-input'>
                <div className="input">
                  <label>Email</label>
                <input type="email" name='email' value={values.email} onChange={handleChange} />
                </div>
            </div>
            
            <div className="btn-con">
             <button className='btn-connexion' type="submit">Envoyer</button>
            </div>
          </form>
        </div>
        <ToastContainer />
    </div>
  );
};

export default MdpOublier;
