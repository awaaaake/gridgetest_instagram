import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { supportDeviceSize } from "../../components/styles";
import { useRecoilState } from "recoil"; 
import { jwtState, idState } from "../../recoil/login";
import { kakaoLoginCodeState } from '../../recoil/authState'; // authState 파일 임포트
import axios from "axios";

const LoginBackground = styled.div`
  background: #f6f6f6;
  width: calc(100vw - 17px); /* 스크롤바 너비를 뺀 가로 너비 설정 (Windows 기준) */
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

function KaKaoLogin() {
    const API_BASE_URL = 'https://api.gridge-test.com';
    const navigate = useNavigate();
    const [id, setId] = useRecoilState(idState);
    const [jwt, setJwt] = useRecoilState(jwtState);
    const [kakaoLoginCode, setkakaoLoginCode] = useRecoilState(kakaoLoginCodeState);

    // useEffect를 사용하여 리다이렉트 라우터에서 인가 코드를 추출하고 백엔드로 보내는 코드
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const grantType = "authorization_code";
        const Rest_api_key = process.env.REACT_APP_REST_API_KEY //REST API KEY
        const redirect_uri = process.env.REACT_APP_REDIRECT_URI //Redirect URI
        //oauth 요청 URL
        axios.post(//청은 성공적으로 받은 액세스 토큰을 사용하여 카카오 사용자의 정보를 가져오는 역할
            `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&code=${code}`,
            {},
            { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
        )
            .then((res: any) => {//카카오로그인한 유저정보를 받는 요청
                console.log('1번째', res);
                sendCodeToBackend(res.data.access_token);
                const { access_token } = res.data;
                axios.post(
                    `https://kapi.kakao.com/v2/user/me`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                        }
                    }
                )
                    .then((res: any) => {
                        console.log('2번째', res);
                    })
            })
            .catch((Error: any) => {
                console.log(Error)
            })
    }, []);
    
    const token = localStorage.getItem('token');
    const autologin = () => {
        axios.get(`${API_BASE_URL}/app/auto-sign-in`, {
          headers: {
            'x-access-token': `${token}`, 
          },
        })
        .then((response) => {
          console.log('자동로그인 결과: ', response.data);
          if(response.data.code==1001) {
            navigate('/');
          }
        }).catch((error)=>{
          console.log('자동 로그인 중 에러: ', error);
        })
      }
      
    const sendCodeToBackend = async (access_token: string) => {
        if (kakaoLoginCode) {
            console.log('accesstoken 발급 완료');
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/app/kakao-sign-in`, {
                accessToken: access_token,
            });
            setkakaoLoginCode(access_token);
            console.log('로그인 요청', response);
            if (response.data.code === 1000) {
                setId(response.data.result.loginId);
                setJwt(response.data.result.jwt);
                localStorage.clear()
                localStorage.setItem('id', response.data.result.loginId);
                localStorage.setItem('token', response.data.result.jwt);
                console.log('로그인 정보', id, jwt);
                autologin();
            } else {
                console.error('로그인에 실패하였습니다. 회원가입페이지로 이동합니다.');
                navigate('/signup/step1');
            }
        } catch (error) {
            console.error('네트워크 오류. 나중에 다시 시도해주세요.');
        }
    }

    return (
        <LoginBackground>
            <FormContainer>
                <div>로그인중입니다..</div>
            </FormContainer>
        </LoginBackground>
    );
};

export default KaKaoLogin;



