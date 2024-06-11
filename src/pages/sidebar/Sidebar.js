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
import { Input } from "@/styles/Creer.Style";

const Sidebar = () => {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [chevron, setChevron] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [upload, setUpload] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userRes = await axios.get(
            "https://textauthapi-1.onrender.com/api/auth/me",
            {
              headers: {
                "x-auth-token": token,
              },
            }
          );
          const userData = userRes.data;
          setUser(userData);
          // Stocker les données utilisateur dans le localStorage
          localStorage.setItem("user", JSON.stringify(userData));

          // Récupérer l'URL de l'image de profil depuis le backend
          const profileImageRes = await axios.get(
            `https://textauthapi-1.onrender.com/api/auth/profile/${userData._id}`
          );
          const profileImageUrl = profileImageRes.data.profileImageUrl;
          setUser((prevUser) => ({
            ...prevUser,
            profileImageUrl,
          }));
          localStorage.setItem("profileImageUrl", profileImageUrl);
        } catch (err) {
          console.error(err);
        }
      }
    };

    // Récupérer les données utilisateur depuis le localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      const storedProfileImageUrl = localStorage.getItem("profileImageUrl");
      if (storedProfileImageUrl) {
        setUser((prevUser) => ({
          ...prevUser,
          profileImageUrl: storedProfileImageUrl,
        }));
      } else {
        fetchUserData();
      }
    } else {
      fetchUserData();
    }
  }, [router]);

  const toggleSidebar = () => {
    setSidebarActive(!isSidebarActive);
    setChevron(!chevron);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profileImageUrl");
    setUser(null);
    router.push("/");
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setUpload(true);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    setUpload(null);

    const formData = new FormData();
    formData.append("profileImage", selectedImage);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://textauthapi-1.onrender.com/api/auth/updateProfileImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );
      const profileImageUrl = res.data.profileImageUrl;
      setUser((prevUser) => ({
        ...prevUser,
        profileImageUrl,
      }));
      localStorage.setItem("profileImageUrl", profileImageUrl);
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
                <Link href="/homePage">
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
                    {selectedImage ? (
                      <Image
                        src={URL.createObjectURL(selectedImage)}
                        alt="Profile Admin"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <Image
                        src={user?.profileImageUrl || ProfileAdmin}
                        alt="Profile Admin"
                        width={40}
                        height={40}
                      />
                    )}
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
                    <Input
                      id="dropzone-file"
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
