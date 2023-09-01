import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {firestore} from '../../../firebase'
import { useSelector } from 'react-redux';

function UploadContent(props) {
    const { onClose } = props;
    const user = useSelector(state => state.User); //리덕스 state에서 user정보를 가져와 user 변수에 담음
    const [Content, setContent] = useState();
    const [Time, setTime] = useState("");

    const handleCloseModal = () => {
        onClose(false);
    };

    useEffect(()=>{
      const currentTime = () =>{
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hours =date.getHours();
        const minutes = date.getMinutes(); 
   
        setTime(`${year}.${month+1}.${day}. ${hours}:${minutes}`);
       };

       return currentTime;

    })

   


    const handleSubmit = (e) =>{
      e.preventDefault(); //아무것도 안쓰고 submit 버튼 눌렀을 때, 화면이 refresh 되지 않도록 함 

      // currentTime(); // currentTime 함수를 먼저 호출해서 Time 상태를 설정

      // if(!(Time==="")){
      //파이어스토어에 저장 
      // currentTime(); // currentTime 함수를 먼저 호출해서 Time 상태를 설정
      const posts = firestore.collection("posts");
      const newPostRef = posts.doc() //무작위로 생성된 문서 ID

      let variable = {
        Content: Content,
        Image: props.ImageURL,
        Uid: user.userData.Uid,
        Time: Time,
        PostId: newPostRef.id
      }
      console.log(variable)

      newPostRef
        .set(variable)
        .then( res =>{
            handleCloseModal(); //현재창 닫기
            props.handleCloseModal(false); //부모컴포넌트도 닫기 
            }
        )
        .catch(error => {
            console.log(error);
        });
      // }else{
      //   console.log("No time")
      // }

    }

    const handleChange = (e) => {
      setContent(e.target.value);
    }


    return (
        <ModalLayout>
        <TitleSpan>Record your morning</TitleSpan>
        <hr/>
        <img style={{paddingTop: '110px', margin: "0px 27%"}} src={props.ImageURL} alt="" width="300" height="300"/>
        <InputBox>
          <label>Content</label>
          <textarea
            type="text"
            name="content"
            placeholder="이곳에 내용을 입력하세요."
            value={Content}
            onChange={handleChange}
            rows="4"
          />
        </InputBox>
        <ButtonBox>
          <button type="submit" onClick={handleSubmit}>등록</button>
          <button type="cancel" onClick={handleCloseModal}>취소</button>
        </ButtonBox>
        </ModalLayout>
    )
}

const ModalLayout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 700px;
  background: #FFFFFF;
  border-radius: 30px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  hr{
    position: absolute;
    width: 100%;
    height: 0px;
    top: 75px;
    border-top: 1px solid rgba(0, 0, 0, 0.5);
  }
`; 
const TitleSpan = styled.span`
    position: absolute;
    width: 100%;
    top: 3%;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 35px;
    text-align: center;
    color: #460A9A;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding-left: 30px;


  label{
    font-family: 'SeoulHangang';
    width: 100%;
    font-style: normal;
    font-size: 25px;
    color: #460A9A;
    margin-bottom: 5px;
  }

  textarea{
    box-sizing: border-box;
    width: 95%;
    background: #FFFFFF;
    opacity: 0.8;
    border: 3px solid #460A9A;
    border-radius: 20px;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 22px;
    padding: 10px;
    opacity: 0.7;

  }
  
`;
  const ButtonBox = styled.div`
  display: flex;
  flex-direction: 'inline';
  justify-content: flex-end;
  padding-right: 10px;

  button{
    box-sizing: border-box;
    width: 90px;
    height: 40px;
    background: #460A9A;
    border: 3px solid #460A9A;
    border-radius: 10px;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 25px;
    color: #FFFFFF;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
export default UploadContent