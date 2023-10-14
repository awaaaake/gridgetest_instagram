import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Check } from "../../assets/check.svg";

const SignupFormWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #CCCCCC;
  background-color: white;
`;

const TermsAgree = styled.p`
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: center;
  margin: 30px 0;
`;

const TermsText = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  color: #7F7F7F;
  margin: 0 0 10px 0;
`;

const TermsContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxContainer = styled.div`
  input[type="checkbox"] {
    display: none;
  }

  hr {
    background-color: #CCCCCC;
    margin-top: 10px;
    height: 1px;
    border: none;
  }
`;

const CustomCheckbox = styled.span`
  width: 20px;
  height: 20px;
  background: #EFF8FF;
  border: 1px solid #2E90FA;
  border-radius: 6px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  align-items: center;
`;

const TermsContent = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`;

const LearnMoreButton = styled.button`
  background-color: transparent;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #2E90FA;
  border: none;
  padding: 0;
`;

const SignupBtn = styled.button<{ isTermsAgreed: boolean, isUseAgreed: boolean, isDataPolicyAgreed: boolean, isLocationAgreed: boolean }>`
  cursor: pointer;  
  width: 320px;
  height: 44px;
  border: 0;
  border-radius: 30px;
  color: white;
  background-color: ${(props) => (props.isTermsAgreed || (props.isUseAgreed && props.isDataPolicyAgreed && props.isLocationAgreed) ? "#2E90FA" : "#b2ddff")};
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

function Step3 () {
  const navigate = useNavigate();
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [isUseAgreed, setIsUseAgreed] = useState(false);
  const [isDataPolicyAgreed, setIsDataPolicyAgreed] = useState(false);
  const [isLocationAgreed, setIsLocationAgreed] = useState(false);

  const handleTermsCheckboxChange = (isChecked: boolean) => {
    setIsUseAgreed(isChecked);
    setIsDataPolicyAgreed(isChecked);
    setIsLocationAgreed(isChecked);
  };

  useEffect(() => {
    if (isUseAgreed && isDataPolicyAgreed && isLocationAgreed) {
      setIsTermsAgreed(true);
    } else {
      setIsTermsAgreed(false);
    }
  }, [isUseAgreed, isDataPolicyAgreed, isLocationAgreed]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    try {
      if (isTermsAgreed || (isUseAgreed && isDataPolicyAgreed && isLocationAgreed)) {
        navigate('/login');
      }
    } catch (error) {
      // setErrorMessage('네트워크 통신 실패. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <SignupFormWrapper>
      <TermsAgree>이용 약관에 동의</TermsAgree>
      <TermsText>Tnovel은 회원님의 개인정보를 안전하게 보호합니다.</TermsText>
      <TermsText>새 계정을 만드려면 모든 약관에 동의하세요.</TermsText>
      <form className="InputForm" onSubmit={handleSignup}>
        <CheckboxContainer>
          <input
            type="checkbox"
            id="isTermsAgreed"
            checked={isTermsAgreed}
            onChange={(e) => handleTermsCheckboxChange(e.target.checked)}
          />
          <CheckboxLabel htmlFor="isTermsAgreed">
            <TermsContent>이용약관 3개에 모두 동의</TermsContent>
            <CustomCheckbox>{isTermsAgreed && <Check width="20" height="20" />}</CustomCheckbox>
          </CheckboxLabel>
          <hr></hr>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            id="isUseAgreed"
            checked={isUseAgreed}
            onChange={() => setIsUseAgreed(!isUseAgreed)}
          />
          <CheckboxLabel htmlFor="isUseAgreed">
            <TermsContentWrapper>
              <TermsContent>이용약관 (필수)</TermsContent>
              <LearnMoreButton>더 알아보기</LearnMoreButton>
            </TermsContentWrapper>
            <CustomCheckbox>{isUseAgreed && <Check width="20" height="20" />}</CustomCheckbox>
          </CheckboxLabel>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            id="isDataPolicyAgreed"
            checked={isDataPolicyAgreed}
            onChange={() => setIsDataPolicyAgreed(!isDataPolicyAgreed)}
          />
          <CheckboxLabel htmlFor="isDataPolicyAgreed">
            <TermsContentWrapper>
              <TermsContent>데이터 정책 (필수)</TermsContent>
              <LearnMoreButton>더 알아보기</LearnMoreButton>
            </TermsContentWrapper>
            <CustomCheckbox>{isDataPolicyAgreed && <Check width="20" height="20" />}</CustomCheckbox>
          </CheckboxLabel>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            id="isLocationAgreed"
            checked={isLocationAgreed}
            onChange={() => setIsLocationAgreed(!isLocationAgreed)}
          />
          <CheckboxLabel htmlFor="isLocationAgreed">
            <TermsContentWrapper>
              <TermsContent>위치 기반 기능 (필수)</TermsContent>
              <LearnMoreButton>더 알아보기</LearnMoreButton>
            </TermsContentWrapper>
            <CustomCheckbox>{isLocationAgreed && <Check width="20" height="20" />}</CustomCheckbox>
          </CheckboxLabel>
        </CheckboxContainer>
        <div className="signup-btn-wrapper">
          <SignupBtn
            type="submit"
            isTermsAgreed={isTermsAgreed}
            isUseAgreed={isUseAgreed}
            isDataPolicyAgreed={isDataPolicyAgreed}
            isLocationAgreed={isLocationAgreed}
          >
            가입
          </SignupBtn>
        </div>
        <div className="signup-btn-wrapper">
          <BackBtn type="button" onClick={() => navigate(-1)}>
            돌아가기
          </BackBtn>
        </div>
      </form>
    </SignupFormWrapper>
  );
};

export default Step3;


