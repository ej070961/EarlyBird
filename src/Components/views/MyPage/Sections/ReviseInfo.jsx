import React, {useState, useRef} from 'react'
import styled from 'styled-components';
import { firestore } from '../../../../firebase';

function ReviseInfo(props) {
    const UserData = props.UserData;
    const onClose = props.onClose;
    const [Nickname, setNickname] = useState(UserData.Nickname);
    const [Intro, setIntro] = useState(UserData.IntroMessage);
    const [imgFile, setImgFile] = useState(UserData.Image);
    const imgRef = useRef();

    const handleCloseModal = () => {
      onClose(false);

    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      switch (name) {
          case 'nickname':
              setNickname(value);
              break;
          case 'intro':
              setIntro(value);
              break;
          default:
              break;
      }
    }; 

    // 이미지 업로드 input의 onChange
    const saveImgFile = () => {
      const reader = new FileReader();
      const file = imgRef.current.files[0];
      reader.readAsDataURL(file);
      reader.onload= () => {
          setImgFile(reader.result);
      };

      // let formData = new FormData();
      // console.log(files)
      // formData.append("file", files[0])
  
    //  // Create a root reference
    //   const storage = getStorage();
  
    //   // ref함수를 사용해 파일을 업로드하려는 Firebase Storage에 대한 참조를 만든다
    //   // Firebase storage에 images란 폴더를 만들고, 그 안에 업로드할 이미지의 이름으로 이미지를 저장 
    //   const storageRef = ref(storage, `images/${files[0].name}`);
  
    //   //uploadBytes 함수를 통해 ref로 만든 참조와 해당 파일을 매개변수로 하여 파일을 업로드 
    //   const uploadTask = uploadBytesResumable(storageRef, files[0]);
  
    //   uploadTask.then((snapshot)=>{
    //     // e.target.value="";
    //     getDownloadURL(snapshot.ref)
    //       .then((url)=>{
    //         console.log("file available at", url);
    //           setImgFile(url);
    //       })
    //   })
    };

    const handleSubmit = (e) =>{
      e.preventDefault(); //아무것도 안쓰고 submit 버튼 눌렀을 때, 화면이 refresh 되지 않도록 함 

      let variable = {
        UserName: UserData.UserName, 
        Email: UserData.Email, 
        Nickname: Nickname, 
        PhoneNumber: UserData.PhoneNumber, 
        Uid: UserData.Uid, 
        Image: imgFile, 
        IntroMessage: Intro
      };

      
      const users = firestore.collection("users");
      
      // Query the collection for the user's id
      users.doc(UserData.Uid)
      .set(variable)
      .then(()=>{
        console.log("Successfully revised");
        handleCloseModal();
      })
      .catch(error => {
          console.log(error);
      });

    

    }

    return (
        <ModalLayout>
            <UploadSpan>프로필 편집 </UploadSpan>
            <Line/>
            <ImageLayout>
            <img src={imgFile!==""? imgFile:'/default_profile.png' } alt='' height={200} width={200} ></img>
            <form>
              <label htmlFor="profileImg">프로필 이미지 추가</label>
              <input style={{display: 'none'}} type='file' accept="image/*" id="profileImg" ref={imgRef} onChange={saveImgFile}></input>
            </form>
              
            </ImageLayout>
    
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', margin: '1rem', alignItems: 'center'}}>
            <InputBox>
              <label>닉네임</label>
              <input type="text" name="nickname" value={Nickname} onChange={handleChange}></input>
            </InputBox>
            <InputBox>
              <label>Intro Message</label>
              <textarea type="text" name="intro" value={Intro} onChange={handleChange}></textarea>
            </InputBox>
            <ButtonBox>
              <button onClick={handleCloseModal}>취소</button>
              <button onClick={handleSubmit}>완료</button>
            </ButtonBox>
            </div>
            


        </ModalLayout>
    )
}

export default ReviseInfo

const ModalLayout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 700px;
  background: #FFFFFF;
  border-radius: 30px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;  

const UploadSpan = styled.span`
  position: absolute;
  top: 3%;
  font-family: 'SeoulHangang';
  font-style: normal;
  font-size: 35px;
  color: #460A9A;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Line = styled.hr`
  position: absolute;
  width: 100%;
  height: 0px;
  top: 70px;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
`;

const ImageLayout = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;  

  label{
    margin: 20px;
    font-weight: bold;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 20px;
    color: #460A9A;
    cursor: pointer;
  }

`

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 1rem;

  label{
    font-family: 'SeoulHangang';
    width: 100%%;
    font-style: normal;
    font-size: 25px;
    color: #460A9A;
    margin-bottom: 5px;
  }

  input{
    box-sizing: border-box;
    width: 100%;
    background: #FFFFFF;
    opacity: 0.8;
    border: 3px solid #460A9A;
    border-radius: 20px;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 22px;
    padding: 15px;
    opacity: 0.7;
  }

  textarea{
    box-sizing: border-box;
    width: 100%;
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
  flex-direction: inline;
  justify-content: flex-end;
  padding-right: 10px;
  width: 90%;

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
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;