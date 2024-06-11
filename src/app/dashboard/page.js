"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [nameHotel, setNameHotel] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userRes = await axios.get(
            "https://textauthapi-1.onrender.com/api/auth/me",
            {
              headers: {
                "x-auth-token": token,
              },
            }
          );
          setUser(userRes.data);

          const textsRes = await axios.get(
            "https://textauthapi-1.onrender.com/api/texts",
            {
              headers: {
                "x-auth-token": token,
              },
            }
          );
          setHotels(textsRes.data);
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
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  const handleCreateText = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://textauthapi-1.onrender.com/api/hotels",
        { nameHotel: nameHotel, email: email, address: address },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setHotels([...hotels, res.data]);
      setNameHotel("");
      setAddress("");
      setEmail("");
    } catch (err) {
      console.error(err.response);
    }
  };

  const handleDeleteText = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://textauthapi-1.onrender.com/api/texts/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setHotels(hotels.filter((text) => text._id !== id));
    } catch (err) {
      console.error(err.response);
    }
  };

  if (!user) {
    return (
      <div>
        Loading... Votre session a expiré veuillez vous reconnecter !
        <Link href={"/"}>Je me connecte</Link>
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
          {hotels.map((hotel) => (
            <li key={hotel._id}>
              {hotel.nameHotel} <span></span>
              {hotel.address} <span></span>
              {hotel.email} <span></span>
              <button onClick={() => handleDeleteText(hotel._id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          name="nameHotel"
          value={nameHotel}
          onChange={(e) => setNameHotel(e.target.value)}
          placeholder="Nouveau texte"
        />
        <input
          type="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button onClick={handleCreateText}>Créer</button>
      </div>
    </div>
  );
};

export default Dashboard;
