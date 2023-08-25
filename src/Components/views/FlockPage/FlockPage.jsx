import React, {useState} from 'react';
import UploadFlock from '../UploadPage/UploadFlock';
import styled from "styled-components";
import NavBar from '../NavBar/NavBar';
import ItemList from './ItemList';
import Auth from '../../../hoc/auth'


function FlockPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
   return(
    <div>
    <NavBar/>
    <FlockLayout>
      <FlockContentRow>
        <FlockSpan>Find Your Flock</FlockSpan>
        <FlockButton onClick={()=>setModalIsOpen(true)}> Create your own flock</FlockButton>
          {/* modalIsOpen값에 따라 UploadPost 컴포넌트가 조건적으로 렌더링됨 */}
        {modalIsOpen && <UploadFlock onClose={setModalIsOpen} />}
      </FlockContentRow>
      <div style={{paddingTop:'60px', paddingLeft: '120px', paddingRight: '120px'}}>
        <ItemList></ItemList>
      </div>
      


    </FlockLayout>
    </div>
   );
  }

  const FlockLayout = styled.div`
    width: 100%;
    padding-top: 50px;
    background: #3D1365;
    opacity: 0.8;
  `
  const FlockContentRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column;
  }
  `
  const FlockButton = styled.button`
    box-sizing: border-box;
    width: 30%;
    height: 4rem;
    background: #a587dd;
    border: 2px solid #FFFFFF;
    border-radius: 30px;
    font-family: 'SeoulHangang';
    font-size: 30px;
    color: #FFFFFF;
    margin-right: 4rem;
    margin-top: 4rem;

    @media (max-width: 768px) {
      width: 80%;
      margin-top: 2rem;
    `
const FlockSpan = styled.span`
  width: 75%;
  font-family: 'SeoulHangang';
  font-size: 90px;
  color: #FFFFFF;
  margin-left: 4rem;
  margin-right: 4rem;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    font-size: 48px;
  }
`
export default Auth(FlockPage, true);