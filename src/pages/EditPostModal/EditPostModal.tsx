import React, { useState } from "react";
import { ReactComponent as Pin } from '../../assets/map-pin.svg';
import { ReactComponent as Down } from '../../assets/chevron-down.svg';
import feedloginprofile from "../../images/default_profile.png";
import PrevArrow from '../../assets/prev-arrow.svg';
import NextArrow from '../../assets/next-arrow.svg';
import styled, { createGlobalStyle } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRecoilState } from 'recoil';
import { DashboardModalState, PageState} from "../../recoil/feedModal";
import { feedsState } from "../../recoil/feedsState";
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;
const PostWrapper = styled.div`
    flex-grouw:1;
    height:100%;
`
const NewPostTitle = styled.div`
    display: flex;
    align-items: center; 
    justify-content: space-between;
    padding: 0 10px;
    border-bottom: 1px solid #B2B2B2;
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    letter-spacing: 0em;
    height:60px;
    max-width: 100%;
`

const NewPostContent = styled.div`
    display:flex;
    width: 100%;
    height:590px;
    justify-content:center;
    align-items:center;
    padding: 0;
    overflow: hidden;

    p {
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
    color:#7F7F7F;
    margin: 10px 0 20px;;
    }

    input {
        display:none;
    }
`

const ImageSlider = styled(Slider)`
  width: 650px;
  height:  590px;
  display: flex;
  justify-content:center;

  img {
    width:100%;
    height:100%;
    border:none;
  }
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }

  .slick-prev {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 3%;
    z-index: 3;
  }
  .slick-next {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 3%;
    z-index: 3;
  }

  .slick-dots {
    position: absolute;
    bottom: 5%;
    
    button {
			display: block;
			width: 1rem;
			height: 1rem;
			padding: 0;
			
			border: none;
			border-radius: 100%;
			background-color:#E0E0E0;
			
			text-indent: -9999px;
		}

    li.slick-active button {
			background-color: #2F80ED;
		}
  }
`;

const Pre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 3%;
  z-index: 3;
`;

const NextTo = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 3%;
  z-index: 3;
`;

const Arrow = styled.img`
  width: 100%;
  height: 100%;
`;

const Next = styled.button`
    width:60px;
    height:100%;
    background-color:white;
    color:#2E90FA;
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0em;
    border:none;
`
const PrevButton = styled.button`
    width:60px;
    height:100%;
    background-color:white;
    color:#7F7F7F;
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0em;
    border:none;
`

const UploadTextWrapper = styled.div`
    width:350px;
    height:100%;
    background-color:white;
    display:flex;
    flex-direction:column;
    border-left: 1px solid #B2B2B2;
`
const PostContent = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
  border-bottom: 1px solid #B2B2B2;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PostUserProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`;

const FeedLoginProfile = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-image: url(${feedloginprofile});
  background-size: cover;
  background-position: center;
`;

const FeedTextCon = styled.div`
  width: 85%;
  margin: 10px auto;
  height:230px;

  textarea {
    width:100%;
    height:100%;
    max-height:100%;
    resize: none;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

const AddInfo = styled.div`
    display:flex;
    justify-content: space-between;
    align-items:center;
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    border-bottom: 1px solid #B2B2B2;
    padding:5px;
`
const EmptyBox = styled.div`
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    width:100%;
    height:300px;
    color:#B2B2B2;
`

const CharacterCount = styled.div`
    font-size: 14px;
    color: #7F7F7F;
    position:absolute;
    bottom: 3%;
    right:3%;
`;

interface EditModalProps {
  feedText: string;
  feedId: number;
  feedLoginId: string;
  contentsUrl: string;
  fetchFeedsData: () => void;
  onClose: () => void;
}

function EditPostModal(props: EditModalProps) {
  const API_BASE_URL = 'https://api.gridge-test.com';
  const token = localStorage.getItem('token');
  const [, setDashboardIsOpen] = useRecoilState(DashboardModalState);
  const [FeedText, setFeedText] = useState(props.feedText);
  const [imageSrcs,] = useState<string[]>([props.contentsUrl]);
  const [, setFeeds] = useRecoilState(feedsState);
  const [, setPage] = useRecoilState(PageState); // 현재 페이지

  const goBack = () => {
    props.onClose();
  };

  const settings = {
    dots: true,
    infinite: false,
    arrow: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <NextTo>
        <Arrow src={NextArrow} />
      </NextTo>
    ),
    prevArrow: (
      <Pre>
        <Arrow src={PrevArrow} />
      </Pre>
    ),
  };

  const updatePost = async () => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/app/feeds/${props.feedId}`,
        {
          feedText: FeedText
        },
        {
          headers: {
            'x-access-token': `${token}`,
          },
        })
      console.log(response.data.code);
      if (response.data.code !== 1000) {
        alert('게시글 수정 불가');
      }
      setFeeds([]);
      setPage(0);
      props.fetchFeedsData();
      setDashboardIsOpen(false);
    } catch (error) {
      console.log('게시글 수정 실패: ', error);
      throw error;
    }
  };

  return (
    <PostWrapper>
      <GlobalStyle />
      <NewPostTitle>
        <PrevButton onClick={goBack}>
          취소
        </PrevButton>
        <Next type="button" onClick={updatePost}>
          완료
        </Next>
      </NewPostTitle>
      <NewPostContent>
        <>
          <ImageSlider {...settings}>
            {imageSrcs.map((src, index) => (
              <div key={index}>
                <img src={src} alt={`preview-img-${index}`} />
              </div>
            ))}
          </ImageSlider>
          <UploadTextWrapper>
            <PostContent>
              <PostUserProfile>
                <FeedLoginProfile></FeedLoginProfile>
                <span className="PostUserName">{props.feedLoginId}</span>
              </PostUserProfile>
              <FeedTextCon>
                <textarea
                  value={FeedText}
                  onChange={(e) => { setFeedText(e.target.value) }}></textarea>
                <CharacterCount>{FeedText.length} / 500</CharacterCount>
              </FeedTextCon>
            </PostContent>
            <AddInfo>
              <span>위치 추가</span><span><Pin></Pin></span>
            </AddInfo>
            <AddInfo>
              <span>접근성</span><span><Down></Down></span>
            </AddInfo>
            <EmptyBox></EmptyBox>
          </UploadTextWrapper>
        </>
      </NewPostContent>
    </PostWrapper>
  )
}

export default EditPostModal;