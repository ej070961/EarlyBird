import React, {useEffect, useState} from 'react'
import Auth from '../../../hoc/auth'
import styled from 'styled-components'
import {getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import { registerUser } from '../../../_actions/user_action';

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();

    const [Visible, setVisible] = useState(false);

    const [UserName, setUserName] = useState();
    const [Nickname, setNickname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [Email, setEmail] = useState();
    const [Uid, setUid] = useState();
    const [password, setPassword] = useState();

    
    const socialClick = async (e) =>{
        e.preventDefault();
        const googleProvider = new GoogleAuthProvider(); //provider 생성
  
        const data = await signInWithPopup(auth, googleProvider);
        console.log(data);
        
        setUserName(data.user.displayName);
        setEmail(data.user.email);
        setUid(data.user.uid);
     
        // Google 로그인이 성공한 후 RegisterForm 컴포넌트를 렌더링
        setVisible(!Visible);         
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setUserName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'nickname':
                setNickname(value);
                break;
            case 'phonenumber':
                setPhoneNumber(value);
                break;
            default:
                break;
        }
    }; 


    const onsubmit = (e) => {

        let variable = {UserName: UserName, Email: Email, Nickname: Nickname, PhoneNumber: phoneNumber, Uid: Uid, Image:"", IntroMessage: ""};

        dispatch(registerUser(variable))
            .then((response)=>{
                if(response.payload == "success"){
                    alert('회원가입이 완료되었습니다');
                    navigate('/')
                }else{
                    alert("Failed to sign up")
                }
            })
          
      
    }

    const onSignup = (e) =>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth, Email, password)
        .then((userCredential)=>{
            //Signed in 
            const user = userCredential.user;
            setUserName(user.displayName);
            setEmail(user.email);
            setUid(user.uid);

            // 계정 생성 성공한 후 RegisterForm 컴포넌트를 렌더링
            setVisible(!Visible);     
        })
        .catch((error)=>{
            console.log(error);
        })
    }


    return (
        <RegisterLayout>
            <p>WELCOME</p>
            <p>TO</p>
            <h1>EARLY BIRD</h1>
   
            {Visible ? 
             <RegisterFormLayout>
                <p className="signuptostart" style={{margin: '1.5rem'}}>SIGN UP TO START</p>
                 <div style={{display: 'flex', flexDirection: 'inline', justifyContent: 'space-between'}}>
                 <div>
                 <InputBox>
                 <label>이메일</label>
                 <input type="text" name="email" value={Email} readOnly/>
                 </InputBox>
                 <InputBox>
                 <label>이름</label>
                 <input type="text"name="name" value={UserName} onChange={handleChange} />
                 </InputBox>
                 </div>
                 <div>
                 <InputBox>
                     <label>닉네임</label>
                     <input type="text" name="nickname" value={Nickname} onChange={handleChange} />
                 </InputBox>
                 <InputBox>
                     <label>전화번호</label>
                     <input type="text" name="phonenumber" value={phoneNumber} onChange={handleChange} />
                 </InputBox>
                 </div>
                 </div>
                 <SubmitButton onClick={onsubmit}>Submit</SubmitButton>
             </RegisterFormLayout>
             : 
            <RegisterFormLayout>
                <p className="signuptostart" style={{margin: '1.5rem'}}>SIGN UP TO START</p>
                <GoogleLoginButton onClick={socialClick}>
                        <img src="google.png" width="20" height="20"/>
                        <a style={{paddingLeft: '10px'}}>Sign up with Google</a>
                </GoogleLoginButton>
                <span>or</span>
                <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                 
                    <StyledInput type="text" name="email" required placeholder='Email' value={Email} onChange={handleChange}/>
                    <StyledInput name="password" type="password" required placeholder="Password" value={password} onChange={handleChange}/>
                   
                    <SignupButton onClick={onSignup}>Creat Account</SignupButton>
                </form>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src="bird2.png" alt="bird" width="85" height="85"/>
                    <p className="login" onClick={()=>{navigate('/login')}} style={{marginBottom: '0.5rem'}}>Or Login !</p>
                </div>
            </RegisterFormLayout>}
        </RegisterLayout>
    )
    
  
}

export default Auth(RegisterPage, false)

const RegisterLayout = styled.div`
    width: 100%;
    height: 1080px;
    background: linear-gradient(180deg, rgba(179, 136, 255, 0.50) 0%, rgba(70, 10, 154, 0.50) 98.90%);;
    opacity: 0.85;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    p{
        color: #FFF;
        font-family: 'SeoulHangang';
        font-size: 25px;
        font-style: normal;
        font-weight: 400;
        margin-bottom: 0.2rem;
        margin-top: 0.4rem;
        
    }
    h1{
        color: #FFF;
        font-family: 'SeoulHangang';
        font-size: 60px;
        font-style: normal;
        font-weight: 400;
        margin-top: 0.2rem;
        margin-bottom: 1rem;
    }
    
`
const RegisterFormLayout = styled.div`
    width: 700px;
    height: 500px;
    flex-shrink: 0;
    border-radius: 30px;
    background: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .signuptostart{
        color: #460A9A;
        font-family: 'SeoulHangang';
        font-size: 35px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

    }
    .login{
        color: #460A9A;
        font-family: 'SeoulHangang';
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        cursor: pointer;

    }

`

const GoogleLoginButton = styled.button`
    background: white;
    color: black;
    width: 300px;
    padding: 10px 0px 10px 0px;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    justify-content: center;  
    align-items: center;
    font-size: 20px;
    opacity: 0.8;
    border: 2px solid #460A9A;
    border-radius: 10px;
    margin: 0.8rem;


    hover{
        background: rgb(247,247,247);
          color: black;
    }
`
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-left: 10px;
  width: 96%;
 
  label{
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 25px;
    color: #460A9A;
    margin-bottom: 5px;
  }

  input{
    box-sizing: border-box;
    background: #FFFFFF;
    opacity: 0.8;
    border: 3px solid #460A9A;
    border-radius: 20px;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 22px;
    padding: 12px;
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
    padding: 40px;
    opacity: 0.7;

  }
  
`;

const StyledInput = styled.input`
    width: 300px;
    height: 50px;
    box-sizing: border-box;
    background: #FFFFFF;
    height: 3rem;
    opacity: 0.8;
    border: 2px solid #460A9A;
    border-radius: 10px;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 20px;
    padding: 10px;
    opacity: 0.7;
    margin: 0.5rem;
`
const SignupButton = styled.button`
    width: 300px;
    height: 50px;
    margin: 0.5rem;
    opacity: 0.8;
    border: 2px solid #460A9A;
    border-radius: 10px;
    background: rgba(70, 10, 154, 0.50);

    color: #FFF;
    font-family: Font Awesome 6 Brands;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
const SubmitButton = styled.button`

        border-radius: 20px;
        border: 4px solid rgba(70, 10, 154, 0.50);
        background: rgba(70, 10, 154, 0.50);

        
        color: #FFF;
        font-family: Font Awesome 6 Brands;
        font-size: 40px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: 20px;


`
