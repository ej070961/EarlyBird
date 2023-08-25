import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {firestore} from '../../../../firebase'

function PostList() {

  const [Posts, setPosts] = useState([]);

  useEffect(()=>{
    const posts = firestore.collection("posts");

    posts
    .get()
    .then(snapshot => {
        if (snapshot.size > 0) {
          //uid가 users 컬렉션에 있으면, 메인페이지로 이동 
          const postsData = snapshot.docs.map(doc => doc.data());
          console.log(postsData)
          setPosts(postsData);
        } else {
            console.log("No data");
        }
    })
    .catch(error => {
    console.log(error);
    });
  },[])

  // 게시물 4개만 선택하여 렌더링
  const limitedPosts = Posts.slice(0, 4);

  const renderPosts = limitedPosts.map((post, index)=>{
    return <div style={{margin: '1rem'}} key={index}>
      <a href={`/post/${post.PostId}`}>
      <img src={post.Image} width='300px' height='300px'/>
      </a>
    </div>

    
  })
  return (
    <PostLayout>
      {renderPosts}
    </PostLayout>
  )
}

const PostLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
`
export default PostList