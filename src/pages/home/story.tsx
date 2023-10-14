import React, { useState } from "react";
import styled from "styled-components";

const StoriesProfile = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(209.83deg, #1570EF 7.74%, #9EEFF4 94.51%);
  display: flex;
  justify-content: center; /* ¼öÆò Áß¾Ó Á¤·Ä */
  align-items: center; /* ¼öÁ÷ Áß¾Ó Á¤·Ä */

  img{
    width: 90%;
    height: 90%;
    border-radius: 50%;
    border:2px solid white;
  }
`
const StoriesContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: white;
  border: 1px solid #CCCCCC;
  border-radius: 10px;
  display: flex;
  align-items: center;
  
  ul {
    list-style-type: none;
    padding: 10px 14px;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 15px;
    color: #333333;
}
`
function Story() {
    const [StoryUser] = useState([
      { name: 'user1', profile: '/storyuser1.png' },
      { name: 'user2', profile: '/storyuser2.png' },
      { name: 'user3', profile: '/storyuser3.png' },
      { name: 'user4', profile: '/storyuser4.png' },
    ]);
  
    return (
      <StoriesContainer>
        <ul>
          {
            StoryUser.map(function (user) {
              return (
                <li>
                  <div className="StoryContent">
                    <StoriesProfile><img src={process.env.PUBLIC_URL + user.profile}></img></StoriesProfile>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </StoriesContainer>
    );
  }

  export default Story;