import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { supportDeviceSize } from "../../components/styles";
import { ReactComponent as Mainlogo } from "../../assets/mainlogo.svg";
import homemockup from "../../images/home-mockup.png";
import Googlebadge from "../../images/app-badge-google.png";
import Storebadge from "../../images/app-badge-store.png";
import profile from '../../images/profile.svg';
import MainBar from '../../components/Mainbar';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import {RequestPayResponse, RequestPayParams} from '../../../portone';

const PayBackground = styled.div`
  background: #f6f6f6;
  width: 100vw; /* 스크롤바 너비를 뺀 가로 너비 설정 (Windows 기준) */
  min-height: 100vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`;

const PayWrapper = styled.div`
  margin-top:80px;
`

const PayContainer = styled.div`
  display:flex;
  justify-content:center;
  margin-bottom:80px;
`;

const PayFormWrapper = styled.div`
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
  margin-right: 50px;

  @media screen and (max-width: 870px) {
    display: none;
}
`;

const PhoneImage = styled.img`
  width: 100%;
  height: 100%;
`;

const MainlogoWrapper = styled.div`
  margin: 30px auto 0px;
`;

const SubscriptionNotice = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color:#7F7F7F;
`

const PriceNotice = styled.p`
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color:#2C2C2C;
  margin-top:0;
`

const FormContainer = styled.div`
  // @media all and (max-width: ${supportDeviceSize}px) {
  //   width: 100vw;
  // }
  background-color: white;
  padding:10px;
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

const SubscribeBtn = styled.button<{ isSubscribed: boolean }>`
  cursor: pointer;  
  width: 320px;
  height: 44px;
  border: 0;
  border-radius: 30px;
  color: white;
  background-color: ${(props) => (props.isSubscribed ? '#F04438' : '#2E90FA')};
  margin-top: 20%;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
`;

const BackBtn = styled.button`
  cursor: pointer;
  width: 320px;
  height: 44px;
  border: 0;
  color: black;
  background-color: white;
  margin-bottom: 8%;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
`;

const ProfileContainer = styled.div`
  display:Flex;
  background:transparent;
  justify-content:center;
  align-items:center;
  margin: 50px 0 80px;
  gap:130px;
`;

const Profile = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: none;
  background-image: url(${profile});
  background-size: cover;
  background-position: center;
`;

const ProfileContent = styled.div`
  display:flex;
  flex-direction:column;
  gap:10px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color:black;

  div {
    margin:0;
  }

  p{
    margin:0;
  }
`;

const User = styled.div`
  display:flex;
  align-items:center;

  span {
    font-size: 30px;
    font-weight: 500;
    line-height: 38px;
    letter-spacing: 0em;
  }
`

const ProfileEditBtn = styled.button`
  width:80px;
  height:22px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0em;
  text-align: center;
  margin-left: 20px;
  background-color:transparent;
  border: 0.5px solid #B2B2B2;
  border-radius:3px;
`;

const FeedInfo = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color:black;
  

  span {
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin-left:8px;
  margin-right:25px;
}

`;

const YesOrNot = styled.div`
    display:flex;
    text-align:center;
    flex-direction:column;
    width:100%;
    height:100%;
`
const Q = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    height: 100%;
    width:100%;
    p {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0em;
    margin:5px;
    }
    span {
        color:#7F7F7F;
    }
`
const Yes = styled.button`
    height: 80px;
    width:100%;
    background: transparent;
    color: #F04438;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0em;
    border:0;
    border-top:1px solid #CCCCCC;
    cursor:pointer;
`
const No = styled.button`
    height: 80px;
    width:100%;
    background: transparent;
    color: black;
    color: #black;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0em;
    border:0;
    border-top:1px solid #CCCCCC;
    cursor:pointer;
`

const SubPopupStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(69, 69, 69, 0.65)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: "fixed"
  },
  content: {
    width: '400px',
    height: '220px',
    padding: '0px',
    backgroundColor: 'white',
    borderRadius: '10px',
    margin: '0',
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: 'flex',
    overflow: "hidden"
  },
};


function Pay() {
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [SubpopupIsOpen, setSubpopupIsOpen] = useState(false);
  const [FailurePopupIsOpen, setFailurePopupIsOpen] = useState(false);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate('/signup/step1')
    }

    //구독 상태 업데이트
    if(localStorage.getItem('isSubscribed') === 'true'){
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/v1/iamport.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // 컴포넌트가 언마운트될 때 스크립트를 제거합니다.
      document.body.removeChild(script);
    };
  }, []);

  const handlesubscribe = () => {
    /* 1. 가맹점 식별하기 */
    window.IMP?.init(`${process.env.REACT_APP_IMP}`); // 가맹점 식별코드
    /* 2. 결제 데이터 정의하기 */
    const data: RequestPayParams = {
      pg: 'kcp', // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 9900, // 결제금액
      name: "아임포트 결제 데이터 분석", // 주문명
      buyer_name: "홍길동", // 구매자 이름
      buyer_tel: "01012345678", // 구매자 전화번호
      buyer_email: "abcdefg@example.com", // 구매자 이메일
      buyer_addr: "UMC_그릿지테스트", // 구매자 주소
    };

    /* 4. 결제 창 호출하기 */
    window.IMP?.request_pay(data, callback);
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response: RequestPayResponse) {
    const { success, } = response;
    console.log(response);
    if (success) {
      localStorage.setItem('isSubscribed', 'true');
      alert("결제 성공");
      setIsSubscribed(true);
    } else {
      // alert(`결제 실패: ${error_msg}`);
      setFailurePopupIsOpen(true);
    }
  }

  const cancelSubscription = () => {
    setSubpopupIsOpen(true);
  }

  const confirmCancel = () => {
    localStorage.removeItem('isSubscribed');
    setSubpopupIsOpen(false);
    setIsSubscribed(false);
  }
  
  return (
    <>
      <MainBar></MainBar>
      <PayBackground>
        <PayWrapper>
          <ProfileContainer>
            <Profile>
            </Profile>
            <ProfileContent>
              <User><span>{userId}</span><ProfileEditBtn>프로필편집</ProfileEditBtn></User>
              <FeedInfo>게시물<span>83</span>팔로워<span>1,560</span>팔로잉<span>21</span></FeedInfo>
              <div>
                <p>블루</p>
                <p>여행다니는거 좋아해요</p>
                <p>세계를 돌아다닙니다</p>
              </div>
            </ProfileContent>
          </ProfileContainer>
          <PayContainer>
            <PhoneContainer>
              <PhoneImage src={homemockup} alt="home-mockup" />
            </PhoneContainer>
            <FormContainer>
              <PayFormWrapper>
                <MainlogoWrapper>
                  <Mainlogo width="217" height="80" />
                </MainlogoWrapper>
                <SubscriptionNotice>
                  서비스를 구독하고, 더 다양한 소식을 받아보세요
                </SubscriptionNotice>
                <PriceNotice>
                  {isSubscribed ? '서비스 구독중' : '월 9,900원으로 구독하기'}
                </PriceNotice>
                {isSubscribed ?
                  <SubscribeBtn type="button" isSubscribed={isSubscribed} onClick={cancelSubscription}>
                    구독 해지하기
                  </SubscribeBtn>
                  : <SubscribeBtn type="button" isSubscribed={isSubscribed} onClick={handlesubscribe}>
                    바로 구독 신청하기
                  </SubscribeBtn>}
                <BackBtn type="button" onClick={() => { navigate('') }}>
                  이용약관 확인하기
                </BackBtn>
              </PayFormWrapper>
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
          </PayContainer>
        </PayWrapper>
      </PayBackground>
      {
        SubpopupIsOpen && (
          <Modal isOpen={true} onRequestClose={() => setSubpopupIsOpen(false)}
            contentLabel="게시글 삭제 확인"
            style={SubPopupStyle}
          >
            <YesOrNot>
              <Q>
                <p>앗! 정말 구독을 취소하실 건가요?</p>
                <p><span>확인 버튼을 누르면, 구독이 종료됩니다.</span></p>
              </Q>
              <Yes type="button" onClick={confirmCancel}>
                확인
              </Yes>
              <No type="button" onClick={() => { setSubpopupIsOpen(false) }}>
                취소
              </No>
            </YesOrNot>
          </Modal>)
      }
      {
        FailurePopupIsOpen && (
          <Modal isOpen={true} onRequestClose={() => setFailurePopupIsOpen(false)}
            contentLabel="게시글 삭제 확인"
            style={SubPopupStyle}
          >
            <YesOrNot>
              <Q>
                <p>결제 처리가 진행되지 않았습니다.</p>
                <p><span>결제를 다시 시도해주세요.</span></p>
              </Q>
              <No type="button" onClick={() => { setFailurePopupIsOpen(false) }}>
                확인
              </No>
            </YesOrNot>
          </Modal>)
      }
    </>
  );
};

export default Pay;
