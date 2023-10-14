import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as MainLogo } from '../assets/mainlogo.svg';
import { ReactComponent as Homebtn } from '../assets/home.svg';
import { ReactComponent as Send } from '../assets/send.svg';
import { ReactComponent as Heart } from '../assets/heart.svg';
import { ReactComponent as Plus } from '../assets/plus-square.svg';
import { ReactComponent as User } from '../assets/user.svg';
import { ReactComponent as Bookmark } from '../assets/bookmark.svg';
import { ReactComponent as Alert } from '../assets/alert-circle.svg';
import { ReactComponent as Settings } from '../assets/settings.svg';
import { useRecoilState } from "recoil";
import { jwtState, idState } from "../recoil/login"
import { kakaoLoginCodeState } from "../recoil/authState";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/logout";
import PostModal from "../pages/PostModal/PostModal";
import styled from "styled-components";
import Profile from '../images/profile.svg';
import { PostModalState } from "../recoil/feedModal";

// 스타일드 컴포넌트로 변환된 선택자들
const MainBarWrapper = styled.div`
  position:fixed;
  z-index:999;
  height: 80px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-around;
  padding: 0 16px;
  width: 100vw;
  background-color: white;
  color: #CCCCCC;
  border-bottom: 1px solid #CCCCCC;
`;

const MainLogoWrapper = styled.div``;

const MainMenuWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 60%;
`;

const SearchWrapper = styled.div`
  width: 312px;
  height: 35px;
  padding: 7px 12px 7px 12px;
  border-radius: 8px;
  border: 1px solid #B2B2B2;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SearchInput = styled.input`
  border: none;
  padding: 0;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  outline: none;
  font-size: 14px;
`;

const MainMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-left: 15px;
  background-color:white;

  @media screen and (max-width: 1000px) {
    display: none;
}
}
`;

const MainMenu2 = styled.div`
  width:100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color:white;
  position: fixed;
  bottom: 0; /* 화면 하단에 고정 */
  z-index:999;
  border-top:1px solid #B2B2B2;

  @media screen and (min-width: 1000px) {
      display: none;
  }
}
`;

const MenuButton = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  padding: 0;
`;

const ProfileMenuButton = styled.button`
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  padding: 0;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: none;
  background-image: url(${Profile});
  background-size: cover;
  background-position: center;
`;

const ProfileMenuModal = styled.div`
  position: fixed;
  top: 75px;
  right: 7%;
  display: flex;
  align-items: center;
  width: 250px;
  height: 280px;
  background: white;
  border-radius: 8px;
  border: 1px solid #EAECF0;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;
  color: black;
  font-size: 14px;
  font-weight: 600;

  @media screen and (max-width: 1000px) {
    top: auto; /*초기값: auto*/
    bottom: 40px;
}
`;

const ProfileMenuList = styled.ul`
  list-style-type: none;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;

const ProfileMenuItem = styled.li`
  margin: 10px 0;
  text-align: start;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: black;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const ModalStyle: ReactModal.Styles = {
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
    width: '1000px',
    maxWidth: '1000px',
    height: '650px',
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
    flexDirection: 'column',
    overflow: "hidden",
    boxSizing: 'border-box',
  },
};

function MainBar() {
  const [searchContent, setSearchContent] = useState('');
  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);
  const navigate = useNavigate();
  const [jwt, setJwt] = useRecoilState(jwtState);
  const [kakaoLoginCode, setKakaoLoginCode] = useRecoilState(kakaoLoginCodeState);
  const [id, setId] = useRecoilState(idState);
  const [PostModalIsOpen, setPostModalIsOpen] = useRecoilState(PostModalState);
  const handleLogout = () => {
    logout(navigate, setJwt, setKakaoLoginCode, setId);
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    if (jwt && kakaoLoginCode) {
      console.log('jwt, access_token : ?');
    } else if (jwt) {
      console.log('jwt : ?');
    } else {
      console.log('jwt, access_token : ?');
      console.log('id', id);
      console.log('jwt', jwt);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate('/login')
    }
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const truncatedValue = e.target.value.slice(0, 20);

    setSearchContent(truncatedValue);
  }

  return (
    <>
      <MainBarWrapper>
        <MainLogoWrapper>
          <Link to="/"><MainLogo width="140" height="50" /></Link>
        </MainLogoWrapper>
        <MainMenuWrapper>
          <SearchWrapper>
            <span className="validationStatus">
              <Search width="20" height="20"></Search>
            </span>
            <SearchInput
              type="text"
              name="search"
              id="search"
              value={searchContent}
              onChange={handleInputChange}
              placeholder="검색"
            />
          </SearchWrapper>
          <MainMenu>
            <MenuButton>
              <span className="HeartWrapper">
                <Link to="/"><Homebtn width="24" height="24"></Homebtn></Link>
              </span>
            </MenuButton>
            <MenuButton>
              <span className="HeartWrapper">
                <Send width="24" height="24"></Send>
              </span>
            </MenuButton>
            <MenuButton onClick={() => { setPostModalIsOpen(true) }}>
              <span className="HeartWrapper">
                <Plus width="24" height="24"></Plus>
              </span>
            </MenuButton>
            {PostModalIsOpen ? <Modal isOpen={true} onRequestClose={() => setPostModalIsOpen(false)}
              contentLabel="게시물 작성 모달"
              style={ModalStyle}
            >
              <PostModal></PostModal>
            </Modal> : null}
            <MenuButton>
              <span className="HeartWrapper">
                <Heart width="24" height="24" stroke="#999999"></Heart>
              </span>
            </MenuButton>
            <ProfileMenuButton onClick={() => { setProfileMenuVisible(!isProfileMenuVisible) }}>
              <ProfileWrapper></ProfileWrapper>
            </ProfileMenuButton>

            {/* 프로필 메뉴 모달 */}
            {isProfileMenuVisible && (
              <ProfileMenuModal>
                <ProfileMenuList>
                  <ProfileMenuItem>
                    <span><User width="24" height="24" stroke="black"></User></span>
                    <StyledLink to="/mypage">프로필</StyledLink>
                  </ProfileMenuItem>
                  <ProfileMenuItem>
                    <span><Bookmark width="24" height="24"></Bookmark></span>
                    <StyledLink to="/saved">저장</StyledLink>
                  </ProfileMenuItem>
                  <ProfileMenuItem>
                    <span><Settings width="24" height="24"></Settings></span>
                    <StyledLink to="/settings">설정</StyledLink>
                  </ProfileMenuItem>
                  <ProfileMenuItem>
                    <span><Alert width="24" height="24"></Alert></span>
                    <StyledLink to="/report">문제 신고</StyledLink>
                  </ProfileMenuItem>
                  <ProfileMenuItem>
                    <span><Settings width="24" height="24"></Settings></span>
                    {localStorage.getItem("token") ?
                      <LogoutButton type="button" onClick={handleLogout}>로그아웃</LogoutButton>
                      : <LogoutButton type="button" onClick={handleLogin}>로그인</LogoutButton>}
                  </ProfileMenuItem>
                </ProfileMenuList>
              </ProfileMenuModal>
            )}
          </MainMenu>
        </MainMenuWrapper>
      </MainBarWrapper>
      <MainMenu2>
        <MenuButton>
          <span className="HeartWrapper">
            <Link to="/"><Homebtn width="24" height="24"></Homebtn></Link>
          </span>
        </MenuButton>
        <MenuButton>
          <span className="HeartWrapper">
            <Send width="24" height="24"></Send>
          </span>
        </MenuButton>
        <MenuButton onClick={() => { setPostModalIsOpen(true) }}>
          <span className="HeartWrapper">
            <Plus width="24" height="24"></Plus>
          </span>
        </MenuButton>
        {PostModalIsOpen ? <Modal isOpen={true} onRequestClose={() => setPostModalIsOpen(false)}
          contentLabel="게시물 작성 모달"
          style={ModalStyle}
        >
          <PostModal></PostModal>
        </Modal> : null}
        <MenuButton>
          <span className="HeartWrapper">
            <Heart width="24" height="24" stroke="#999999"></Heart>
          </span>
        </MenuButton>
        <ProfileMenuButton onClick={() => { setProfileMenuVisible(!isProfileMenuVisible) }}>
          <span className="HeartWrapper">
            <User width="24" height="24" stroke="#999999"></User>
          </span>
        </ProfileMenuButton>

        {/* 프로필 메뉴 모달 */}
        {isProfileMenuVisible && (
          <ProfileMenuModal>
            <ProfileMenuList>
              <ProfileMenuItem>
                <span><User width="24" height="24" stroke="black"></User></span>
                <StyledLink to="/mypage">프로필</StyledLink>
              </ProfileMenuItem>
              <ProfileMenuItem>
                <span><Bookmark width="24" height="24"></Bookmark></span>
                <StyledLink to="/saved">저장</StyledLink>
              </ProfileMenuItem>
              <ProfileMenuItem>
                <span><Settings width="24" height="24"></Settings></span>
                <StyledLink to="/settings">설정</StyledLink>
              </ProfileMenuItem>
              <ProfileMenuItem>
                <span><Alert width="24" height="24"></Alert></span>
                <StyledLink to="/report">문제 신고</StyledLink>
              </ProfileMenuItem>
              <ProfileMenuItem>
                <span><Settings width="24" height="24"></Settings></span>
                {localStorage.getItem("token") ?
                  <LogoutButton type="button" onClick={handleLogout}>로그아웃</LogoutButton>
                  : <LogoutButton type="button" onClick={handleLogin}>로그인</LogoutButton>}
              </ProfileMenuItem>
            </ProfileMenuList>
          </ProfileMenuModal>
        )}
      </MainMenu2>
    </>
  )
}

export default MainBar;
