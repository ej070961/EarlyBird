import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {firestore} from '../../../../firebase'

function MyPostList(props) {

    const [Posts, setPosts] = useState([]);
    const currentUser = props.currentUser;

    useEffect(()=>{
        //게시물 정보 가져오기 및 실시간 업데이트 
        const posts = firestore.collection("posts");
        
        posts.where("Uid","==", currentUser.Uid)
        .onSnapshot(snapshot => {
            if (snapshot.size > 0) {
                const postsData = snapshot.docs.map(doc => doc.data());
                // console.log(postsData)
                setPosts(postsData);
            } else {
                console.log("No data");
            }
        }, error => {
          console.log(error);
        });
        
    },[]);


  const renderPosts = Posts.map((post, index)=>{
    return <div style={{margin: '2rem'}} key={index}>
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
`
export default MyPostList