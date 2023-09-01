import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../../../../firebase';
import { useNavigate } from 'react-router-dom';
import {getAuth, onAuthStateChanged} from "firebase/auth"

function PostDeleteButton(props) {
    const [currentUser, setcurrentUser] =useState();
    const auth = getAuth();

    useEffect(()=>{
      onAuthStateChanged(auth, (userlogined)=>{
        if (userlogined){
          setcurrentUser(userlogined.uid);
    
        }     
      });

    },[currentUser, auth])

  
    const PostData = props.PostData;
    const [view, setView] = useState(false);
    

    const navigate = useNavigate();

    const deletePost = (e) =>{
 
        const post = firestore.collection("posts");
    
        post.doc(`${PostData.PostId}`)
        .delete()
        .then(()=>{
            console.log("post successfully deleted");
            setView(!view);
            navigate('/');
        })
        .catch((error)=>{
            console.log(error)
        })
      }

    if (PostData.Uid===currentUser) {
        return (
          <MenuContainer>
            <MenuButton onClick={() => setView(!view)}>
              <img src='/menu.svg' alt="" height={20} />
            </MenuButton>
            {view &&  <DropdownLayout>
            <li onClick={deletePost}>삭제</li>
          </DropdownLayout>}
          </MenuContainer>
        );
      } else {
        return null;
      }
}

export default PostDeleteButton;
const MenuContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const MenuButton = styled.div`
  cursor: pointer;
`;

const DropdownLayout = styled.div`
  position: absolute;
  width: 33px;
  height: 24px;
  top: 30px; /* 조정하여 원하는 위치로 변경 */
  background: #FFF;

  li {
    list-style-type: none;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 15px;
    cursor: pointer;
    padding-left: 1px;
  }
`;
