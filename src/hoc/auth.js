import React, {useEffect} from 'react';
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authUser } from '../_actions/user_action';
export default function (SpecificComponent, option){
    //유저가 로그인 상태인지 확인하기
    //파이어베이스 onAuthStateChanged 기능 이용  
    
    //option
    //  null >  아무나 출입이 가능한 페이지
    // true > 로그인한 유저만 출입이 가능한 페이지
    // false > 로그인한 유저는 출입 불가능한 페이지 

    
    function AuthenticationCheck(props){
        // const [isLoggedIn, setIsLoggedIn] = useState(false);

        const auth = getAuth();
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(()=>{
            onAuthStateChanged(auth, (user)=>{
                if (user){
                   dispatch(authUser(user.uid))
                    .then((response)=>{
                        if(response.payload){
                        //로그인한 상태 
                        if(option===false){
                            console.log("Logged in")
                            navigate('/')
                        }        
                    }   
                    })
                }else{
                    if(option==true){
                        //로그인 하지 않은 상태
                        console.log("not Logged in")
                        navigate('/login')
                    }
                }
            })
           
        },[navigate])

        return <SpecificComponent{...props} />
    }

    return AuthenticationCheck
}