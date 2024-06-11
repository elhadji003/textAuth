"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "@/pages/sidebar/Sidebar";
import Hotel from "@/pages/hotel/Hotel";
import Link from "next/link";

export default function CardHotel() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  if (!token) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        Loading... Votre session a expiré veuillez vous reconnecter !
        <Link href="/">Je me connecte</Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-md col-lg-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-12 col-lg-10">
          <Hotel />
        </div>
      </div>
    </div>
  );
}
