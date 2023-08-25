import React from 'react';
import styled from "styled-components";
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const auth = getAuth();
    const navigate = useNavigate();
    
    const LogOutHandler = () => {
      signOut(auth)
        .then(() => {navigate('/login')}) // logout successful
        .catch((error) => {
            console.log(error);
        }); // logout fail
    }

    return (
        <div>
          <NavLayout>
            <div>
              <Home href="/">Home </Home>
              <Flock href="/flock">Flock</Flock>
              <MyPage href='/my-page'>My Page</MyPage>
            </div>
            <div>
              <Logout onClick={LogOutHandler}>Logout</Logout>
            </div>
          </NavLayout>
  
        </div>
    );
  }

const NavLayout = styled.nav`
  width: 100%;
  height: 4rem;
  padding: 0
  background-color: #FFFFFF;
  z-index: 2; 
  align-items: center;
  display: flex; /* Use flexbox to horizontally align items */
  flex-direction: inline;
  justify-content: space-between;
`
const Home = styled.a`
  font-family: 'SeoulHangang';
  color: #6200EA;
  margin-left: 4rem;
  font-size: 1.8rem;
  align-items: center;
  text-decoration: none;
`

const Flock = styled.a`
  font-family: 'SeoulHangang';
  font-style: normal;
  font-weight: 500;
  font-size: 1.8rem;
  color: #6200EA;
  margin-left: 4rem;
  text-decoration: none;
`

const MyPage = styled.a`
  font-family: 'SeoulHangang';
  font-style: normal;
  font-weight: 400;
  font-size: 1.8rem;
  color: #6200EA;

  margin-left: 4rem;
  text-decoration: none;
`
const Logout = styled.a`
  font-family: 'SeoulHangang';
  font-style: normal;
  font-weight: 400;
  font-size: 1.8rem;
  color: #6200EA;

  margin-right: 4rem;
  text-decoration: none;
  
  /* Add cursor property for the hand icon */
  cursor: pointer;
`

  export default NavBar;