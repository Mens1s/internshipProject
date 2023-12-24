import React from "react";
import { Tabs } from "antd";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Register from "./RegisterForm";
import useLanguage from "src/hooks/useLanguage";
import { Text } from "src/context/LanguageProvider";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 300px;
  height: fit-content;
  padding: 30px;
  padding-top: 50px;
  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  position: relative;
`;

const Header = styled.div`
  display: flex; // Make it a flex container
  flex-direction: column; // Stack items vertically
  align-items: center;
  margin: 20px 0 40px 0;
`;

const LogoImage = styled.img`
  width: 200px; // Adjust the size as needed
  margin-bottom: 40px; // Adjust the spacing between the logo and h2
`;

const Flag = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-size: cover;
`;

const items = [
  {
    key: "/ogrenci/register",
    label: "Öğrenci Kayıt",
    render: () => <Register />,
  },
  {
    key: "/akademisyen/register",
    label: "Akademisyen Kayıt",
    render: () => <Register />,
  },
];

const RegisterPage: React.FC = () => {
  const location = useLocation();
  const [activeKey, setActiveKey]: [any, any] = useState(location.pathname);
  const { dictionary } = useLanguage();
  const { userLanguage, userLanguageChange } = useLanguage();
  const [img, setImg] = useState(
    userLanguage === "en" ? "/england_flag.png" : "/turkey_flag.png"
  );

  const handleLanguageChange = () => {
    // Toggle language and update the image source
    userLanguageChange();
    setImg((prevImg) =>
      prevImg === "/england_flag.png" ? "/turkey_flag.png" : "/england_flag.png"
    );
  };
  useEffect(() => {
    window.history.pushState(null, "", `${activeKey}`);
  }, [activeKey]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Header>
        <LogoImage src="/logo.jpg" alt="Logo" />
        <h2>Staj Başvuru Sistemi</h2>
      </Header>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: 20,
            right: 10,
          }}
        >
          <span onClick={handleLanguageChange} style={{ cursor: "pointer" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                width: "80px",
              }}
            >
              <Text tid="langShort" />
              <Flag style={{ backgroundImage: `url(${img})` }} />
            </div>
          </span>
        </div>
        <Tabs
          centered={true}
          activeKey={activeKey}
          tabPosition="top"
          animated={{ inkBar: false, tabPane: false }}
          indicatorSize={(origin) => origin}
          items={items.map((tabItem) => ({
            ...tabItem,
            children: tabItem.render(),
          }))}
          onChange={(key: string) => setActiveKey(key)}
        />
      </Container>
    </div>
  );
};

export default RegisterPage;
