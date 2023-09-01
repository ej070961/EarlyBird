import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import NavBar from '../NavBar/NavBar';
import styled from 'styled-components';
import {firestore} from '../../../firebase';
import Comment from './Sections/Comment';
import Auth from '../../../hoc/auth';
import Likes from './Sections/Likes';
import PostDeleteButton from './Sections/PostDeleteButton';


function PostDetail(props) {

    const postId = useParams().postId; //App.js 라우트 파라미터에 있는 videoId를 가져옴 
    const [PostData, setPostData] = useState([]);
    const [UserData, setUserData] = useState([]);
    const [CommentList, setCommentList] = useState([]);
    // const User = useSelector(state => state.User);
    // const [currentUser, setcurrentUser] =useState();
    useEffect(()=>{
        // if(User){
        //   setcurrentUser(User.userData.Uid);
        // }
        //게시물 정보 가져오기 
        const posts = firestore.collection("posts");

        // Query the collection for the [postId]
        posts.where("PostId", "==", postId)
        .get()
        .then(snapshot => {
            if (snapshot.size > 0) {
                const data = snapshot.docs.map(doc => doc.data())[0]; //배열 대신 객체로 업데이트
                setPostData(data);

                // Fetch user data using PostData.Uid
                const user = firestore.collection("users")
                user.where("Uid", "==", data.Uid)
                .get()
                .then(userSnapshot=>{
                    const userData = userSnapshot.docs.map(doc=>doc.data())[0];
                    setUserData(userData); 
                    
                })
                .catch(error=>{console.log(error)})
            }
        })
        .catch(error => {
            console.log(error);
        });


        //게시물 댓글 정보 가져오기 및 실시간 업데이트 
        const comment = firestore.collection("comments");
        const commentQuery = comment.where("PostId", "==", postId);

        commentQuery.onSnapshot(snapshot=>{
            const updatedCommentList = snapshot.docs.map(doc=>doc.data())
            setCommentList(updatedCommentList);
        }, error=>{
            console.log(error)
        });

     
    },[PostData, UserData, postId]);


    if(PostData){
        return (
            <div style={{height: '100vh', overflow: 'hidden'}}>
                <NavBar/>
                <PostDetailLayout>
                    <PostInfoLayout>
                    <div style={{ width: '95%', display: 'flex', flexDirection: 'inline', justifyContent: 'space-between', alignItems: 'center'}}>
                        <UserInfoLayout>
                            <img src={UserData.Image!==""? UserData.Image:'/default_profile.png' } alt='' height={70} width={70} ></img>
                            <div style={{ display:'flex', flexDirection: 'column'}}>
                                <p style={{marginLeft: '20px'}}>{UserData.Nickname}</p>
                                <p style={{marginLeft: '20px'}}>{PostData.Time}</p>
                            </div>
                        </UserInfoLayout>
                        <PostDeleteButton PostData={PostData} />
                        </div>
                        <ContentLayout>
                        <p>{PostData.Content}</p>
                        </ContentLayout>
                        <img src={String(PostData.Image)} width='90%' height='67%' alt="haha"></img>
                        <Likes/>
                    </PostInfoLayout>    
                    <CommentLayout>     
                        <Comment CommentList={CommentList} PostData={PostData}/>
                    </CommentLayout> 
                </PostDetailLayout>
            

        </div>
        )
    }else{
        return(
         <div> loading... </div>
        )
    }
}
export default Auth(PostDetail,true);
const PostDetailLayout = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 50px;
    background: #3D1365;
    opacity: 0.8;
    display: flex;
    flex-direction: row;
    padding-top: 25px;
    justify-content: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
      }
    
  `
const PostInfoLayout = styled.div`
      width: 60%;
      height: 84%;
      display: flex;
      flex-direction: column;
      margin: 20px;
      margin-top: 10px;
      margin-left: 100px;
      background: #FFF;
      justify-content: space-between;
      border-radius: 15px;
      align-items: center;

      @media (max-width: 768px) {
        width: 80%; /* 조정 필요 */
        margin-top: 20px;
        margin-right: 0;
      }

`
const UserInfoLayout = styled.div`
      width: 90%;
      display: flex;
      flex-direction: inline;
      margin-top: 1.1rem;

      img{
        border-radius: 50%;
        width: 70;
        height: 70;
      }
      p{
        margin: 0;
        margin-top: 10px;
        font-family: 'SeoulHangang';
        font-style: normal;
        font-size: 18px;
      }
`

const ContentLayout = styled.div`
      width: 89%;


      p{
        font-family: 'SeoulHangang';
        font-style: normal;
        font-size: 18px;
      }
`
const CommentLayout = styled.div`
    width: 35%;
    height: 84%;
    margin-left: 20px;
    margin-top: 10px;
    margin-right: 100px;

    @media (max-width: 768px) {
        width: 80%; /* 조정 필요 */
        margin-top: 20px;
        margin-right: 0;
      }
`
