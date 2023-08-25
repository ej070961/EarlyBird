import React, {useState} from 'react'
import styled from 'styled-components';
import {signInWithGoogle} from '../../../firebase'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import Auth from '../../../hoc/auth'

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        signInWithGoogle()
          .then(res => {
            const uid = res.user.uid;
            
            dispatch(loginUser(uid)) //loginUser라는 액션에 body를 넣어줌 
                .then(response => {
                    if(response.payload=="success"){
                        localStorage.setItem('userId', uid) //localStorage에 userId를 저장
                    navigate('/')
                    }else{
                    alert('Error')
                    }
                })
          
          })
          .catch(error => {
            console.log(error);
          });
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
                <p style={{marginTop: '1.1rem'}}>SIGN IN TO START</p>
                <GoogleLoginButton onClick={handleLogin}>
                    <img src="google.png" width="20" height="20"/>
                    <a style={{paddingLeft: '10px'}}>Login with Google</a>
                </GoogleLoginButton>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src="bird2.png" alt="bird" width="100" height="100"/>
                    <p onClick={handleRegister} style={{marginBottom: '0.5rem'}}>Or Sign up !</p>
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

    p{
        color: #460A9A;
        font-family: 'SeoulHangang';
        font-size: 35px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        cursor: pointer;

    }
`
const GoogleLoginButton = styled.button`
    background: white;
    color: black;
    width: 290px;
    padding: 10px 0px 10px 0px;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    justify-content: center;  
    align-items: center;
    font-size: 20px;
    border: 0.5px solid rgb(208,211,215);
    color:rgb(66,67,68);

    hover{
        background: rgb(247,247,247);
          color: black;
    }
`

