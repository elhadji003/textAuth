"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import axios from "axios";
import "./connexion.scss";
import iconRed from "../assets/icon.png";
import Image from "next/image";

const Login = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("token", res.data.token);
      toast.success("Connexion réussie");
      router.push("/homePage");
    } catch (err) {
      console.error(err);
      toast.error(`les informations d'identification sont invalides`);
    }
  };

  return (
    <div className="Connexion">
      <div className="header">
        <div>
          <Image src={iconRed} alt="logo" />
        </div>
        <div>Red Product</div>
      </div>
      <div className="connexion-box">
        <div className="title">
          <div>Connectez vous en tant qu'admin</div>
        </div>
        <form onSubmit={onSubmit}>
          <div className="box-input">
            <div className="input">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="box-input">
            <div className="input">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="box-input">
            <div className="check">
              <input
                type="checkbox"
                id="coding"
                name="interest"
                value="coding"
              />
              <span>Garder moi connecter</span>
            </div>
          </div>

          <div className="btn-con">
            <button className="btn-connexion" type="submit">
              Se Connecter
            </button>
          </div>
        </form>
      </div>
      <div className="footer-con">
        <div className="pwd">
          <Link href={"/mdpoublie"}>Mot de passe oublier ?</Link>
        </div>
        <div className="inscrire">
          <span>Vous n'avez pas de compte ?</span>
          <Link href={"/inscription"}> S'inscrire</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
