"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RiDashboardFill } from "react-icons/ri";
import { FaDesktop } from "react-icons/fa6";
import {
  faChevronLeft,
  faChevronRight,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import iconRed from "../../app/assets/icon.png";
import {
  Div1,
  Div2,
  Div3,
  Div4,
  List,
  ListLi,
  Onligne,
  OnligneFlex,
  ProfileBas,
  ProfileBasMere,
  ProfileName,
  ProfileTextBas,
  RedProductTitle,
  SidebarContainer,
  SidebarContainer2,
  SidebarHeader,
  SidebarList,
  SignOut,
  StyledSidebarNav,
  ToggleButton,
  ToggleWrapper,
} from "../../styles/Sidebar.Style";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileAdmin from "../../app/assets/user-profile.jpg";
import { IconButton, ProfileImage } from "../../styles/Navabar.Style";
import { useRouter } from "next/navigation";
import axios from "axios";

const Sidebar = () => {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [chevron, setChevron] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [upload, setUpload] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userRes = await axios.get("http://localhost:5000/api/auth/me", {
            headers: {
              "x-auth-token": token,
            },
          });
          setUser(userRes.data);
          console.log(userRes);
          const storedProfileImageUrl = localStorage.getItem("profileImageUrl");
          if (storedProfileImageUrl) {
            setUser((prevUser) => ({
              ...prevUser,
              profileImageUrl: storedProfileImageUrl,
            }));
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchUserData();
  }, [router]);

  const toggleSidebar = () => {
    setSidebarActive(!isSidebarActive);
    setChevron(!chevron);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  const handleProfileImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    setUpload(null);

    const formData = new FormData();
    formData.append("profileImage", selectedImage);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/auth/uploadProfileImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );
      setUser((prevUser) => ({
        ...prevUser,
        profileImageUrl: res.data.profileImageUrl,
      }));
      localStorage.setItem("profileImageUrl", res.data.profileImageUrl);
      setSelectedImage(null);
      setUpload(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSeeInput = () => {
    setUpload(!upload);
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <StyledSidebarNav className={`${isSidebarActive ? "active" : ""}`}>
          <Div1>
            <Div2>
              <Div3>
                <Image src={iconRed} alt="logo Red" />
              </Div3>
              <RedProductTitle>Red Product</RedProductTitle>
              <ToggleWrapper>
                <ToggleButton onClick={toggleSidebar}>
                  <FontAwesomeIcon
                    icon={chevron ? faChevronLeft : faChevronRight}
                    size="2x"
                    color={chevron ? "white" : "black"}
                    style={{ right: "1rem", marginLeft: chevron ? 0 : "1rem" }}
                  />
                </ToggleButton>
              </ToggleWrapper>
            </Div2>
          </Div1>
          <SidebarContainer2>
            <SidebarList>
              <List>
                <Div4>Principale</Div4>
              </List>
              <ListLi>
                <Link href="/dashboard">
                  <RiDashboardFill size={25} />
                  Dashboard
                </Link>
              </ListLi>
              <ListLi>
                <Link href="/cardHotel">
                  <FaDesktop size={25} />
                  Listes des Hotels
                </Link>
              </ListLi>
              <ProfileBasMere>
                <ProfileBas>
                  <ProfileImage onClick={handleSeeInput}>
                    <ProfileImage onClick={handleSeeInput}>
                      {selectedImage ? (
                        <Image
                          src={URL.createObjectURL(selectedImage)}
                          alt="Profile Admin"
                          width={40}
                          height={40}
                        />
                      ) : (
                        <Image
                          src={(user && user.profileImageUrl) || ProfileAdmin}
                          alt="Profile Admin"
                          width={40}
                          height={40}
                        />
                      )}
                    </ProfileImage>
                  </ProfileImage>
                  <ProfileTextBas>
                    <ProfileName>
                      {user && user.name}
                      <OnligneFlex>
                        <Onligne></Onligne> en ligne
                      </OnligneFlex>
                    </ProfileName>
                  </ProfileTextBas>
                </ProfileBas>

                {upload && (
                  <div className="uploads">
                    <input
                      className="form-control"
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                    />
                    <button onClick={handleImageUpload}>Upload</button>
                  </div>
                )}

                <SignOut onClick={logout}>
                  <IconButton>
                    <FontAwesomeIcon
                      icon={faRightToBracket}
                      color="white"
                      size="2x"
                    />
                  </IconButton>
                </SignOut>
              </ProfileBasMere>
            </SidebarList>
          </SidebarContainer2>
        </StyledSidebarNav>
      </SidebarHeader>
    </SidebarContainer>
  );
};

export default Sidebar;
