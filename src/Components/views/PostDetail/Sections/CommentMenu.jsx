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

  const deleteComment = () =>{
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
  const DeleteDropdown = () => {
    return (
      <DropdownLayout>
        <li onClick={deleteComment}>삭제</li>
      </DropdownLayout>
    );
  };

  if (comment.Uid === currentUser || PostData.Uid === currentUser) {
    console.log('Yes');
    return (
      <MenuContainer>
        <MenuButton onClick={() => setView(!view)}>
          <img src='/menu.svg' height={20} />
        </MenuButton>
        {view && <DeleteDropdown />}
      </MenuContainer>
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
