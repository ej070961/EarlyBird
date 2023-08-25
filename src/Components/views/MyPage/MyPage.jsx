import React,{useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar'
import styled from 'styled-components';
import Calendar from './Sections/Calendar';

function MyPage() {

 
  return (
    <div>
        <NavBar/>
        <MyPageLayout>
          <div style={{ display: 'flex', flexDirection: 'inline', justifyContent:'space-between'}}>
            <UserInfoLayout>
              <img src='/default_profile.png' alt='profile' height={340} width={340} ></img>
              <div>
                  <p>name: </p>
                  <p>Intro: </p>
              </div>
            </UserInfoLayout>
            <CheckListLayout>
              <ItemLayout>
                <p>Did you..?</p>
              </ItemLayout>
              <ItemLayout></ItemLayout>
              <ItemLayout></ItemLayout>
              <ItemLayout></ItemLayout>

            </CheckListLayout>
          </div>
          <Calendar/>
        
      </MyPageLayout>
    </div>
  )
}

export default MyPage
const MyPageLayout = styled.div`
  width: 100%;
  height: 2000px;
  padding-top: 50px;
  background: #3D1365;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;

`

const UserInfoLayout = styled.div`
  width: 840px;
  height: 340px;
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
    font-size: 30px;
    margin-left: 15px;
  }
`

const CheckListLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  margin-right: 20px;
`
const ItemLayout = styled.div`
  width: 630px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 30px;
  background: rgba(179, 157, 219, 0.40);
  margin-bottom: 15px;

  p{
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 30px;
    margin-left: 15px;
    
  }
`


