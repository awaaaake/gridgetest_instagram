import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";
import MainBar from '../../components/Mainbar';
import Post from './post';
import Story from './story';
import profile from '../../images/profile.svg';

const HomeBackground = styled.div`
  background: #f6f6f6;
  width: 100vw; /* 스크롤바 너비를 뺀 가로 너비 설정 (Windows 기준) */
  min-height: 100vh;
  position:absolute;
  top:80px;
  `;

const FormContainer = styled.div`
  display:flex;
  justify-content:flex-end;
`;

const ListProfile = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;

  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`

const MainContentWrapper = styled.div`
  margin: 30px 0;
  width: 80%;
  display: flex;
  gap: 10%;
`;

const MainContent = styled.div`
  display: flex;
  width: 520px;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  background-color: transparent;
`;

const ProfileList = styled.div`
  margin: 20px 0;
  width: 350px;
  background-color: transparent;

  @media screen and (max-width: 1000px) {
        display: none;
    }
}
`;

const ProfileContent = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 5%;
`;

const Profile = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;
  background-image: url(${profile});
  background-size: cover;
  background-position: center;
  /* 배경 이미지를 가운데 정렬 */
`;

const UserName = styled.p`
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
`;

const UserBio = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #7F7F7F;
  margin: 0;
`;

const ForUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RecforUser = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: #7F7F7F;
`;

const ViewAll = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: #191919;
`;

const RecListwrapper = styled.div`
  ul {
    list-style-type: none;
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    color: #333333;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ListContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Follow = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: #2E90FA;
`;

function Home () {
  const [ListUser] = useState([
    { name: 'kendalljenner', profile: '/listprofile1.jpg' },
    { name: 'dewisandra', profile: '/listprofile2.jpg' },
    { name: 'tiit_smail', profile: '/listprofile3.jpg' },
    { name: 'window123', profile: '/listprofile4.jpg' },
  ]);
  
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate('/login')
    }
  }, []);

  return (
    <>
    <MainBar></MainBar>
    <HomeBackground>
      <FormContainer>
        <MainContentWrapper>
          <MainContent>
            <Story></Story>
            <Post></Post>
          </MainContent>
          <ProfileList>
            <ProfileContent>
              <Profile></Profile>
              <div>
                <UserName className="UserName">{userId}</UserName>
                <UserBio className="UserBio">🌎👋❤️반가워</UserBio>
              </div>
            </ProfileContent>
            <RecListwrapper>
              <ForUser>
                <RecforUser>회원님을 위한 추천</RecforUser>
                <ViewAll>모두보기</ViewAll>
              </ForUser>
              <ul>
                {ListUser.map(function (user) {
                  return (
                    <li>
                      <ListContent>
                        <ListProfile><img src={process.env.PUBLIC_URL + user.profile}></img></ListProfile>
                        <span className="ListUsername">{user.name}</span>
                      </ListContent>
                      <Follow>팔로우</Follow>
                    </li>
                  )
                })}
              </ul>
            </RecListwrapper>
          </ProfileList>
        </MainContentWrapper>
      </FormContainer>
    </HomeBackground>
    </>
  );
};

export default Home;
