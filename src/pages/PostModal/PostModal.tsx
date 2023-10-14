import React, { useState, useRef } from "react";
import image from '../../assets/image.svg';
import Modal from 'react-modal';
import { ReactComponent as Prev } from '../../assets/prev.svg';
import { ReactComponent as Pin } from '../../assets/map-pin.svg';
import { ReactComponent as Down } from '../../assets/chevron-down.svg';
import feedloginprofile from "../../images/default_profile.png";
import PrevArrow from '../../assets/prev-arrow.svg';
import NextArrow from '../../assets/next-arrow.svg';
import styled, { createGlobalStyle } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
/*firebase image upload*/
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../../apis/firebase';
import { useRecoilState } from 'recoil';
import { feedsState } from "../../recoil/feedsState";
import { PostModalState, PageState, PostedState } from "../../recoil/feedModal";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;
const PostWrapper = styled.div<{ currentPage: string }>`
    flex-grouw:1;
    height:100%;
`
const NewPostTitle = styled.div<{ imageSrc: boolean }>`
    display: flex;
    align-items: center; 
    justify-content: ${(props) => (props.imageSrc ? "space-between" : "center")};
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
const UploadImg = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
`

const PostImgContainer = styled.div`
    height: 90px;
    width: 90px;

    img {
        width: 100%;
        height: 100%;
    }
`
const SelectBtn = styled.label`
    width: 150px;
    height:40px;
    padding:7px;
    border-radius: 5px;
    background-color: #2E90FA;
    color: white;
    border:0;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0em;
    text-align: center;
    cursor:pointer;
`

const ImageSlider = styled(Slider)`
  width: 650px;
  height:  590px;
  display: flex;
  justify-content:center;

  img {
    width:100%;
    height:600px;
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
    outline:none;
`
const PrevButton = styled.button`
    width:60px;
    height:100%;
    background-color:white;
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

function PostModal() {
    const API_BASE_URL = 'https://api.gridge-test.com';
    const token = localStorage.getItem('token');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [, setPostModalIsOpen] = useRecoilState(PostModalState);
    const [, setPostedState] = useRecoilState(PostedState);
    const [FeedText, setFeedText] = useState('');
    const [imageSrcs, setImageSrcs] = useState<string[]>([]);
    const [newImageBlobs, setNewImageBlobs] = useState<Blob[]>([]);
    const [currentPage, setCurrentPage] = useState<string>("preview");
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const userId = localStorage.getItem('id');
    const [, setFeeds] = useRecoilState(feedsState);
    const [, setPage] = useRecoilState(PageState); // 현재 페이지

    const encodeFilesToBase64 = (files: FileList | null) => {
        if (files) {
            const newImageSrcs: string[] = [];
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = () => {
                    const dataURL = reader.result as string;
                    newImageSrcs.push(dataURL);
                    if (newImageSrcs.length === files.length) {
                        setImageSrcs(newImageSrcs);
                    }
                };
            }
        }
    };

    const encodeFilesToBlobArray = (files: FileList | null) => {
        if (files) {
            const blobs: Blob[] = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                blobs.push(file);
            }
            setNewImageBlobs(blobs); 
        }
    };

    const handleChangeImage = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            encodeFilesToBase64(e.target.files);
            encodeFilesToBlobArray(e.target.files);
        }
    };

    const changePage = () => {
        setCurrentPage("upload");
    };

    const share = async () => {
        const downloadURLs = await uploadImages(); // 이미지 업로드를 먼저 수행
        console.log('downloadURLs',downloadURLs);
        try {
            const response = await axios.post(`${API_BASE_URL}/app/feed`,
                {
                    feedText: FeedText,
                    contentsUrls: downloadURLs
                },
                {
                    headers: {
                        'x-access-token': `${token}`,
                    },
                })
            console.log(response.data);
            if (response.data.code === 1000) {
                setFeeds([]);
                setPage(0);
                setPostedState(true);
                setPostModalIsOpen(false);
            }
        } catch (error) {
            console.log('게시글 업로드 실패: ', error);
            throw error;
        }
    };

    const goBack = () => {
        if (currentPage === "upload") {
            setModalIsOpen(true);
        } else if (currentPage === 'preview') {
            setImageSrcs([]);
        }
    };

    const cancel = () => {
        setPostModalIsOpen(false);
        setImageSrcs([]);
    }

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

    const uploadImages = async () => {
        const nickname = 'jyuni';
        const userId = localStorage.getItem('id');
        const currentTime = Date.now();
        
        // 이미지를 업로드할 때마다 Promise를 배열에 추가
        const uploadPromises: Promise<any>[] = [];
      
        newImageBlobs.forEach((blob) => {//newImageBlobs가 배열 형식이므로 배열 내의 각 Blob를 개별적으로 업로드
          const extension = blob.type.split('/')[1];
          const fileName = `${nickname}/${userId}/${nickname}_${currentTime}.${extension}`;
          const imageRef = ref(storage, fileName);
      
          // 이미지를 업로드하고 Promise를 배열에 추가
          const uploadPromise = uploadBytes(imageRef, blob);
          uploadPromises.push(uploadPromise);
        });
      
        // 모든 이미지 업로드 Promise를 기다림
        try {
          await Promise.all(uploadPromises);
      
          // 모든 이미지가 업로드되면 다운로드 URL을 가져오기
          const downloadURLs: string[] = [];
          for (let i = 0; i < newImageBlobs.length; i++) {
            const extension = newImageBlobs[i].type.split('/')[1];
            const fileName = `${nickname}/${userId}/${nickname}_${currentTime}.${extension}`;
            const imageRef = ref(storage, fileName);
            const url = await getDownloadURL(imageRef);
            downloadURLs.push(url);
          }

          return downloadURLs;
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          throw error;
        }
      };

    return (
        <PostWrapper currentPage={currentPage}>
            <GlobalStyle />
            <NewPostTitle imageSrc={imageSrcs.length > 0}>
                {imageSrcs.length > 0 && (
                    <PrevButton onClick={goBack}>
                        <Prev></Prev>
                    </PrevButton>
                )}
                새 게시물 만들기
                {imageSrcs.length > 0 && (
                    currentPage === 'preview' ?
                        (
                            <Next type="button" onClick={changePage}>다음</Next>
                        ) : (<Next type="button" onClick={share}>공유</Next>)
                )}
            </NewPostTitle>
            <NewPostContent>
                {currentPage === 'preview' ? (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            id="Postimg"
                            ref={imageInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageInputChange}
                            multiple // 여러 장 선택을 가능하게 함
                        />
                        {imageSrcs.length > 0 ? (
                            <ImageSlider {...settings}>
                                {imageSrcs.map((src, index) => (
                                    <div key={index}>
                                        <img src={src} alt={`preview-img-${index}`} />
                                    </div>
                                ))}
                            </ImageSlider>
                        ) : (
                            <UploadImg>
                                <PostImgContainer>
                                    <img src={image} alt='게시물 이미지'></img>
                                </PostImgContainer>
                                <p>사진과 동영상을 여기에 끌어다 놓으세요</p>
                                <SelectBtn onClick={handleChangeImage}>컴퓨터에서 선택</SelectBtn>
                            </UploadImg>
                        )}
                    </>
                ) :
                    (<>
                        <ImageSlider {...settings}>
                            {imageSrcs.map((src, index) => (
                                <div key={src}>
                                    <img src={src} alt={`preview-img-${index}`} />
                                </div>
                            ))}
                        </ImageSlider>
                        <UploadTextWrapper>
                            <PostContent>
                                <PostUserProfile>
                                    <FeedLoginProfile></FeedLoginProfile>
                                    <span className="PostUserName">{userId}</span>
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
                            <AddInfo>
                                <span>고급 설정</span><span><Down></Down></span>
                            </AddInfo>
                            <EmptyBox></EmptyBox>
                        </UploadTextWrapper>
                    </>)}
            </NewPostContent>
            {modalIsOpen ? <Modal isOpen={true} onRequestClose={() => setModalIsOpen(false)}
                contentLabel="게시글 작성 취소"
                style={ModalStyle}
            >
                <DeleteOrNot>
                    <Q>
                        <p>게시물을 삭제하시겠어요?</p>
                        <p><span>지금 나가면 수정 내용이 저장되지 않습니다.</span></p>
                    </Q>
                    <Yes type="button" onClick={cancel}>
                        삭제
                    </Yes>
                    <No type="button" onClick={() => { setModalIsOpen(false) }}>
                        취소
                    </No>
                </DeleteOrNot>
            </Modal> : null}
        </PostWrapper>
    )
}

export default PostModal;