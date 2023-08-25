import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useDropzone} from 'react-dropzone';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import UploadContent from "./UploadContent";

function UploadImage(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ImageURL, setImageURL] = useState();
  const [Image, setImage] = useState();

  const {onClose} = props;

  const handleCloseModal = () => {
    onClose(false);
  };

  const onDrop = (files) => {

    let formData = new FormData();
    console.log(files)
    formData.append("file", files[0])

   // Create a root reference
    const storage = getStorage();

    // ref함수를 사용해 파일을 업로드하려는 Firebase Storage에 대한 참조를 만든다
    // Firebase storage에 images란 폴더를 만들고, 그 안에 업로드할 이미지의 이름으로 이미지를 저장 
    const storageRef = ref(storage, `images/${files[0].name}`);

    //uploadBytes 함수를 통해 ref로 만든 참조와 해당 파일을 매개변수로 하여 파일을 업로드 
    const uploadTask = uploadBytesResumable(storageRef, files[0]);

    uploadTask.then((snapshot)=>{
      // e.target.value="";
      getDownloadURL(snapshot.ref)
        .then((url)=>{
          console.log("file available at", url);
          setImageURL(url);
          setImage(url);
        })
    })

  



}
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    multiple: false,
    maxSize: 800000000
  });

  const completeHandler = () => {
    setModalIsOpen(true);    
  }

  
  return (
    <ModalLayout>
      <TitleSpan>Record your morning</TitleSpan>
      <CloseButton onClick={handleCloseModal}>←</CloseButton>
      <hr/>
      {/*업로드한 이미지 경로가 없을 경우, 이미지를 업로드 받는 컴포넌트 렌더링 */}
      {!ImageURL && 
        <ImageLayout {...getRootProps()}> 
        <p>이미지를 여기에 끌어놓으세요</p>
        <input {...getInputProps()} />
        <button>컴퓨터에서 선택</button>
        </ImageLayout>
      }
      
      {/*업로드한 이미지 경로가 있을 때에만 이미지 경로를 이용해 화면에 썸네일을 렌더링함 */}
      {ImageURL &&
          <ImageLayout>
              <img src={ImageURL} width="300" height="400"/>
              <button onClick={completeHandler}>Complete</button>
          </ImageLayout>
      }
      {/*modalisOpen 변수가 true면 UploadContent 컴포넌트 렌더링  */}
      {modalIsOpen && <UploadContent key={modalIsOpen} onClose={setModalIsOpen} ImageURL={ImageURL} handleCloseModal={handleCloseModal}/>}
     
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
const CloseButton = styled.button`
    position: absolute;
    top: 1.4rem;
    left: 1rem;
    background: none;
    border: none;
    font-size: 30px;
    color: black;
    cursor: pointer;
  `;

const ImageLayout = styled.div`
  width: 100%;
  padding-top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p{
    margin-top: 25%;
    width: 100%;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 30px;
    text-align: center;
    color: #460A9A;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  }
  button{
    margin-top: 15px;
    width: 350px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 20px;
    border: 3px solid #460A9A;
    background: #460A9A;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 20px;
    color: #FFFFFF;
    
  }
`

export default UploadImage;