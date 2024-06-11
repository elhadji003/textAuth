"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./creerHotel.scss";
import { faArrowLeft, faImage } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import {
  Container,
  Card,
  Title,
  Header,
  Row,
  FrGr2oup,
  Label,
  Input,
  Select,
  Footer,
  Dropzone,
  StyledFrInput,
  StyledSubmitCreer,
  FlexEnd,
  Form,
  DivImage2,
} from "../../styles/Creer.Style";
import { ButtonModal } from "../../styles/Navbar2.Style";

const CreerHotel = () => {
  const [hotels, setHotels] = useState([]);
  const router = useRouter();
  const [formData, setFormData] = useState({
    nameHotel: "",
    address: "",
    email: "",
    price: "",
    number: "",
    devise: "",
    image: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://textauthapi-1.onrender.com/api/hotels",
        formDataToSend,
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        setFormData({
          nameHotel: "",
          address: "",
          email: "",
          price: "",
          number: "",
          devise: "",
          image: null,
        });

        setHotels([...hotels, res.data]);
        setShowModal(false);
        setSelectedImage(null);
        toast.success("Hotel created successfully!");
        router.push("/cardHotel");
        window.location.reload();
      } else {
        toast.error(
          res.data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Container className="animate__animated animate__bounce animate__fadeIn">
          <Card>
            <Header>
              <ButtonModal onClick={handleClose}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </ButtonModal>
              <Title>Créer un nouveau hôtel</Title>
            </Header>
            <Form onSubmit={handleSubmit}>
              <Row>
                <FrGr2oup>
                  <StyledFrInput>
                    <Label htmlFor="hotel-name">Nom de l'hôtel</Label>
                    <Input
                      id="hotel-name"
                      type="text"
                      name="nameHotel"
                      placeholder="CAP Marniane"
                      value={formData.nameHotel}
                      onChange={handleChange}
                    />
                  </StyledFrInput>
                  <StyledFrInput>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </StyledFrInput>
                  <StyledFrInput>
                    <Label htmlFor="price">Prix par nuit</Label>
                    <Input
                      id="price"
                      type="text"
                      name="price"
                      placeholder="125.000 XOF"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </StyledFrInput>
                </FrGr2oup>
                <FrGr2oup>
                  <StyledFrInput>
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      type="text"
                      name="address"
                      placeholder="Les îles de ..."
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </StyledFrInput>
                  <StyledFrInput>
                    <Label htmlFor="phone">Numéro de téléphone</Label>
                    <Input
                      id="phone"
                      type="text"
                      name="number"
                      placeholder="+221 ..."
                      value={formData.number}
                      onChange={handleChange}
                    />
                  </StyledFrInput>
                  <StyledFrInput>
                    <Label htmlFor="currency">Devise</Label>
                    <Select
                      id="currency"
                      name="devise"
                      value={formData.devise}
                      onChange={handleChange}
                    >
                      <option value="XOF">F XOF</option>
                      <option value="Euro">Euro</option>
                      <option value="Dollar">$</option>
                    </Select>
                  </StyledFrInput>
                </FrGr2oup>
              </Row>
              <Footer>
                <Label htmlFor="file">Ajouter une photo</Label>
                <Dropzone htmlFor="dropzone-file">
                  {selectedImage ? (
                    <Image
                      src={URL.createObjectURL(selectedImage)}
                      alt="selected-img"
                      width={300}
                      height={200}
                    />
                  ) : (
                    <DivImage2>
                      <FontAwesomeIcon icon={faImage} size="3x" />
                    </DivImage2>
                  )}
                  <Input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </Dropzone>
              </Footer>
              <FlexEnd>
                <StyledSubmitCreer type="submit">Enregistrer</StyledSubmitCreer>
              </FlexEnd>
            </Form>
          </Card>
          <ToastContainer />
        </Container>
      )}
    </>
  );
};

export default CreerHotel;
