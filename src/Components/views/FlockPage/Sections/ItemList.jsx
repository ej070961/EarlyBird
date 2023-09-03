import React,{useState, useEffect} from 'react';
import styled from "styled-components";
import { firestore } from '../../../../firebase';
function ItemList(){

  const [Flocks, setFlocks] = useState([]);

  useEffect(()=>{
    //게시물 정보 가져오기 및 실시간 업데이트 
    const flocks = firestore.collection("flock");
    
    flocks.onSnapshot(snapshot => {
        if (snapshot.size > 0) {
          const flockData = snapshot.docs.map(doc => doc.data());
          setFlocks(flockData);
        } else {
            console.log("No data");
        }
    }, error => {
    console.log(error);
    });
    
  },[Flocks]);


  const renderitems = Flocks.map((flock, index)=>{
    const tags = flock.Tags;

    return(
      <CardLayout key={index} href={`/flock/${flock.FlockId}`}>
          <div className="card-title">
            {flock.Title}
          </div>
          <div style={{display:'flex', flexDirection:'inline', justifyContent: 'space-between'}}>
          {tags.map((tag, index) => (
              <div className="tag" key={index}>
              {tag}
              </div>
          ))}
          </div>
         
      </CardLayout>
  );

  })
  return(
        <FlockListBlock>
        {renderitems}
        </FlockListBlock>
  )
  };
  
const FlockListBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

`

const CardLayout = styled.a`
    flex-basis: calc(33.33% - 50px);
    margin-bottom: 20px;
    height: 330px;
    background: #B39DDB;
    border: 2px solid #FFFFFF;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;

    &:not(:last-child) {
        margin-right: 20px;
      }
    
    @media screen and (max-width: 1024px) {
        width: calc(50% - 20px); 
        height: 440px;
    }
    
    @media screen and (max-width: 768px) {
        width: calc(100% - 20px); 
        margin-left: 20px;
        margin-right: 20px;
    }
    .card-title{
      position: relative;
      width: 90%;
      height: 50px;
      top: 20px;
      background: #FFFFFF;
      border-radius: 30px;
      font-family: 'SeoulHangang';
      font-style: normal;
      font-size: 18px;
      text-align: center;
      line-height : 50px;
      color: #000;
    }
    .tag{
        width: 100px;
        height: 40px;
        flex-shrink: 0;
        border-radius: 30px;
        background: rgba(38, 15, 69, 0.40);
        margin: 10px;
        font-family: 'SeoulHangang';
        font-style: normal;
        font-size: 18px;
        text-align: center;
        line-height: 40px;
        color: #000;
    }


    
`;
  export default ItemList;