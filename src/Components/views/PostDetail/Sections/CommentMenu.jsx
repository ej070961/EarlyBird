import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { firestore } from '../../../../firebase';
function CommentMenu(props) {
  const comment = props.comment;
  const User = useSelector(state => state.User);
  const currentUser = User.userData.Uid;
  const PostData = props.PostData;
  const [view, setView] = useState(false);

  const deleteComment = (e) =>{
    
    const comments = firestore.collection("comments");

    comments.doc(`${comment.CommentId}`)
    .delete()
    .then(()=>{
        console.log("comment successfully deleted");
        setView(!view);
    })
    .catch((error)=>{
        console.log(error)
    })
  }
 
  if (comment.Uid === currentUser || PostData.Uid === currentUser) {
    return (
      <div>
      <MenuContainer>
        <MenuButton onClick={() => setView(!view)}>
          <img src='/menu.svg'alt="" height={20} />
        </MenuButton>
        {view && <DropdownLayout>
          <li onClick={deleteComment}>삭제</li>
        </DropdownLayout>}
      </MenuContainer>
      </div>
    );
  } else {
    return null;
  }
}

export default CommentMenu;

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
  top: 30px; 
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
