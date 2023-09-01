import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import { firestore } from '../../../../firebase';

function Comment(props) {

  const postId = useParams().postId; //App.js 라우트 파라미터에 있는 videoId를 가져옴 
  const user = useSelector(state=>state.User)
  const CommentList = props.CommentList;
  const [commentValue, setcommentValue] = useState("")

  //handleChange function
  const handleComment = (event) =>{
      setcommentValue(event.currentTarget.value);
  }

  const onSubmitHandler = (event)=>{
    event.preventDefault(); //아무것도 안쓰고 submit 버튼 눌렀을 때, 화면이 refresh 되지 않도록 함 \

    if(commentValue !== ""){
    const comment = firestore.collection("comments")
    const newCommentRef = comment.doc() //무작위로 생성된 문서 ID

    const variables = {
      CommentId: newCommentRef.id, //comment id
      createdAt: Date.now(), 
      content: commentValue,
      Uid: user.userData.Uid,
      PostId: postId
    }

      console.log(variables)

      newCommentRef
        .set(variables)
        .then( res =>{
           console.log("success");
           setcommentValue("");
            }
        )
        .catch(error => {
            console.log(error);
        });
      }
   
}

  const renderComment = CommentList.map((comment, index)=>{
      return <div key={index}>
      <SingleComment comment={comment} PostData={props.PostData} ></SingleComment>
      </div>

  })

  
  return (
    <CommentLayout>
      <CommentListContainer >
        {renderComment}
      </CommentListContainer>
      {/*Root Comment Form */}
      <CommentForm>
            <textarea
                onChange={handleComment}
                value={commentValue}
                placeholder="Comment"/>
            <button style={{width:'20%', height:'52px'}} onClick={onSubmitHandler}>Submit</button>
      </CommentForm>
    </CommentLayout>
  )
}

const CommentLayout = styled.div`
    height: 100%;
    border-radius: 15px;
    background: #B39DDB;
    
`

const CommentListContainer = styled.div`
  height: 82%;
  max-height: 700px; /* 최대 높이 설정 */
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
`;
const CommentForm = styled.form`
  height: 20%;
  display: flex;
  flex-direction: inline;
  align-items: center;
  textarea{
    width: 75%;
    height: 2.5rem;
    border-radius: 20px;
    border: 3px solid rgba(255, 255, 255, 0.50);
    background: rgba(70, 10, 154, 0.00);
    opacity: 0.8;
    font-family: 'SeoulHangang';
    font-style: normal;
    color: #000;
    font-size: 22px;
    padding: 10px;
    margin: 10px 0px 10px 10px;
  }

  button{
    
    background: #460A9A;
    border: 3px solid #460A9A;
    border-radius: 10px;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 25px;
    color: #FFFFFF;
    margin:10px;
  }

  
`

export default Comment