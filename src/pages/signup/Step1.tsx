import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Kakao } from "../../assets/kakao-logo.svg";
import { ReactComponent as Mainlogo } from "../../assets/mainlogo.svg";
import { ReactComponent as Mail } from "../../assets/mail.svg";
import { ReactComponent as Lock } from "../../assets/lock.svg";
import { ReactComponent as Settings } from "../../assets/setting.svg";
import { ReactComponent as User } from "../../assets/username.svg";
import { ReactComponent as X } from "../../assets/x-circle.svg";
import { ReactComponent as O } from "../../assets/o-circle.svg";
import { isValidPhoneNumber } from "../../utils/utility";
import { userDataState } from "../../recoil/userDataState";
import { kakaoLoginCodeState } from '../../recoil/authState'; // authState 파일 임포트
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";

const API_BASE_URL = 'https://api.gridge-test.com';

const SignupFormWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #CCCCCC;
  background-color: white;
`;

const MainlogoWrapper = styled.div`
  margin: 30px 30px 10px 30px;
`;

const SignupHeaderText = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #7F7F7F;
  margin-bottom: 20px;
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

const Signupinput = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 292px;
  position: relative;
  border: 1px solid #B2B2B2;
  border-radius: 30px;
  background-color: white;
  padding: 10px 14px;
  margin-Bottom: 10px;
`;

const SignupInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  input {
    border: none;
    padding: 0;
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    outline: none;
  }
`;

const SignupInputLogoWrapper = styled.div``;

const ShowPasswordToggle = styled.span`
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;
  cursor: pointer;
`;

const SignupBtn = styled.button<{ isSignupButtonEnabled: boolean }>`
  cursor: pointer;  
  width: 320px;
  height: 44px;
  border: 0;
  border-radius: 30px;
  color: white;
  background-color: ${(props) => (props.isSignupButtonEnabled ? "#2E90FA" : "#b2ddff")};
  margin-top: 15px;
  margin-bottom: 8%;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
`;

const KakaoLogoWrapper = styled.div`
  width: 22px;
  height: 22px;
  margin-top: 3px;
`;

const KakaoLoginButton = styled.button`
  cursor: pointer;  
  width: 320px;
  height: 44px;
  border: 0;
  border-radius: 30px;
  color: #2F1B1A;
  background-color: #F8D706;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const ButtonBoundary = styled.p`
  color: #7F7F7F;
  width: 320px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin: 5px 0;
`;

const UserIdError = styled.div`
  width: 320px;
  margin-bottom: 7%;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  text-align: center;
  color: #F04438;
`;

function Step1 () {
  const navigate = useNavigate();
  const [showPswd, setShowPswd] = useState(false);
  const [isSignupButtonEnabled, setSignupButtonEnabled] = useState(false);
  const [isValidPn, setIsValidPn] = useState(false);
  const [isUserIdFormatValid, setIsUserIdFormatValid] = useState(false);
  const [isUserIdDuplicate, setIsUserIdDuplicate] = useState(false);
  const [userData, setUserData] = useRecoilState(userDataState);
  const kakaoLoginCode = useRecoilValue(kakaoLoginCodeState);

  useEffect(() => {
    updateSignupButtonStatus();
  }, [userData]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const truncatedValue = value.slice(0, 20);

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: truncatedValue,
    }));

    if (name === 'usercontact') {
      const result = isValidPhoneNumber(value);
      setIsValidPn(result);
    } else if (name === 'userid') {
      const isValidFormat = /^[a-zA-Z0-9_.]+$/.test(value);
      setIsUserIdFormatValid(isValidFormat);

      try {
        if (isValidFormat) {
          // 서버로 GET 요청 보내기
          const response = await axios.get(`${API_BASE_URL}/app/check-duplicate-login-id`, {
            params: {
              loginId : value, // 사용자 아이디를 파라미터로 전달
            },
          });
          console.log('아이디중복여부',response);
          if (response.data.code === 1000) {
            // 성공하면 중복 아이디가 아님
            setIsUserIdDuplicate(false);
          } else if(response.data.code === 2230) {
            //실패하면 중복 아이디
            setIsUserIdDuplicate(true);
          } else if(response.data.code === 2115) {
            setIsUserIdFormatValid(false);
          } else {
            setSignupButtonEnabled(false); //그외의 오류들(비번, 생일..등등)
          }
        }
      } catch (error) {
        // 서버 통신 에러 처리
        console.error('서버 통신 에러:', error);
      }
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(isSignupButtonEnabled) {
      navigate('/signup/step2')
    }
  };

  const updateSignupButtonStatus = () => {
    if (isValidPn
      && userData.username.length > 0
      && userData.userid.length > 0
      && (isUserIdFormatValid && !isUserIdDuplicate)
      //인가코드가 있는경우 password체크할필요x
      && (kakaoLoginCode || (!kakaoLoginCode && userData.password.length >= 6))) {
      setSignupButtonEnabled(true);
    } else {
      setSignupButtonEnabled(false);
    }
  };

  const handleKakaoLogin = () => {
    const Rest_api_key=process.env.REACT_APP_REST_API_KEY //REST API KEY
    const redirect_uri =process.env.REACT_APP_REDIRECT_URI //Redirect URI
    //oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    window.location.href = kakaoURL;
  }

  return (
    <SignupFormWrapper>
      <MainlogoWrapper>
        <Mainlogo width="217" height="80"></Mainlogo>
      </MainlogoWrapper>
      <SignupHeaderText>친구들과 함께 여행 이야기를 공유하고 보세요.</SignupHeaderText>
      <InputForm onSubmit={handleSignup}>
        <div className="login-btn-wrapper">
          <KakaoLoginButton type="button" onClick={handleKakaoLogin}>
            <KakaoLogoWrapper>
              <Kakao width="18" height="18"></Kakao>
            </KakaoLogoWrapper>
            <span>카카오로 로그인</span>
          </KakaoLoginButton>
        </div>
        <ButtonBoundary>or</ButtonBoundary>
        <Signupinput>
          <SignupInputLogoWrapper>
            <Mail width="20" height="20"></Mail>
          </SignupInputLogoWrapper>
          <SignupInputWrapper>
            <input
              type="text"
              name="usercontact"
              id="usercontact"
              value={userData.usercontact}
              onChange={handleInputChange}
              placeholder="휴대폰 번호 또는 이메일 주소"
              required
            />
            <span className="validationStatus">
              {isValidPn ? <O width="24" height="24"></O> : <X width="24" height="24"></X>}
            </span>
          </SignupInputWrapper>
        </Signupinput>
        <Signupinput>
          <span className="SignupInputLogoWrapper">
            <User width="20" height="20"></User>
          </span>
          <SignupInputWrapper>
            <input
              type="text"
              name="username"
              id="username"
              value={userData.username}
              onChange={handleInputChange}
              placeholder="성명"
              required
            />
            <span className="validationStatus">
              {userData.username.length > 0 ? <O width="24" height="24"></O> : <X width="24" height="24"></X>}
            </span>
          </SignupInputWrapper>
        </Signupinput>
        <Signupinput>
          <span className="SignupInputLogoWrapper">
            <Settings width="20" height="20"></Settings>
          </span>
          <SignupInputWrapper>
            <input
              type="text"
              name="userid"
              id="userid"
              value={userData.userid}
              onChange={handleInputChange}
              placeholder="사용자 이름"
              required
            />
            <span className="validationStatus">
              {userData.userid.length > 0 && isUserIdFormatValid && !isUserIdDuplicate ? (
                <O width="24" height="24"></O>
              ) : (
                <X width="24" height="24"></X>
              )}
            </span>
          </SignupInputWrapper>
        </Signupinput>
        <Signupinput>
          <span className="SignupInputLogoWrapper">
            <Lock width="20" height="20"></Lock>
          </span>
          <SignupInputWrapper>
            <input
              type={showPswd ? "text" : "password"}
              name="password"
              id="password"
              value={userData.password}
              onChange={handleInputChange}
              placeholder="비밀번호"
              required
              readOnly={Boolean(kakaoLoginCode)}
            />
            <span className="validationStatus">
              {userData.password.length >= 6 ? <O width="24" height="24"></O> : <X width="24" height="24"></X>}
            </span>
            {userData.password.length > 0 && (
              <ShowPasswordToggle onClick={() => setShowPswd(!showPswd)}>
                {showPswd ? "숨기기" : "비밀번호 표시"}
              </ShowPasswordToggle>
            )}
          </SignupInputWrapper>
        </Signupinput>
        <div className="signup-btn-wrapper">
          <SignupBtn type="submit" isSignupButtonEnabled={isSignupButtonEnabled}>가입</SignupBtn>
        </div>
        {(userData.userid.length > 0 && !isUserIdFormatValid) && <UserIdError>사용자 이름에는 문자, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.</UserIdError>}
        {(userData.userid.length > 0 &&isUserIdDuplicate) && <UserIdError>사용할 수 없는 사용자 이름입니다. 다른 이름을 사용하세요.</UserIdError>}
      </InputForm>
    </SignupFormWrapper>
  );
};

export default Step1;

