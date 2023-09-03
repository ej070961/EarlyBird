import React,{useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar'
import styled from 'styled-components';
import Calendar from './Sections/Calendar';
import Auth from '../../../hoc/auth';
import { useSelector } from 'react-redux';
import ReviseInfo from './Sections/ReviseInfo';
import MyPostList from './Sections/MyPostList';
import TodoList from './Sections/TodoList';
function MyPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUser, setcurrentUser] = useState();

  const user = useSelector(state=>state.User);

  useEffect(()=>{
    if(user && Object.keys(user).length > 0){
      console.log(user);
      setcurrentUser(user.userData);
    }else{
      console.log("No user")
    }
  }, [user]);
  // console.log(user);
  
  if(currentUser !== undefined){

  return (
    <div>
        <NavBar/>
        <MyPageLayout>
          <StyledLayout>
          
            <UserInfoLayout>
              <img src={currentUser.Image!==""? currentUser.Image:'/default_profile.png' } alt='' height={300} width={300} ></img>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent:'space-between'}}>
                <div>
                    <p>name: {currentUser.UserName} </p>
                    <p>Intro: <br/>{currentUser.IntroMessage} </p>
                </div>
                <ReviseButton onClick={()=>setModalIsOpen(true)}>수정하기</ReviseButton>
                {/* modalIsOpen값에 따라 ReviseInfo 컴포넌트가 조건적으로 렌더링됨 */}
                {modalIsOpen && <ReviseInfo onClose={setModalIsOpen} UserData={currentUser}/>} 
              </div>
            </UserInfoLayout>

            <TodoList/>
           
            </StyledLayout>
            
     
          <h1>My Daily Records</h1>
          <Calendar currentUser={currentUser}/>
          <h1>My Post Lists</h1>
          <MyPostList currentUser={currentUser}/>
        
      </MyPageLayout>
    </div>
  )
  }else{
    return<div>
      loading..
    </div>
  }
}

export default Auth(MyPage, true);
const MyPageLayout = styled.div`
  width: 100%;
  height: 2000px;
  padding-top: 50px;
  background: #3D1365;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h1{
    color: White;
    font-family: 'Glory', sans-serif;
    font-size: 50px;
    font-weight: 400;
    text-align: center;
    margin: 0;
    margin-top: 90px;
  }

`


const UserInfoLayout = styled.div`
  width: 800px;
  height: 300px;
  border-radius: 180px;
  border: 4px solid #B39DDB;
  background: #FFF;
  margin: 35px;
  display: flex;
  flex-direction: inline;

  img{
    border-radius: 50%;
  }
  p{
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 25px;
    margin-left: 15px;
  }
`
const ReviseButton = styled.button`
    box-sizing: border-box;
    width: 200px;
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
    opacity: 0.8;

`;


const StyledLayout = styled.div`

    width: 90%;
    margin: 20px;
    display: flex;
    flex-direction: row; /* 원래는 inline이었던 부분을 row로 변경 */
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column; /* 작은 화면에서는 컬럼으로 변경 */
    }

    `




