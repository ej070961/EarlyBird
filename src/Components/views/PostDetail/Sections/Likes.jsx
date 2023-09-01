import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {useParams} from 'react-router-dom'
import { firestore } from '../../../../firebase';
import Auth from '../../../../hoc/auth';
function Likes() {
  
  const postId = useParams().postId; //App.js 라우트 파라미터에 있는 videoId를 가져옴 
  const userId = localStorage.getItem("userId");
  const [Like, setLike] = useState(0);
  const [Funny, setFunny] = useState(0);
  const [Fool, setFool] = useState(0);
  const [LikeAction, setLikeAction] = useState(null) //이미 좋아요를 눌렀을 시 상태를 표시하기 위한 변수 
  const [FunnyAction, setFunnyAction] = useState(null) //이미 좋아요를 눌렀을 시 상태를 표시하기 위한 변수 
  const [FoolAction, setFoolAction] = useState(null) //이미 좋아요를 눌렀을 시 상태를 표시하기 위한 변수 
 
  useEffect(()=>{

      //리액션 수 모두 가져오기
      const likes = firestore.collection("likes");

      likes.where("PostId", "==", postId)
      .get()
      .then((snapshot) => {
              setLike(snapshot.size);
              //내가 이미 그 좋아요를 눌렀는지
              snapshot.docs.map(doc => {
                const data = doc.data()
                if(data.Uid===userId){ //likes 데이터에 해당 유저의 id가 있다면, 해당 유저가 이미 좋아요를 누른 것 
                  setLikeAction('liked')
                }
              }); 
          
        })
      .catch(error => {
          console.log(error);
      });

      const funnys = firestore.collection("funnys");
      
      funnys.where("PostId", "==", postId)
      .get()
      .then((snapshot) => {
              setFunny(snapshot.size);
              snapshot.docs.map(doc => {
                const data = doc.data()
                if(data.Uid===userId){ //likes 데이터에 해당 유저의 id가 있다면, 해당 유저가 이미 좋아요를 누른 것 
                  setFunnyAction('funnyed')
                }
              }); 
        })
      .catch(error => {
          console.log(error);
      });

      const fools = firestore.collection("fools");
      
      fools.where("PostId", "==", postId)
      .get()
      .then((snapshot) => {
              setFool(snapshot.size);
              snapshot.docs.map(doc => {
                const data = doc.data()
                if(data.Uid===userId){ //likes 데이터에 해당 유저의 id가 있다면, 해당 유저가 이미 좋아요를 누른 것 
                  setFoolAction('fooled')
                }
              }); 
        })
      .catch(error => {
          console.log(error);
      });
    
  },[LikeAction, FunnyAction, FoolAction] )


  const handleLike = () =>{
    if(LikeAction===null){
      //좋아요를 누르지 않았을 때 좋아요를 누르면 좋아요수 1 증가
      let variable = {
        Uid: userId,
        PostId: postId
      }

      const likes = firestore.collection("likes");
      likes.doc()
          .set(variable)
          .then( res =>{
            setLike(Like+1);
            setLikeAction("liked");
            }
              
          )
          .catch(error => {
              console.log(error);
          });
      }else{
        //좋아요를 이미 눌렀을 때 
        alert("You already pressed this button!")
      }
    
  }

  const handleFunny = () => {
    if(FunnyAction===null){
      //좋아요를 누르지 않았을 때 좋아요를 누르면 좋아요수 1 증가
      let variable = {
        Uid: userId,
        PostId: postId
      }

      const funnys = firestore.collection("funnys");
      funnys.doc()
          .set(variable)
          .then( res =>{
            setFunny(Funny+1);
            setFunnyAction("funnyed");
            }
              
          )
          .catch(error => {
              console.log(error);
          });
      }else{
        //좋아요를 이미 눌렀을 때 
        alert("You already pressed this button!")
      }
    

  }

  const handleFool = () =>{
    if(FoolAction===null){
      //좋아요를 누르지 않았을 때 좋아요를 누르면 좋아요수 1 증가
      let variable = {
        Uid: userId,
        PostId: postId
      }

      const fools = firestore.collection("fools");
      fools.doc()
          .set(variable)
          .then( res =>{
            setFool(Fool+1);
            setFoolAction("fooled");
            }
              
          )
          .catch(error => {
              console.log(error);
          });
      }else{
        //좋아요를 이미 눌렀을 때 
        alert("You already pressed this button!")
      }

  }
  return (
    <div style={{width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'row', marginBottom: '0.8rem',justifyContent:'center'}}>
      <LikeButton onClick={handleLike}>
        <img src="/like.png" width='27' height="27"/>
        <span>{Like}</span>
      </LikeButton>
      <LikeButton style={{marginLeft: '20px'}} onClick={handleFunny}>
        <img src="/funny.png" width='27px' height="27px"/>
        <span>{Funny}</span>
      </LikeButton>
      <LikeButton style={{marginLeft: '20px'}} onClick={handleFool}>
        <img src="/fool.png" width='27' height="27"/>
        <span>{Fool}</span>
      </LikeButton>
    </div>
  )
  }

const LikeButton = styled.div`
    width: 65px;
    height: 65px;
    border-radius: 30px;


    display: flex;
    flex-direction: inline;
    align-items: center;

    img{
      margin-top: 10px;
    }
    span{
        font-family: 'SeoulHangang';
        font-style: normal;
        font-size: 15px;
        margin-left:10px;
        margin-top: 10px;
    }
`

export default Likes;