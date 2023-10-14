import React, { useState, useEffect, useRef } from "react";
import Modal from 'react-modal';
import moment from "moment";
import Slider from "react-slick";
import { ReactComponent as Bookmark } from '../../assets/bookmark.svg';
import { ReactComponent as Comment } from '../../assets/comment.svg';
import { ReactComponent as Heart } from '../../assets/heart.svg';
import feedloginprofile from "../../images/default_profile.png";
import PrevArrow from '../../assets/prev-arrow.svg';
import NextArrow from '../../assets/next-arrow.svg';
import Dashboard from '../dashboard/Dashboard';
import styled from "styled-components";
import { useRecoilState } from 'recoil';
import { feedsState } from "../../recoil/feedsState";
import { DashboardModalState, PageState } from "../../recoil/feedModal";
import axios from "axios";

const PostContainer = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid #CCCCCC;
  border-radius: 10px;
`;

const PostUserInfo = styled.div`
  position: absolute;
  z-index: 2;
  top: 10px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PostUserName = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: white;
`;

const PostIcons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
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
  margin: 5px 0 10px 0;
`;

const Reactions = styled.div`
  padding: 0 10px;
`;

const ViewMore = styled.button`
  background-color: transparent;
  border: none;
  color: #7F7F7F;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
`;

const CommentsMore = styled.button`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: #999999;
  background-color: transparent;
  border: none;
  padding:0;
  margin-top: 10px;
`;

const PostComments = styled.div`
  margin-bottom: 10px;
`;

const FeedUserId = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  margin-right: 10px;
`;

const FeedText = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
`;

const CommentBox = styled.div`
  display: flex;
  gap: 5px;
  margin: 10px 0;
`;

const CommentId = styled.span`
  font-size: 14px;
  font-weight: 530;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  margin-right: 5px;
`;

const CommentContent = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
`;

const CommentWrapper = styled.div`
  width: 100%;
  height: 60px;
  border-top: 1px solid #B2B2B2;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 10px 10px;
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
    width: '1070px',
    height: '600px',
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

const PostImage = styled.div`
  width: 100%;
  height: 520px;
  position: relative;
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
  height: 520px;
  width: 520px;
  position: relative;

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
  height: 520px;
  border-radius: 10px 10px 0px 0px;
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: url(${feedloginprofile});
  background-size: cover;
  background-position: center;
`;

const Posting = styled.button`
    width: 60px;
    height: 100%;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: right;
    color: #B2DDFF;
    text-align: center;
    border: none;
    background-color: transparent;
}`

const CommentingUser = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: url(${feedloginprofile});
  background-size: cover;
  background-position: center;
  margin-left: 10px;
`;

const CommentInput = styled.button`
  width: 80%;
  height: 90%;
  background-color: transparent;
  border: none;
  outline: none;
  text-align: start;
  cursor: pointer;
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

export type FeedType = {
  feedId: number;
  feedLoginId: string;
  feedText: string;
  feedCreatedAt: string;
  feedUpdatedAt: string;
  feedCommentCount: number;//TypeScript에서 숫자 데이터 타입: number
  contentsList: {
    contentsId: number;
    contentsUrl: string;//ypeScript에서 배열 데이터 타입 : []
    createdAt: string;
    updatedAt: string;
  }[];
  comments: {
    id: number;
    loginId: string;
    commentText: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export type CommentType = {
  id: number;
  loginId: string;
  commentText: string;
  createdAt: string;
  updatedAt: string;
}

function Post() {
  const API_BASE_URL = 'https://api.gridge-test.com';
  const [selectedFeed, setSelectedFeed] = useState<FeedType | null>(null);
  const [dashboardIsOpen, setDashboardIsOpen] = useRecoilState(DashboardModalState);
  const [feeds, setfeeds] = useRecoilState(feedsState);
  const [page, setPage] = useRecoilState(PageState); // 현재 페이지
  const [loading, setLoading] = useState(true);//로딩여부 로딩중:true, 로딩끝:false
  const [hasMore, setHasMore] = useState(true); // 다음 페이지가 있는지 여부
  const target = useRef<HTMLDivElement | null>(null);
  const size = 10; // 한 페이지당 표시할 아이템 수
  const token = localStorage.getItem('token');
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

  const postComment = () => {
    //게시하면 새롭게 댓글불러오기
  }

  // feeds 배열을 최신순으로 정렬
  const sortedFeeds: FeedType[] = (feeds.length > 0) ? feeds.slice().sort((a, b) => {
    // 'createdAt' 속성을 기준으로 비교
    return new Date(b.feedCreatedAt).getTime() - new Date(a.feedCreatedAt).getTime();
  }) : [];

  const fetchFeedsData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/app/feeds`, {
        params: {
          'pageIndex': page,
          'size': size
        },
        headers: {
          'x-access-token': `${token}`,
        },
      })
      console.log('page: ', page, '조회결과', response.data.result);
      const data = response.data.result;
      console.log('prev: ', feeds, 'data: ', data);
      if (Array.isArray(data)) {
        setfeeds(prev => [...prev, ...data]);
      } else {
        console.error("Data is not iterable:", data);
        return;
      }

      // 각 피드에 대한 댓글 데이터 가져오기
      data.forEach((feed: FeedType) => {
        fetchAndSetComments(feed.feedId);
      });

      if (data.length < size) {
        setHasMore(false);
      }

      setLoading(false);
    } catch (error) {
      console.log('페이지 피드 조회 실패: ', error);
      setLoading(false);
      throw error;
    }
  };

  const fetchAndSetComments = async (feedId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/app/feeds/${feedId}/comments`, {
        params: {
          'pageIndex': 0,
          'size': size
        },
        headers: {
          'x-access-token': `${token}`,
        },
      })

      const commentsData = response.data.result;
      console.log('CommentsData', commentsData);

      //해당피드를 찾아서 comments설정
      setfeeds((prevfeeds) => {
        const updatedfeeds = prevfeeds.map((feed) => {
          if (feed.feedId === feedId) {
            return {
              ...feed,
              comments: commentsData
            };
          }
          return feed;
        });
        return updatedfeeds;
      });
    } catch (error) {
      console.log('페이지 댓글설정 실패: ', error);
    }
  };

  // 페이지 로딩 시 댓글 데이터를 초기 로드
  useEffect(() => {
    setLoading(true);
    fetchFeedsData();
  }, [page]);


  useEffect(() => {
    if (target.current && !loading) {
      console.log('페이지 + 1');
      //로딩완료되었을때만 실행(로딩중=target을 찾는중)
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            setPage(prev => prev + 1)
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(target.current);
    }
  }, [loading]);

  const [showMore, setShowMore] = useState(false); //더보기여부
  const [heart, setHeart] = useState(false);
  const [hearCounts, setHeartCounts] = useState(251);

  const handleCloseModal = (newState: boolean) => {
    setSelectedFeed(null);
    setDashboardIsOpen(newState);
  }


  return (
    <>
      {sortedFeeds && sortedFeeds.map(function (feed) {
        const sortedComments = feed.comments ? (feed.comments.slice().sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })) : []

        const fullText = feed.feedLoginId + ' ' + feed.feedText;
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

        const handleOpenModal = () => {
          setSelectedFeed(feed);
          setDashboardIsOpen(true);
        };


        return (
          <PostContainer key={feed.feedId}>
            <PostImage>
              <PostUserInfo>
                <FeedLoginProfile></FeedLoginProfile>
                <PostUserName>{feed.feedLoginId}</PostUserName>
              </PostUserInfo>
              <StyledSlider {...settings}>
                <SliderImg src={feed.contentsList[0].contentsUrl} alt={`postImage`} />
              </StyledSlider>
            </PostImage>
            <div className="PostActions">
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
                <div className="PostText">
                  {
                    showMore ?
                      <>
                        <FeedUserId>{feed.feedLoginId}
                        </FeedUserId><FeedText>{feed.feedText}</FeedText>
                      </>
                      : <>
                        <FeedUserId>{feed.feedLoginId}</FeedUserId>
                        <FeedText>{feed.feedText.slice(0, (100 - feed.feedLoginId.length))}</FeedText>
                      </>
                  }
                  {/*펼쳤을때는 더보기가 안보이게 -> !showmore*/}
                  {!showMore && fullText.length > 100 && <ViewMore onClick={() => { setShowMore(true) }} className="ViewMore">...더보기</ViewMore>}
                </div>
                <PostComments>
                  {
                    sortedComments.slice(0, 2).map((comment) => (
                      <CommentBox>
                        <CommentProfile></CommentProfile>
                        <div>
                          <CommentId>{comment.loginId}</CommentId><CommentContent>{comment.commentText}</CommentContent>
                          <p>{getDayMinuteCounter(new Date(comment.createdAt))}</p>
                        </div>
                      </CommentBox>
                    ))
                  }
                  {/*펼쳤을때는 더보기가 안보이게 -> !showmore*/}
                  {feed.feedCommentCount > 2 && <CommentsMore onClick={handleOpenModal}>댓글 {feed.feedCommentCount}개 모두 보기</CommentsMore>}
                  <p style={{ fontSize: "12px", color: "#B2B2B2" }}>{getDayMinuteCounter(new Date(feed.feedCreatedAt))}</p>
                </PostComments>
              </Reactions>
              <CommentWrapper>
                <CommentingUser></CommentingUser>
                <CommentInput onClick={handleOpenModal}>댓글 달기...</CommentInput>
                <Posting onClick={postComment}>게시</Posting>
                {dashboardIsOpen && (
                  <Modal isOpen={dashboardIsOpen} onRequestClose={() => { handleCloseModal(false) }}
                    contentLabel="게시물 상세 모달"
                    style={ModalStyle}
                  >
                    {selectedFeed && (
                      <Dashboard selectedFeed={selectedFeed} isOpen={dashboardIsOpen} onRequestClose={handleCloseModal} fetchFeedsData={fetchFeedsData}></Dashboard>
                    )}
                  </Modal>)}
              </CommentWrapper>
            </div>
          </PostContainer>
        );
      })}
      {hasMore && <div ref={target}>loading...</div>}
    </>
  );
}

export default Post;