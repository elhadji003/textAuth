"use client";
import React, { useState } from "react";
import Image from "next/image";
import iconRed from "../assets/icon.png";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Form,
  StyledButton,
  StyledCheckboxContainer,
  StyledCheckboxInput,
  StyledCheckboxText,
  StyledContainer,
  StyledFrm,
  StyledFrmInput,
  StyledFrmLabel,
  StyledIcon,
  StyledInfo,
  StyledInput,
  StyledLogoContainer,
  StyledSignupLien,
  StyledText,
} from "../../styles/Connexion.Style"; // Ensure these components exist
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // Ajoutez cet état
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error(
        "Tous les champs sont obligatoires et les conditions doivent être acceptées !"
      );
      return;
    }

    if (!termsAccepted) {
      return toast.error(
        "Vous devez accepter les termes et la politique pour vous inscrire"
      );
    }

    try {
      const res = await axios.post(
        "https://textauthapi-1.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      toast.success("Utilisateur enregistré avec succès");
      router.push("/homePage");
    } catch (err) {
      if (err.response && err.response.data) {
        console.error(err.response.data);
      } else {
        console.error(err);
      }
      toast.error("Cet email existe déjà");
    }
  };

  return (
    <StyledContainer>
      <StyledLogoContainer>
        <StyledIcon>
          <Image src={iconRed} alt="logo Red" />
        </StyledIcon>
        <StyledText>Red Product</StyledText>
      </StyledLogoContainer>
      <Form>
        <StyledFrm onSubmit={onSubmit}>
          <StyledInfo>Inscrivez-vous en tant qu'admin</StyledInfo>
          <StyledFrmInput>
            <StyledFrmLabel htmlFor="name">Prénom</StyledFrmLabel>
            <StyledInput
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </StyledFrmInput>
          <StyledFrmInput>
            <StyledFrmLabel htmlFor="email">Email</StyledFrmLabel>
            <StyledInput
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </StyledFrmInput>
          <StyledFrmInput>
            <StyledFrmLabel htmlFor="password">Mot de passe</StyledFrmLabel>
            <StyledInput
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </StyledFrmInput>
          <StyledCheckboxContainer>
            <StyledCheckboxInput
              name="checkbox"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <StyledCheckboxText>
              Accepter les termes et la politique
            </StyledCheckboxText>
          </StyledCheckboxContainer>
          <StyledButton type="submit">Inscription</StyledButton>
        </StyledFrm>
      </Form>
      <StyledSignupLien>
        Vous avez déjà un compte? <Link href="/">Se connecter</Link>
      </StyledSignupLien>

      <ToastContainer />
    </StyledContainer>
  );
};

export default Register;
