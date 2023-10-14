import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Googlebadge from "../../images/app-badge-google.png";
import Storebadge from "../../images/app-badge-store.png";

const SignupBackground = styled.div`
  background: #f6f6f6;
  width: 100vw; /* 스크롤바 너비를 뺀 가로 너비 설정 (Windows 기준) */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  margin: 20px 0;  
`;

const SignupPromptWrapper = styled.div`
  width: 400px;
  height: 70px;
  border: 1px solid #cccccc;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  margin-top: 10px;
`;

const SignupPromptMessage = styled.span`
  color: #7f7f7f;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const SignupPromptButton = styled.button`
  color: #2e90fa;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  border: 0;
  padding: 0;
  margin-left: 5px;
  background-color: transparent;
  cursor: pointer;
`;

const AppDownloadMessage = styled.p`
  color: #7f7f7f;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  line-height: 24px;
`;

const AppDownloadWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`;

function Signup () {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <SignupBackground>
      <FormContainer>
        <Outlet />
        <SignupPromptWrapper>
          <SignupPromptMessage>계정이 있으신가요?</SignupPromptMessage>
          <SignupPromptButton onClick={handleLoginClick} type="button">
            로그인
          </SignupPromptButton>
        </SignupPromptWrapper>
        <AppDownloadMessage>앱을 다운로드 하세요.</AppDownloadMessage>
        <AppDownloadWrapper>
          <div>
            <img src={Googlebadge} alt="Google Play" />
          </div>
          <div>
            <img src={Storebadge} alt="App Store" />
          </div>
        </AppDownloadWrapper>
      </FormContainer>
    </SignupBackground>
  );
};

export default Signup;
