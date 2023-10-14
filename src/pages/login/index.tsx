import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { supportDeviceSize } from "../../components/styles";
import { ReactComponent as Kakao } from "../../assets/kakao-logo.svg";
import { ReactComponent as Mainlogo } from "../../assets/mainlogo.svg";
import { ReactComponent as Mail } from "../../assets/mail.svg";
import { ReactComponent as Lock } from "../../assets/lock.svg";
import homemockup from "../../images/home-mockup.png";
import Googlebadge from "../../images/app-badge-google.png";
import Storebadge from "../../images/app-badge-store.png";
import { useRecoilState } from "recoil"; // Import Recoil hooks
import {jwtState, idState } from "../../recoil/login"
import axios from "axios";

const LoginBackground = styled.div`
  background: #f6f6f6;
  width: 100vw; /* 스크롤바 너비를 뺀 가로 너비 설정 (Windows 기준) */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  // @media all and (max-width: ${supportDeviceSize}px) {
  //   width: 100vw;
  // }
  margin: 20px 0;  
`;

const LoginFormWrapper = styled.div`
width: 400px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border: 1px solid #CCCCCC;
background-color: white;
`

const PhoneContainer = styled.div`
  background-color: transparent;
  width: 400px;
  height: 600px;
  margin-bottom: 12px;
  margin-right: 32px;

  @media screen and (max-width: 870px) {
    display: none;
}
`;

const PhoneImage = styled.img`
  width: 100%;
  height: 100%;
`;

const MainlogoWrapper = styled.div`
  margin: 30px;
`;

const InputForm = styled.form`
  border: 0;
  display: flex;
  flex-direction: column;
  font: inherit;
  font-size: 100%;
  margin: 0;
  padding: 0;
  vertical-align: baseline;
`;

const LoginInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 292px;
  position: relative;
  border: 1px solid #b2b2b2;
  border-radius: 30px;
  background-color: white;
  padding: 10px 14px;
`;

const LoginInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const LoginInputField = styled.input`
  border: none;
  padding: 0;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  outline: none;
`;

const LoginInputLogoWrapper = styled.span``;

const ShowPasswordToggle = styled.span`
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;
  cursor: pointer;
`;

const LoginErrorMessage = styled.p`
  width: 320px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #f04438;
  margin-bottom: 0;
  text-align: center;
`;

const LoginButton = styled.button<{ isLoginButtonEnabled: boolean }>`
  cursor: pointer;  
  width: 320px;
  height: 44px;
  border: 0;
  border-radius: 30px;
  color: white;
  background-color: ${(props) => (props.isLoginButtonEnabled ? "#2E90FA" : "#b2ddff")};
  margin-top: 8px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
`;

const KakaoLoginButton = styled.button`
  cursor: pointer;  
  width: 320px;
  height: 44px;
  border: 0;
  border-radius: 30px;
  color: #2f1b1a;
  background-color: #f8d706;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const KakaoLogoWrapper = styled.div`
  width: 22px;
  height: 22px;
  margin-top: 3px;
`

const ButtonBoundary = styled.p`
  color: #7f7f7f;
  width: 320px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin: 5px 0;
`;

const ErrorMessage = styled.div``;

const ForgotPasswordText = styled.button`
  color: #7f7f7f;
  width: 320px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  margin: 15px 0;
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

function Login() {
  const API_BASE_URL = 'https://api.gridge-test.com';
  const navigate = useNavigate();
  const [showPswd, setShowPswd] = useState(false);
  const [isLoginButtonEnabled, setLoginButtonEnabled] = useState(false);
  const [LoginError, setLoginError] = useState(false);
  const [UserError, setUserError] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [id, setId] = useRecoilState(idState);
  const [jwt, setJwt] = useRecoilState(jwtState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const truncatedValue = value.slice(0, 20);
    setFormData({
      ...formData,
      [name]: truncatedValue,
    });

    setUserError(false);
    setLoginError(false);
    updateSignupButtonStatus();
  };

  const autologin = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/app/auto-sign-in`, {
        headers: {
          'x-access-token': `${localStorage.getItem('token')}`, 
        },
      });
  
      console.log('자동로그인 결과: ', response.data);
      if (response.data.code === 1001) {
        navigate('/');
      }
    } catch (error) {
      console.log('자동 로그인 중 에러: ', error);
    }
  };
  
  

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼제출 방지
    try {
      if (isLoginButtonEnabled) {
        const response = await axios.post(`${API_BASE_URL}/app/sign-in`, {
          loginId: formData.username,
          password: formData.password
        });
        console.log(response);
        if (response.data.isSuccess) {
          setId(response.data.result.loginId);
          setJwt(response.data.result.jwt);
          localStorage.clear()
          localStorage.setItem('id', response.data.result.loginId);
          localStorage.setItem('token', response.data.result.jwt);
          console.log('정보',id, jwt);
          autologin();
        } else if(response.data.code===2232) {
          setUserError(true);
          setLoginButtonEnabled(false);
        } else if(response.data.code===2233) {
          setLoginError(true);
          setLoginButtonEnabled(false);
        } else {
          setLoginButtonEnabled(false);
          console.error('로그인에 실패하였습니다. 다시 시도해주세요.');
        }
      }
    } catch (error) {
      console.error('네트워크 오류. 나중에 다시 시도해주세요.');
    }
  };

  const updateSignupButtonStatus = () => {
    if (formData.username && formData.password.length >= 6) {
      setLoginButtonEnabled(true);
    } else {
      setLoginButtonEnabled(false);
    }

    { console.log('로그인', isLoginButtonEnabled) };

  };

  const handleSignUpClick = () => {
    navigate('/signup/step1');
  };

  const handleKakaoLogin = () => {
    const Rest_api_key=process.env.REACT_APP_REST_API_KEY //REST API KEY
    const redirect_uri =process.env.REACT_APP_REDIRECT_URI //Redirect URI
    //oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    window.location.href = kakaoURL;
  }

  return (
    <LoginBackground>
      <PhoneContainer>
        <PhoneImage src={homemockup} alt="home-mockup" />
      </PhoneContainer>
      <FormContainer>
        <LoginFormWrapper>
          <MainlogoWrapper>
            <Mainlogo width="217" height="80" />
          </MainlogoWrapper>
          <InputForm onSubmit={handleLogin}>
            <LoginInput style={{ marginBottom: "10px" }}>
              <LoginInputLogoWrapper>
                <Mail width="20" height="20" />
              </LoginInputLogoWrapper>
              <LoginInputWrapper>
                <LoginInputField
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="전화번호, 사용자 이름 또는 이메일"
                  required
                />
              </LoginInputWrapper>
            </LoginInput>
            <LoginInput>
              <LoginInputLogoWrapper>
                <Lock width="20" height="20" />
              </LoginInputLogoWrapper>
              <LoginInputWrapper>
                <LoginInputField
                  type={showPswd ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="비밀번호"
                  required
                />
                {formData.password.length > 0 && (
                  <ShowPasswordToggle onClick={() => setShowPswd(!showPswd)}>
                    {showPswd ? "숨기기" : "비밀번호 표시"}
                  </ShowPasswordToggle>
                )}
              </LoginInputWrapper>
            </LoginInput>
            <div className="login-btn-wrapper">
              <LoginButton type="submit" isLoginButtonEnabled={isLoginButtonEnabled}>로그인</LoginButton>
            </div>
            <ButtonBoundary>or</ButtonBoundary>
            <div className="login-btn-wrapper">
              <KakaoLoginButton type="button" onClick={handleKakaoLogin}>
                <KakaoLogoWrapper>
                  <Kakao width="18" height="18" />
                </KakaoLogoWrapper>
                <span>카카오로 로그인</span>
              </KakaoLoginButton>
            </div>
          </InputForm>
          {LoginError ? (
            <LoginErrorMessage>
              잘못된 비밀번호입니다. 다시 확인하세요.
            </LoginErrorMessage>
          ) : null}
          {UserError ? (
            <LoginErrorMessage>
              입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다.
              사용자 이름을 확인하고 다시 시도하세요.
            </LoginErrorMessage>
          ) : null}
          <ErrorMessage>
            {/* {errorMessage && <p>{errorMessage}</p>} */}
            <ForgotPasswordText type="button">
              비밀번호를 잊으셨나요?
            </ForgotPasswordText>
          </ErrorMessage>
        </LoginFormWrapper>
        <SignupPromptWrapper>
          <SignupPromptMessage>계정이 없으신가요?</SignupPromptMessage>
          <SignupPromptButton onClick={handleSignUpClick} type="button">
            가입하기
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
    </LoginBackground>
  );
};

export default Login;



