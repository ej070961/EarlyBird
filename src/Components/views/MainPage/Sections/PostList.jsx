import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {firestore} from '../../../../firebase'

function PostList() {

  const [Posts, setPosts] = useState([]);
  const [RenderPost, setRenderPost] = useState([]);

  const sortingPosts = async() => {
    const postWithReactions = await Promise.all(Posts.map(async post =>{
      const [likesSnapshot, foolsSnapshot, funnysSnapshot] = await Promise.all([
        firestore.collection('likes').where("PostId","==", post.PostId).get(),
        firestore.collection('fools').where("PostId","==", post.PostId).get(),
        firestore.collection('funnys').where("PostId","==",post.PostId).get()
      ]);

      const reactionCount = likesSnapshot.size + foolsSnapshot.size + funnysSnapshot.size;
      return {...post, reactionCount};
    }));

    const sortedPosts = postWithReactions.sort((a,b)=>b.reactionCount-a.reactionCount);

    return sortedPosts.slice(0,4);

  }

  useEffect(()=>{
    //게시물 정보 가져오기 및 실시간 업데이트 
    const posts = firestore.collection("posts");
    
    posts.onSnapshot(snapshot => {
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

    async function updateRenderedPosts(){
      const mainPosts = await sortingPosts();
      setRenderPost(mainPosts);
    }

    updateRenderedPosts();
    
  },[Posts, RenderPost]);

  // 게시물 4개만 선택하여 렌더링
  // const limitedPosts = Posts.slice(0, 4)

  return (
    <PostLayout>
      {RenderPost.map((post, index)=>{
    return <div style={{margin: '1rem'}} key={index}>
      <a href={`/post/${post.PostId}`}>
      <img src={post.Image} width='300px' height='300px'/>
      </a>
    </div>
  })}
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