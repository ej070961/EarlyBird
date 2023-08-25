import React,{useState, useEffect} from 'react';
import { firestore } from '../../../../firebase';
import styled from 'styled-components';
import CommentMenu from './CommentMenu';
function SingleComment(props) {
    const comment = props.comment;
    const PostData = props.PostData;
    const [UserData, setUserData] = useState([])
    const [Time, setTime] = useState([]);
    
    useEffect(()=>{
        const user = firestore.collection("users")
        user.where("Uid","==", comment.Uid)
        .get()
        .then(snapshot=>{
        setUserData(snapshot.docs.map(doc=>doc.data())[0]);
        })
        .catch(error=>{
            console.log(error)})
        
 
        const currentTime = Date.now();
        // 댓글 작성 시간과 현재 시간의 차이 계산 (밀리초 단위)
        const timeDifferenceInMilliseconds = currentTime - comment.createdAt;

        // 차이를 분, 시간, 일 단위로 변환
        const minutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        // 출력
        if (minutes < 1) {
            console.log('방금 작성됨');
            setTime('방금 작성됨')
        } else if (minutes < 60) {
            console.log(`${minutes}분 전에 작성됨`);
            setTime(`${minutes}분 전에 작성됨`)
        } else if (hours < 24) {
          setTime(`${hours}시간 전에 작성됨`);
        } else {
          setTime(`${days}일 전에 작성됨`);
        }

    },[Time])

    

    return <div key={comment.commentId}>
      <div style={{ width: '95%', display: 'flex', flexDirection: 'inline', justifyContent: 'space-between', alignItems: 'center'}}>
        <UserInfoLayout>
          {UserData.image? 
            <img src={UserData.image} alt='default_profile' height={40} width={40} ></img>
            : <img src='/default_profile.png' alt='profile' height={40} width={40} ></img>}
            <div style={{ display:'flex', flexDirection: 'column'}}>
                <p style={{marginLeft: '10px'}}>{UserData.Nickname}</p>
                <p style={{marginLeft: '10px'}}>{Time}</p>
            </div>
        </UserInfoLayout>
        <CommentMenu PostData={PostData} comment={comment}/>
       
    </div>
    <ContentLayout>
      <p>{comment.content}</p>
    </ContentLayout>
  </div>
}

export default SingleComment

const UserInfoLayout = styled.div`
      width: 90%;
      display: flex;
      flex-direction: inline;
      padding-top: 1rem;
      margin-left: 1.1rem;
      align-items: center;

      img{
        border-radius: 50%;
      
      }
      p{
        margin: 0;
        margin-top: 3px;
        font-family: 'SeoulHangang';
        font-style: normal;
        font-size: 15px;
      }
      
`

const ContentLayout = styled.div`

  p{
    font-family: 'SeoulHangang';
    font-style: normal;
    padding-left: 20px;
    padding-top: 5px;
    margin: 0;
  }

`