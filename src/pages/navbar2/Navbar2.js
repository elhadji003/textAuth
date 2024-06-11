"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileAdmin from "../../app/assets/pro.png";

import {
  Navbar2Container,
  Navbar2Nav,
  Title2Container,
  Title2,
  Toolbar2,
  BellIcon2,
  Profile2Image,
  Logout2Icon,
  ProfileAdminImage,
  Navbar2Div1,
  Navbar2Div2,
  Flex2Container,
  Search2Container,
  Search2Input,
} from "../../styles/Navbar2.Style";
import { IconButton } from "../../styles/Navabar.Style";

const Navbar2 = () => {
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

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profileImageUrl");
    setUser(null);
    router.push("/");
  };

  return (
    <>
      <Navbar2Container>
        <Navbar2Nav>
          <Navbar2Div1>
            <Navbar2Div2>
              <Title2Container>
                <Flex2Container>
                  <Title2 aria-current="page">Dashboard</Title2>
                </Flex2Container>
              </Title2Container>
              <Toolbar2>
                <Search2Container>
                  <Search2Input type="text" placeholder="🔎 rechercher" />
                </Search2Container>
                <BellIcon2>
                  <Link href="/notification">
                    <FontAwesomeIcon icon={faBell} color="black" />
                  </Link>
                </BellIcon2>
                <Profile2Image>
                  <ProfileAdminImage
                    src={ProfileAdmin}
                    alt="Profile Admin"
                    width={40}
                    height={40}
                  />
                </Profile2Image>
                <Logout2Icon>
                  <IconButton onClick={logout}>
                    <FontAwesomeIcon icon={faRightToBracket} color="black" />
                  </IconButton>
                </Logout2Icon>
              </Toolbar2>
            </Navbar2Div2>
          </Navbar2Div1>
        </Navbar2Nav>
      </Navbar2Container>
    </>
  );
};

export default Navbar2;
