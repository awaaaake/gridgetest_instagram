import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import cake from "../../images/cake.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDataState } from "../../recoil/userDataState";
import { kakaoLoginCodeState } from '../../recoil/authState'; // authState 파일 임포트

import axios from "axios";

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

const CakeWrapper = styled.div`
  width: 238px;
  height: 170px;
  margin: 30px 30px 10px 30px;
`;

const AddBirthday = styled.p`
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  color: black;
`;

const NotInPublicProfile = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #7F7F7F;
  text-align: center;
  margin: 0 0 8px 0;
`;

const WhyBirthdayRequired = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #2E90FA;
  text-align: center;
  margin: 0;
`;

const BirthdateRequired = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
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
  justify-content: center;
  gap: 8px;
  width: 320px;
  position: relative;
  border: none;
  background-color: white;
  margin: 20px 0 10px;
`;

const DateSelect = styled.select`
  padding: 10px 14px;
  border: 1px solid #7F7F7F;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #7F7F7F;
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
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
`;

const BackBtn = styled.button`
  cursor: pointer;
  width: 320px;
  height: 44px;
  border: 0;
  border-radius: 30px;
  color: #2E90FA;
  background-color: white;
  margin-bottom: 8%;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
`;

function Step2 () {
  const navigate = useNavigate();
  const [isSignupButtonEnabled, setSignupButtonEnabled] = useState(false);
  // Recoil 상태 가져오기
  const kakaoLoginCode = useRecoilValue(kakaoLoginCodeState);
  const [userData, setUserData] = useRecoilState(userDataState);
  const [formData, setFormData] = useState({
    month: '',
    day: '',
    year: '',
  });

  useEffect(() => {
    updateSignupButtonStatus();

    const { month, day, year } = formData;
    const birthDate = `${year}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
    setUserData((prevUserData) => ({
      ...prevUserData,
      birthDate: birthDate,
    }));
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const updateSignupButtonStatus = () => {
    const { month, day, year } = formData;
    const isMonthValid = month;
    const isDayValid = day;
    const isYearValid = year && (Number(year) >= 1919 && Number(year) <= 2015);

    if (isMonthValid && isDayValid && isYearValid) {
      setSignupButtonEnabled(true);
    } else {
      setSignupButtonEnabled(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(kakaoLoginCode){
      try {
        if (isSignupButtonEnabled) {
          const response = await axios.post(`${API_BASE_URL}/app/kakao-sign-up`, {
            accessToken: kakaoLoginCode,
            realName: userData.username,
            loginId: userData.userid,
            birthDate: userData.birthDate,
            phoneNumber: userData.usercontact,
          });
          console.log(response);
          if (response.data.code === 1000) {
            navigate('/signup/step3');
          } else {
            console.error('가입에 실패하였습니다. 다시 시도해주세요.');
          }
        }
      } catch (error) {
        console.error('네트워크 오류. 나중에 다시 시도해주세요.');
      }
    } else {
      try {
        if (isSignupButtonEnabled) {
          const response = await axios.post(`${API_BASE_URL}/app/sign-up`, {
              realName: userData.username,
              password: userData.password,
              loginId: userData.userid,
              birthDate: userData.birthDate,
              phoneNumber: userData.usercontact
          });
          console.log(response);
          if (response.data.isSuccess) {
            navigate('/signup/step3');
          } else {
            console.error('가입에 실패하였습니다. 다시 시도해주세요.');
          }
        }
      } catch (error) {
        console.error('네트워크 오류. 나중에 다시 시도해주세요.');
      }
    }  
  };

  useEffect(() => {
    console.log(userData);
  }, [userData])

  return (
    <SignupFormWrapper>
      <CakeWrapper>
        <img src={cake} alt="Cake" />
      </CakeWrapper>
      <AddBirthday>생일추가</AddBirthday>
      <NotInPublicProfile>공개 프로필에 포함되지 않습니다.</NotInPublicProfile>
      <WhyBirthdayRequired>왜 생일 정보를 입력해야 하나요?</WhyBirthdayRequired>
      <InputForm onSubmit={handleSignup}>
        <Signupinput>
          <DateSelect
            name="month"
            value={formData.month}
            onChange={handleInputChange}
          >
            <option value="">월 선택</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}월
              </option>
            ))}
          </DateSelect>
          <DateSelect
            name="day"
            value={formData.day}
            onChange={handleInputChange}
          >
            <option value="">일 선택</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}일
              </option>
            ))}
          </DateSelect>
          <DateSelect
            name="year"
            value={formData.year}
            onChange={handleInputChange}
          >
            <option value="">연도 선택</option>
            {Array.from({ length: 103 }, (_, i) => (
              <option key={i} value={1919 + i}>
                {1919 + i}년
              </option>
            ))}
          </DateSelect>
        </Signupinput>
        {!isSignupButtonEnabled && (
          <BirthdateRequired>태어난 날짜를 입력해야합니다</BirthdateRequired>
        )}
        <div className="signup-btn-wrapper">
          <SignupBtn type="submit" isSignupButtonEnabled={isSignupButtonEnabled}>
            가입
          </SignupBtn>
        </div>
        <div className="signup-btn-wrapper">
          <BackBtn type="button" onClick={() => navigate(-1)}>
            돌아가기
          </BackBtn>
        </div>
      </InputForm>
    </SignupFormWrapper>
  );
};

export default Step2;

