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
        "http://localhost:5000/api/hotels",
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
        <div className="animate__animated animate__bounce animate__fadeIn">
          <div className="container">
            <div className="card">
              <div className="header">
                <button onClick={handleClose}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h3 className="title">Créer un nouveau hôtel</h3>
              </div>
              <form onSubmit={handleSubmit} className="hotel-form">
                <div className="flex-input">
                  <div className="formGrp">
                    <div className="form-group">
                      <label htmlFor="hotel-name">Nom de l'hôtel</label>
                      <input
                        id="hotel-name"
                        type="text"
                        name="nameHotel"
                        placeholder="CAP Marniane"
                        value={formData.nameHotel}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="price">Prix par nuit</label>
                      <input
                        id="price"
                        type="text"
                        name="price"
                        placeholder="125.000 XOF"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="formGrp">
                    <div className="form-group">
                      <label htmlFor="address">Adresse</label>
                      <input
                        id="address"
                        type="text"
                        name="address"
                        placeholder="Les îles de ..."
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Numéro de téléphone</label>
                      <input
                        id="phone"
                        type="text"
                        name="number"
                        placeholder="+221 ..."
                        value={formData.number}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="currency">Devise</label>
                      <select
                        id="currency"
                        name="devise"
                        value={formData.devise}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="XOF">F XOF</option>
                        <option value="Euro">Euro</option>
                        <option value="Dollar">$</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="file">Ajouter une photo</label>
                  <label htmlFor="dropzone-file" className="dropzone">
                    {selectedImage ? (
                      <Image
                        src={URL.createObjectURL(selectedImage)}
                        alt="selected-img"
                        width={300}
                        height={200}
                      />
                    ) : (
                      <div className="image-icon">
                        <FontAwesomeIcon icon={faImage} size="3x" />
                      </div>
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      accept="images/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                <div className="flex-end">
                  <button type="submit" className="submit-button">
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default CreerHotel;
