import styled from "styled-components";
import { AuthContext } from "../providers/auth";
import React from "react";

export default function Navbar() {
  const {dados} = React.useContext(AuthContext); 
  const {image} = dados;
  return (
    <Topbar>
      <h1>TrackIt</h1>
      <img src={image} alt="User" />
    </Topbar>
  );
}

const Topbar = styled.header`
  position: fixed;
  width: 100%;
  height: 70px;
  padding: 18px;
  left: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  h1 {
    font-family: "Playball", cursive;
    font-style: normal;
    font-weight: 400;
    font-size: 39px;
    line-height: 49px;

    color: #ffffff;
  }

  img {
    width: 51px;
    height: 51px;

    border-radius: 98.5px;
  }
`;
