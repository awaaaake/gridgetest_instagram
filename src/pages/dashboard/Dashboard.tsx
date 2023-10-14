import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { createGlobalStyle } from "styled-components";
import feedloginprofile from "../../images/default_profile.png";
import { ReactComponent as Heart } from '../../assets/heart.svg';
import { ReactComponent as Comment } from '../../assets/comment.svg';
import { ReactComponent as Bookmark } from '../../assets/bookmark.svg';
import PrevArrow from '../../assets/prev-arrow.svg';
import NextArrow from '../../assets/next-arrow.svg';
import { ReactComponent as More } from '../../assets/more.svg';
import moment from "moment";
import Modal from 'react-modal';
import { FeedType } from "../home/post";
import EditPostModal from "../EditPostModal/EditPostModal";
import { useRecoilState } from 'recoil';
import { PageState } from "../../recoil/feedModal";
import { feedsState } from "../../recoil/feedsState";
import { CommentType } from "../home/post";
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

const PostImage = styled.div`
  width: 100%;
  height: inherit;
`;

const FeedLoginProfile = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-image: url(${feedloginprofile});
  background-size: cover;
  background-position: center;
`;

const StyledSlider = styled(Slider)`
  height: 100%;
  width:100%;
  position: absolute;

  .slick-list {
    height: 100%;
    width: 100%;
  }
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    cursor: pointer;
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

const SliderImg = styled.img`
  width: 100%;
  height: 600px;
  border-radius: 10px 0px 0px 0px;
  border: 0;
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

const CommentProfile = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-image: url(${feedloginprofile});
  background-size: cover;
  background-position: center;
`;

const CommentInput = styled.input`
  width: 75%;
  height: 90%;
  background-color: transparent;
  border: none;
  outline: none;
`;

const HeartIcon = styled(Heart) <{ heart: boolean }>`
  fill: ${(props) => (props.heart ? 'red' : 'white')};
  transition: fill 0.3s ease;
  stroke:${(props) => (props.heart ? 'red' : 'black')};
`;

const HeartBtn = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const Posting = styled.button<{ comment: String }>`
  height: 100%;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: right;
  color: ${(props) => (props.comment.length > 0 ? '#2E90FA' : '#B2DDFF')};
  text-align: center;
  border: none;
  background-color: transparent;
  padding: 0;
`;

const PostUserInfo = styled.div`
  background-color: transparent;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 10px;
  border-bottom: 1px solid #B2B2B2;
`;

const PostUserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;

  span{
    color: black;
  }
`;

const PostContent = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
  border-bottom: 1px solid #B2B2B2;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FeedTextCon = styled.div`
  width: 85%;
  margin: 10px auto;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
`;

const PostIcons = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
`;

const Reactions = styled.div`
  padding: 0 10px;
`;

const CommentWrapper = styled.div`
  width: 100%;
  height: 50px;
  border-top: 1px solid #B2B2B2;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 10px 10px;
  padding: 10px;
`;

const PostActions = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Likes = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  gap: 15px;
  align-items: center;
`;

const LikesCount = styled.p`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
`;

const PostComments = styled.div``;

const CommentBox = styled.div`
  display: flex;
  gap: 5px;
  margin: 10px 0;
`;

const CommentId = styled.div`
  font-size: 14px;
  font-weight: 530;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
`;

const CommentContent = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 5px;
`;

const MoreBtn = styled.button`
  background:transparent;
  border:none;
  cursor:pointer;
`

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
    width: '400px',
    height: '450px',
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

const MenuWrapper = styled.div`
    display:flex;
    text-align:center;
    flex-direction:column;
    width:100%;
    height:100%;
`
const Menu = styled.button`
    height: 50px;
    width:100%;
    background: transparent;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;
    border:0;
    border-top:1px solid #CCCCCC;
    cursor:pointer;

    span {
      color:#F04438;
    }
`
const DeleteOrNot = styled.div`
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

const PopupStyle: ReactModal.Styles = {
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

const EditModalStyle: ReactModal.Styles = {
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

interface DashboardProps {
  selectedFeed: FeedType;
  isOpen: boolean;
  fetchFeedsData: () => void;
  onRequestClose: (newState: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const API_BASE_URL = 'https://api.gridge-test.com';
  const token = localStorage.getItem('token');
  const [modalIsOpen, setModalIsOpen] = useState(false);//...더보기 메뉴 모달
  const [popupIsOpen, setPopupIsOpen] = useState(false);//삭제확인모달
  const [EditIsOpen, setEditIsOpen] = useState(false);//게시물수정모달
  const [comment, setComment] = useState('');
  let [feed] = useState(props.selectedFeed);
  const feedId = feed.feedId;
  const [, setFeeds] = useRecoilState(feedsState);
  const [page, setPage] = useRecoilState(PageState); // 현재 페이지
  const [commentPage, setCommentPage] = useState(0); // 현재 페이지
  const [loading, setLoading] = useState(true);//로딩여부 로딩중:true, 로딩끝:false
  const target = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true); // 다음 페이지가 있는지 여부
  const size = 10;
  const [Comments, setComments] = useState<CommentType[]>([]);

  const sortedComments: CommentType[] = (Comments.length > 0) ?Comments.slice().sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }) : [];
  
 // 페이지 로딩 시 댓글 데이터를 초기 로드
 useEffect(() => {
    setLoading(true);
    loadComments();
}, [commentPage]);

useEffect(()=>{
  if(target.current && !loading) {
    //로딩완료되었을때만 실행(로딩중=target을 찾는중)
    const observer = new IntersectionObserver(
      entries => {
        if(entries[0].isIntersecting) {
          setCommentPage(prev => prev+1)
        }
      },
      {threshold : 1}
    );
    observer.observe(target.current);
  }
}, [loading]);

  // 댓글 데이터 로드 함수
  const loadComments = async () => {
    console.log('hasmore',hasMore);

    try {
      // 댓글 데이터를 가져오는 API 호출 코드
      const response = await axios.get(`${API_BASE_URL}/app/feeds/${feedId}/comments`, {
        params: {
          pageIndex: commentPage,
          size: size,
        },
        headers: {
          'x-access-token': `${token}`,
        },
      });

      const commentsData = response.data.result;
      console.log('현제 댓글페이지', page);
      console.log('CommentsData', commentsData);

      setComments(prev => [...prev, ...commentsData]);
      
      if (commentsData.length < size) {
        setHasMore(false);
      }
      setLoading(false);



    } catch (error) {
      console.error("댓글 로드 오류:", error);
      setLoading(false);
    }
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

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  }

  // 댓글 게시 함수
  const postComment = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/app/feeds/${feedId}/comment`,
        {
          commentText: comment
        },
        {
          headers: {
            'x-access-token': `${token}`,
          },
        })
      console.log(response.data);
      if (response.data.code === 1000) {
        setComments([]);
        setCommentPage(0);
        loadComments();
      } 
      setComment('');
    } catch (error) {
      console.error("댓글 게시 오류:", error);
    }
  }

  const [heart, setHeart] = useState(false);
  const [hearCounts, setHeartCounts] = useState(251);
  const getDayMinuteCounter = (date?: Date): number | string => {
    if (!date) {
      return '';
    }

    const today = moment();
    const commentDate = moment(date);
    const dayDiff = today.diff(commentDate, 'days');
    const hourDiff = today.diff(commentDate, 'hours');
    const minutesDiff = today.diff(commentDate, 'minutes');
    if (dayDiff === 0 && hourDiff === 0) { // 작성한지 1시간도 안지났을때
      const minutes = Math.abs(minutesDiff);// 절대값 사용
      return minutes + '분 전';		 // '분' 로 표시
    }

    else if (dayDiff === 0 && hourDiff <= 24) { // 작성한지 1시간은 넘었지만 하루는 안지났을때, 
      const hour = Math.abs(hourDiff);
      return hour + '시간 전';		 // '시간'으로 표시
    }

    else if (-dayDiff >= 30) {
      const formattedDate = moment(date).format('YYYY년 MM월 DD일');
      return formattedDate;
    }
    else {
      return Math.abs(dayDiff) + '일 전';		 // '일'로 표시
    }
  };

  const handleHeart = () => {
    if (heart) {
      setHeart(false);
      setHeartCounts(hearCounts - 1);
    } else {
      setHeart(true);
      setHeartCounts(hearCounts + 1)
    }
  }

  const postdelete = async (feedIdToDelete: number) => {
    console.log('삭제할피드', feedIdToDelete);
    //해당피드아이디로 게시물 삭제 api호출
    try {
      const response = await axios.patch(`${API_BASE_URL}/app/feeds/${feedIdToDelete}/delete-status`,
        null,
        {
          headers: {
            'x-access-token': `${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.code === 1000) {
        setFeeds([]);
        setPage(0);
        props.fetchFeedsData();
        props.onRequestClose(false);
      } else {
        alert('게시글 삭제 불가');
        setPopupIsOpen(false);
        setModalIsOpen(false);
      }
    } catch (error) {
      console.log('게시글 삭제 실패: ', error);
      throw error;
    }
  }

  return (
    <>
      <GlobalStyle />
      <PostImage>
        <StyledSlider {...settings}>
          {/* {feed.contentsList[0].contentsUrl.map((url, i) => ( */}
          <SliderImg src={feed.contentsList[0].contentsUrl} alt={`postImage`} />
          {/* ))} */}
        </StyledSlider>
      </PostImage>
      <PostActions>
        <PostUserInfo>
          <PostUserProfile>
            <FeedLoginProfile></FeedLoginProfile>
            <span className="PostUserName">{feed.feedLoginId}</span>
          </PostUserProfile>
          <MoreBtn type="button" onClick={() => { setModalIsOpen(true) }}><More width="24" height="24"></More></MoreBtn>
        </PostUserInfo>
        <PostContent>
          <PostUserProfile>
            <FeedLoginProfile></FeedLoginProfile>
            <span className="PostUserName">{feed.feedLoginId}</span>
          </PostUserProfile>
          <FeedTextCon>
            {feed.feedText}
          </FeedTextCon>
          <PostComments>
            {sortedComments.map((comment) => (
              <CommentBox key={comment.id}>
                <CommentProfile></CommentProfile>
                <div>
                  <CommentId>{comment.loginId}<CommentContent>{comment.commentText}</CommentContent></CommentId>
                  <p>{getDayMinuteCounter(new Date(comment.createdAt))}</p>
                </div>
              </CommentBox>
            ))}
            {hasMore && <div ref={target}>loading...</div>}
          </PostComments>
        </PostContent>
        <PostIcons>
          <Likes>
            <HeartBtn onClick={handleHeart}>
              <HeartIcon width="24" height="24" heart={heart}></HeartIcon>
            </HeartBtn>
            <Comment width="24" height="24"></Comment>
          </Likes>
          <Bookmark stroke="black" width="24" height="24"></Bookmark>
        </PostIcons>
        <Reactions>
          <LikesCount>좋아요 {hearCounts}개</LikesCount>
          <p style={{ fontSize: "12px", color: "#B2B2B2" }}>{getDayMinuteCounter(new Date(feed.feedCreatedAt))}</p>
        </Reactions>
        <CommentWrapper>
          <CommentInput
            type="text"
            name="comment"
            id="comment"
            value={comment}
            onChange={handleInputChange}
            placeholder="댓글 달기..."
          />
          <Posting onClick={postComment} comment={comment}>게시</Posting>
        </CommentWrapper>
      </PostActions>
      {modalIsOpen && (<Modal isOpen={true} onRequestClose={() => setModalIsOpen(false)}
        contentLabel="게시글 메뉴 모달"
        style={ModalStyle}
      >
        <MenuWrapper>
          <Menu type="button" onClick={() => { setPopupIsOpen(true) }}>
            <span>삭제</span>
          </Menu>
          <Menu type="button" onClick={() => { setEditIsOpen(true) }}>
            수정
          </Menu>
          <Menu type="button" onClick={() => { }}>
            좋아요 수 숨기기
          </Menu>
          <Menu type="button" onClick={() => { }}>
            댓글 기능 해제
          </Menu>
          <Menu type="button" onClick={() => { }}>
            게시물로 이동
          </Menu>
          <Menu type="button" onClick={() => { }}>
            공유 대상...
          </Menu>
          <Menu type="button" onClick={() => { }}>
            링크복사
          </Menu>
          <Menu type="button" onClick={() => { }}>
            퍼가기
          </Menu>
          <Menu type="button" onClick={() => { setModalIsOpen(false) }}>
            취소
          </Menu>
        </MenuWrapper>
      </Modal>
      )}
      {
        popupIsOpen && (
          <Modal isOpen={true} onRequestClose={() => setPopupIsOpen(false)}
            contentLabel="게시글 삭제 확인"
            style={PopupStyle}
          >
            <DeleteOrNot>
              <Q>
                <p>게시물을 삭제하시겠어요?</p>
                <p><span>이 게시물을 삭제하시겠어요?</span></p>
              </Q>
              <Yes type="button" onClick={() => { postdelete(props.selectedFeed.feedId) }}>
                삭제
              </Yes>
              <No type="button" onClick={() => { setPopupIsOpen(false) }}>
                취소
              </No>
            </DeleteOrNot>
          </Modal>)
      }
      {
        EditIsOpen &&
        (<Modal isOpen={true} onRequestClose={() => setEditIsOpen(false)}
          contentLabel="게시물정보 수정"
          style={EditModalStyle}
        >
          <EditPostModal
            feedText={feed.feedText}
            feedLoginId={feed.feedLoginId}
            feedId={feed.feedId}
            contentsUrl={feed.contentsList[0].contentsUrl}
            fetchFeedsData={props.fetchFeedsData}
            onClose={() => setEditIsOpen(false)}
          />
        </Modal>)
      }
    </>
  );
}

export default Dashboard;