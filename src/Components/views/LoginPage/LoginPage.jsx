import React, {useState} from 'react'
import styled from 'styled-components';
import {getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import Auth from '../../../hoc/auth'

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const socialLogin = async(e) => {
        e.preventDefault();
        const googleProvider = new GoogleAuthProvider(); //provider 생성
  
        const data = await signInWithPopup(auth, googleProvider);
        
        const uid = data.user.uid;
        
        dispatch(loginUser(uid)) //loginUser라는 액션에 body를 넣어줌 
            .then(response => {
                if(response.payload=="success"){
                    localStorage.setItem('userId', uid) //localStorage에 userId를 저장
                navigate('/')
                }else{
                alert('Error')
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        
   
      };

      const handleLogin = async(e) => {
        e.preventDefault();
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                const uid = userCredential.user.uid;
                dispatch(loginUser(uid)) //loginUser라는 액션에 body를 넣어줌 
                .then(response => {
                    if(response.payload=="success"){
                        localStorage.setItem('userId', uid) //localStorage에 userId를 저장
                    navigate('/')
                    }else{
                    alert('Error')
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
            })
            .catch((error)=>{
                console.log(error);
            })
      };

    const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
        case 'email':
            setEmail(value);
        break;
        case 'password':
            setPassword(value);
        break;
        default:
        break;
    }

};
    const handleRegister = (e) =>{
        navigate('/register')
    }

    return (
        <LoginLayout>
            <p>WELCOME</p>
            <p>TO</p>
            <h1>EARLY BIRD</h1>
            <LoginFormLayout>
                <p className='signintostart' style={{margin: '1.5rem'}}>SIGN IN TO START</p>
                <GoogleLoginButton onClick={socialLogin}>
                    <img src="google.png" width="20" height="20"/>
                    <a style={{paddingLeft: '10px'}}>Login with Google</a>
                </GoogleLoginButton>
                <span>or</span>
                <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <InputBox>
                    <input type="text" name="email" required placeholder='Email' value={email} onChange={handleChange}/>
                    </InputBox>
                    <InputBox>
                    <input name="password" type="password" required placeholder="Password" value={password} onChange={handleChange}/>
                    </InputBox>
                    <LoginButton onClick={handleLogin}>START MY MORNING</LoginButton>
                </form>             
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src="bird2.png" alt="bird" width="85" height="85"/>
                    <p className='signup' onClick={handleRegister} style={{marginBottom: '0.5rem'}}>No account?  Sign up !</p>
                </div>
            </LoginFormLayout>
            
        </LoginLayout>
    )
}

export default Auth(LoginPage, false)

const LoginLayout = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(180deg, rgba(179, 136, 255, 0.50) 0%, rgba(70, 10, 154, 0.50) 98.90%);;
    opacity: 0.85;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: 'hidden';
    
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
const LoginFormLayout = styled.div`
    width: 700px;
    height: 500px;
    flex-shrink: 0;
    border-radius: 30px;
    background: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .signintostart{
        color: #460A9A;
        font-family: 'SeoulHangang';
        font-size: 35px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

    }
    .signup{
        color: #460A9A;
        font-family: 'SeoulHangang';
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        cursor: pointer;

    }
`
const InputBox = styled.div`
  margin: 0.5rem;
  label{
    display: inline-block;
    width: 40px;
    text-align: right;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 30px;
    color: #460A9A;
    margin-right: 15px;
    line-height: 50px;
  }

  input{
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
  }
`
const LoginButton = styled.button`
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

