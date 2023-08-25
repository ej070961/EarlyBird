import React, {useState, useEffect} from 'react'
import Auth from '../../../hoc/auth'
import styled from 'styled-components';
import NavBar from '../NavBar/NavBar';
import Quote from './Sections/Quote';
import PostList from './Sections/PostList';
import UploadImage from '../UploadPage/UploadImage';

function MainPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  return (
    <div>
      <NavBar/>
      <MainPageLayout>
        <div>
          <img style={{marginLeft: '30%', marginBottom: '-30px', marginTop: '40px'}}src="bird.png" alt="bird" width="104" height="128"/>
          <Title> EARLY BIRD</Title>
          <br/>
          <Quote></Quote>
        </div>
        <div style={{marginTop: '400px',display: 'flex', flexDirection: 'inline', justifyContent: 'space-around'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '150px'}}>
            <img src="bird.png" alt="bird" width="104" height="128"/>
            <ModalSpan onClick={()=>setModalIsOpen(true)}>Share my morning</ModalSpan>
              {/* modalIsOpen값에 따라 UploadPost 컴포넌트가 조건적으로 렌더링됨 */}
              {modalIsOpen && <UploadImage onClose={setModalIsOpen} />} 
          </div>
          <div>
            <PostList/>
          </div>
        </div>
      </MainPageLayout>
    </div>
  )
}

export default Auth(MainPage, true);

const MainPageLayout = styled.div`
    width: 100%;
    height: 200%;
    padding-top: 50px;
    background: #3D1365;
    opacity: 0.8;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
  `
const Title = styled.p`
  color: White;
  font-family: 'Glory', sans-serif;
  font-size: 120px;
  font-weight: 400;
  text-align: center;
  margin: 0;
`
const ModalSpan = styled.span`
  color: White;
  font-family: 'Glory', sans-serif;
  font-size: 50px;
  font-weight: 400;
  text-align: center;
  margin: 0;
  cursor: pointer;

`


