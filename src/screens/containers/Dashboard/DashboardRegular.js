import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function DashboardRegular() {
  const Button = styled.button`
    background-color: #1968ff;
    color: white;
    font-size: 14px;
    padding: 10px 80px;
    outline: none;
    border: none;
    border-radius: 4px;
    width: 40%;
    cursor: pointer;
    margin-top: 2.5em;
  `;
  const navigate = useNavigate();
  const moveToSignIn = () => {
    navigate("/sign-in");
    // window.location.href = "./sign-in";
  };
  return (
    <>
      <div className="space-top"></div>
      <div>DashboardRegular</div>
      <Button onClick={moveToSignIn} className="formFieldButton" type="submit">
        Sign In
      </Button>
    </>
  );
}
